<template>
    <div id="friends" class="sidebar active">
        <header>
            <span>群聊列表</span>
            <ul class="list-inline">
                <li class="list-inline-item" data-toggle="tooltip" title="创建群聊">
                    <a class="btn btn-outline-light" @click="showCreateGroup = true">
                        <i data-feather="plus-circle"></i>
                    </a>
                </li>
                <li class="list-inline-item d-xl-none d-inline">
                    <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                        <i data-feather="x"></i>
                    </a>
                </li>
            </ul>
        </header>
        <div class="sidebar-body">
            <ul class="list-group list-group-flush">

                <template v-for="(item,index) in groupList" :key="index">
                    <li class="list-group-item" >
                        <div>
                            <figure class="avatar">
                                <img v-if="item.groupPic !== ''" :src="computeFileUrl(item.groupPic)" class="rounded-circle" alt="image" />
                                <span v-else class="avatar-title bg-warning bg-success rounded-circle">
                                    <i class="fa fa-users"></i>
                                </span>
                            </figure>
                        </div>
                        <div class="users-list-body">
                            <div>
                                <h5>{{item.name}}</h5>
                                <p>{{item.id}}</p>
                            </div>
                            <div>
                                <el-dropdown>
                                    <span style="font-size: 30px;color: #0a80ff">...</span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click="startNewGroupChat(item.id)">发送消息</el-dropdown-item>
                                            <el-dropdown-item @click="openGroupProfileInfo(item.id)">查看信息</el-dropdown-item>
                                            <div class="dropdown-divider"></div>
                                            <el-dropdown-item v-if="user.id === item.userId" @click="exitGroup(item.id, '退出并解散群聊')"><span style="color: red">退出并解散群聊</span></el-dropdown-item>
                                            <el-dropdown-item v-else @click="exitGroup(item.id, '退出群聊')"><span style="color: red">退出群聊</span></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>

                        </div>
                    </li>
                </template>

            </ul>
        </div>
    </div>
    <el-dialog v-model="showCreateGroup" title="创建群聊" :close-on-click-modal="false">
        <el-form :model="applyGroupData">
            <el-form-item label="群聊名称" label-width="100px">
                <el-input v-model="applyGroupData.name" autocomplete="off" placeholder="请输入群聊名称"></el-input>
            </el-form-item>
            <el-form-item label="邀请好友" label-width="100px">
                <el-select v-model="applyGroupData.groupItemDTOList" multiple placeholder="请选择邀请好友" style="width:100%;">
                    <el-option
                        v-for="item in userFriendList"
                        :key="item.id"
                        :label="item.receiveUserDTO.username"
                        :value="item.receiveUserDTO.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="群聊介绍" label-width="100px">
                <el-input v-model="applyGroupData.info" :rows="4" type="textarea" placeholder="请输入群聊介绍"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="showCreateGroup = false">取消</el-button>
        <el-button type="primary" @click="submitCreateGroup">确定</el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
    import {defineComponent, onMounted, reactive, ref} from "vue";
    import Tool from "@/utils/Tool";
    import axios from "axios";
    import {useRouter} from 'vue-router';
    import Message from "@/utils/Message";
    export default defineComponent({
        name: "GroupList",
        props: {
        },
        computed: {
            computeFileUrl() {
                return function(url: string) {
                    return process.env.VUE_APP_SERVER + "/photo/view?filename=" + url;
                }
            }
        },
        setup(props, context) {
            const router = useRouter();
            let user = reactive({id: "", username: ""});
            onMounted(() => {
                // 动态加载js文件
                Tool.loadJs();
                // 验证是否登录
                const token = Tool.getLoginUser();
                axios.post(process.env.VUE_APP_SERVER + "/web/user/check_login", {token: token}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        const data = resp.data;
                        user.id = data.id;
                        user.username = data.username;
                        // 获取当前登录用户的好友列表
                        selectFriendListByLoginUser();
                        // 获取群聊列表数据
                        getGroupList();
                    }else {
                        router.push({
                            path:"/"
                        });
                    }
                });
            });

            let userFriendList = ref([]);
            // 获取当前登录用户的好友列表
            function selectFriendListByLoginUser() {
                axios.post(process.env.VUE_APP_SERVER + "/web/friend/get_friend", {token: Tool.getLoginUser()}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        userFriendList.value = resp.data;
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 获取群聊列表
            const groupList = ref([]);
            function getGroupList() {
                axios.post(process.env.VUE_APP_SERVER + "/web/group/list", {token: Tool.getLoginUser()}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        groupList.value = resp.data;
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            const applyGroupData = reactive({
                name: "",
                groupItemDTOList: [],
                info: "",
                userId: ""
            });
            const showCreateGroup = ref(false);

            // 创建群聊
            function submitCreateGroup() {
                const list = applyGroupData.groupItemDTOList;
                let arr = [];
                arr.push({userId: user.id});
                for(let i=0; i<list.length; i++) {
                    const data = {
                        userId: list[i]
                    };
                    arr.push(data);
                }
                (applyGroupData as any).groupItemDTOList = arr;
                applyGroupData.userId = user.id;
                axios.post(process.env.VUE_APP_SERVER + "/web/group/create", applyGroupData).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        showCreateGroup.value = false;
                        getGroupList();
                        Message.alertMsg(resp.msg, "success");
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 发起群聊会话
            function startNewGroupChat(id: string) {
                axios.post(process.env.VUE_APP_SERVER + "/web/group/start", {id: id, token: Tool.getLoginUser()}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        const data: any = groupList.value;
                        for(let i=0; i<data.length; i++) {
                            if(data[i].id === id) {
                                context.emit('toChat', resp.data.id, data[i], 2);
                            }
                        }
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 打开查看群聊信息
            function openGroupProfileInfo(id: string) {
                context.emit("openGroupProfileInfo", id);
            }

            // 退出或解散群聊
            function exitGroup(id: string, msg: string) {
                const confirm = Message.confirmMsg("确认"+ msg +"吗？");
                confirm.then(() => {
                    axios.post(process.env.VUE_APP_SERVER + "/web/group/exit", {id: id, userId: user.id}).then((response)=>{
                        let resp = response.data;
                        if(resp.code === 0) {
                            Message.alertMsg(msg + "成功！", "success");
                            getGroupList();
                            // 退出/解散群聊后续操作
                            context.emit("afterExitGroup", id);
                        }else {
                            Message.alertMsg(resp.msg, "error");
                        }
                    });
                }).catch((e) => {
                    console.log(e);
                });
            }

            return {
                userFriendList,
                showCreateGroup,
                applyGroupData,
                submitCreateGroup,
                groupList,
                startNewGroupChat,
                openGroupProfileInfo,
                user,
                exitGroup,
                getGroupList
            }
        }
    });
</script>

<style>
    .el-input__suffix-inner {
        display: block !important;
    }
</style>
