<template>
    <div id="friends" class="sidebar active">
        <header>
            <span>好友列表</span>
            <ul class="list-inline">
                <li class="list-inline-item" data-toggle="tooltip" title="添加好友">
                    <a class="btn btn-outline-light" @click="showApplyFriend = true">
                        <i data-feather="user-plus"></i>
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

                <template v-for="(item,index) in userFriendList" :key="index">
                    <li class="list-group-item" >
                        <div>
                            <figure class="avatar">
                                <img :src="computeFileUrl(item.receiveUserDTO.headPic)" class="rounded-circle" alt="image">
                            </figure>
                        </div>
                        <div class="users-list-body">
                            <div>
                                <h5>{{item.receiveUserDTO.username}}</h5>
                            </div>
                            <div>
                                <el-dropdown>
                                    <span style="font-size: 30px;color: #0a80ff">...</span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click="startNewChat(item.receiveUserDTO.id, item.id)">发起会话</el-dropdown-item>
                                            <el-dropdown-item @click="openFriendProfileInfo(item.receiveUserDTO.id)">查看信息</el-dropdown-item>
                                            <div class="dropdown-divider"></div>
                                            <el-dropdown-item @click="deleteFriend(item.receiveUserDTO.id)"><span style="color: red">删除好友</span></el-dropdown-item>
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
    <el-dialog v-model="showApplyFriend" title="添加好友" :close-on-click-modal="false">
        <el-form :model="applyFriendData">
            <el-form-item label="用户编号" label-width="100px">
                <el-input v-model="applyFriendData.receiveUser" placeholder="请输入用户编号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="申请备注" label-width="100px">
                <el-input v-model="applyFriendData.remark" placeholder="请输入申请备注" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="showApplyFriend = false">取消</el-button>
        <el-button type="primary" @click="submitApplyFriend">确定</el-button>
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
        name: "FriendList",
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

            // 发起会话
            function startNewChat(id: string, friendId: string) {
                const data = {
                    sender: user.id,
                    receiver: id
                };
                axios.post(process.env.VUE_APP_SERVER + "/web/chat/start_chat", data).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        const data:any = userFriendList.value;
                        for(let i=0; i<data.length; i++) {
                            if(data[i].id === friendId) {
                                context.emit('toChat', resp.data, data[i].receiveUserDTO, 1);
                            }
                        }
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            const applyFriendData = reactive({
                applyUser: "",
                remark: "",
                receiveUser: ""
            });
            const showApplyFriend = ref(false);
            // 申请好友
            function submitApplyFriend() {
                applyFriendData.applyUser = user.id;
                axios.post(process.env.VUE_APP_SERVER + "/web/friend/apply", applyFriendData).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        Message.alertMsg(resp.msg, "success");
                        showApplyFriend.value = false
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 打开查看好友信息
            function openFriendProfileInfo(id: string) {
                context.emit("openFriendProfileInfo", id);
            }

            // 删除好友操作
            function deleteFriend(id: string) {
                const confirm = Message.confirmMsg("确认删除好友吗？");
                confirm.then(() => {
                    axios.post(process.env.VUE_APP_SERVER + "/web/friend/delete", {applyUser: user.id, receiveUser: id}).then((response)=>{
                        let resp = response.data;
                        if(resp.code === 0) {
                            selectFriendListByLoginUser();
                            // 删除好友后续操作
                            context.emit("afterDeleteFriend", id);
                            Message.alertMsg(resp.msg, "success");
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
                startNewChat,
                submitApplyFriend,
                showApplyFriend,
                applyFriendData,
                openFriendProfileInfo,
                deleteFriend,
                selectFriendListByLoginUser
            }
        }
    });
</script>
