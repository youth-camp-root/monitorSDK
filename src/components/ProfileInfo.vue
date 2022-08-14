<template>
    <div class="sidebar-group">
        <div id="contact-information" class="sidebar active">
            <header style="padding-right: 10px;">
                <span>资料信息</span>
                <span style="margin-left: 30px;">
                    <el-button type="primary" v-if="user.id === groupInfo.userId && props.profileType === 2" @click="showInviteUser = true">邀请</el-button>
                </span>
                <span style="">
                    <el-button type="warning" v-if="user.id === groupInfo.userId && props.profileType === 2" @click="showEditGroupInfo = true">修改</el-button>
                </span>
                <span>
                    <el-button type="danger" @click="closeProfileInfo">关闭</el-button>
                </span>
            </header>
            <div class="sidebar-body">
                <div class="pl-4 pr-4">
                    <div class="text-center">
                        <figure class="avatar avatar-xl mb-4" v-if="props.profileType === 1">
                            <img :src="computeFileUrl(receiverUser.headPic)" class="rounded-circle" alt="image">
                        </figure>
                        <figure class="avatar avatar-xl mb-4" v-if="props.profileType === 2">
                            <img v-if="groupInfo.groupPic !== ''" :src="computeFileUrl(groupInfo.groupPic)" class="rounded-circle" alt="image">
                            <span v-else class="avatar-title bg-warning bg-success rounded-circle">
                                <i class="fa fa-users"></i>
                            </span>
                        </figure>
                        <h5 class="mb-1" v-if="props.profileType === 1">{{receiverUser.username}}</h5>
                        <h5 class="mb-1" v-if="props.profileType === 2">{{groupInfo.name}}</h5>
                        <ul class="nav nav-tabs justify-content-center mt-5" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" v-if="props.profileType === 1" href="javascript:void(0);"
                                   aria-controls="home" aria-selected="true">个人简介</a>
                                <a class="nav-link active" v-if="props.profileType === 2" href="javascript:void(0);"
                                   aria-controls="home" aria-selected="true">群聊简介</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <p class="text-muted" v-if="props.profileType === 1">{{receiverUser.info}}</p>
                            <p class="text-muted" v-if="props.profileType === 2">{{groupInfo.info}}</p>
                            <div class="mt-4 mb-4" v-if="props.profileType === 1">
                                <h6>手机号码</h6>
                                <p class="text-muted">{{receiverUser.phone}}</p>
                            </div>
                            <div class="mt-4 mb-4" v-if="props.profileType === 2">
                                <h6>创建者</h6>
                                <p class="text-muted">{{groupInfo.username}}</p>
                            </div>
                            <div class="mt-4 mb-4" v-if="props.profileType === 1">
                                <h6>居住城市</h6>
                                <p class="text-muted">{{receiverUser.city}}</p>
                            </div>
                            <div class="mt-4 mb-4" v-if="props.profileType === 2">
                                <h6>创建时间</h6>
                                <p class="text-muted">{{groupInfo.createTime}}</p>
                            </div>
                            <div class="mt-4 mb-4" v-if="props.profileType === 2">
                                <h6>群聊成员</h6>
                                <p class="text-muted">
                                    <template v-for="(item,index) in groupInfo.groupItemList" :key="index">
                                        <span :title="item.userDTO.username">
                                            <el-avatar :src="computeFileUrl(item.userDTO.headPic)"></el-avatar>
                                        </span>
                                    </template>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="showInviteUser" title="邀请用户加入群聊" :close-on-click-modal="false">
            <el-form :model="inviteUserData">
                <el-form-item label="用户编号" label-width="100px">
                    <el-input v-model="inviteUserData.id" placeholder="请输入用户编号" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="showInviteUser = false">取消</el-button>
                <el-button type="primary" @click="inviteGroupUser">确定</el-button>
              </span>
            </template>
        </el-dialog>

        <el-dialog v-model="showEditGroupInfo" title="修改群聊信息" :close-on-click-modal="false">
            <el-form :model="saveGroupInfo">
                <el-form-item label="群聊名称" label-width="100px">
                    <el-input v-model="saveGroupInfo.name" placeholder="请输入群聊名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="群聊图片" label-width="100px">
                    <input type="file" ref="photo" id="photo" style="display:none;" @change="uploadPhoto">
                    <figure class="avatar avatar-xl mb-4" style="width: 5.6rem; height: 5.6rem">
                        <img v-if="saveGroupInfo.groupPic !== ''" :src="computeFileUrl(saveGroupInfo.groupPic)" id="photo-view" style="width:100px; height:100px;" />
                        <span v-else class="avatar-title bg-warning bg-success rounded-circle">
                            <i class="fa fa-users"></i>
                        </span>
                    </figure>
                    <el-button type="danger" @click="openUploadPhoto" style="vertical-align:middle;float:none;margin-left:20px;">上传图片</el-button>
                </el-form-item>
                <el-form-item label="群聊简介" label-width="100px">
                    <el-input v-model="saveGroupInfo.info" type="textarea" :row="5" placeholder="请输入群聊简介" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="showEditGroupInfo = false">取消</el-button>
                <el-button type="primary" @click="editGroupInfo">确定</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, reactive, ref, watch} from "vue";
    import axios from "axios";
    import Tool from "@/utils/Tool";
    import Message from "@/utils/Message";
    import EIcon from '../components/EIcon.vue';
    import {useRouter} from "vue-router";
    export default defineComponent({
        name: "ProfileInfo",
        props: {
            EIcon,
            profileType: Number,
            receiver: String,
            groupId: String,
            chatId: String
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
            let showInviteUser = ref(false);
            let inviteUserData = reactive({id: ""});

            // 关闭个人信息页面
            function closeProfileInfo() {
                context.emit("closeProfileInfo")
            }

            watch(props,(newProps, oldProps) => {
                if(props.profileType === 1) {
                    // 用户信息
                    getReceiverUserInfo();
                } else if(props.profileType === 2) {
                    // 群聊信息
                    getReceiverGroupInfo();
                }
            });

            let showEditGroupInfo = ref(false);

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
                        if(props.profileType === 1) {
                            // 用户信息
                            getReceiverUserInfo();
                        } else if(props.profileType === 2) {
                            // 群聊信息
                            getReceiverGroupInfo();
                        }

                    }else {
                        router.push({
                            path:"/"
                        });
                    }
                });
            });

            let receiverUser = reactive({id: "", username: "", phone: "", city: "", headPic: ""});
            // 获取用户信息资料
            function getReceiverUserInfo() {
                axios.post(process.env.VUE_APP_SERVER + "/web/user/get", {id: props.receiver}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        const data = resp.data;
                        receiverUser.id = data.id;
                        receiverUser.username = data.username;
                        receiverUser.phone = data.phone;
                        receiverUser.city = data.city;
                        receiverUser.headPic = data.headPic;
                    }
                });
            }

            let groupInfo = reactive({id: "", name: "", chatId: "", userId: "", info: "", groupPic: "", username: "", createTime: "", groupItemList: []});
            // 获取群聊信息资料
            function getReceiverGroupInfo() {
                axios.post(process.env.VUE_APP_SERVER + "/web/group/get", {id: props.groupId}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        const data = resp.data;
                        groupInfo.id = data.id;
                        groupInfo.name = data.name;
                        groupInfo.info = data.info;
                        groupInfo.groupPic = data.groupPic;
                        groupInfo.userId = data.userId;
                        groupInfo.chatId = data.chatId;
                        groupInfo.username = data.userDTO.username;
                        groupInfo.createTime = data.createTime;
                        groupInfo.groupItemList = data.groupItemDTOList;
                        // 群聊更新信息赋值
                        saveGroupInfo.id = data.id;
                        saveGroupInfo.name = data.name;
                        saveGroupInfo.info = data.info;
                        saveGroupInfo.groupPic = data.groupPic;
                    }
                });
            }

            // 邀请用户加入群聊
            function inviteGroupUser() {
                axios.post(process.env.VUE_APP_SERVER + "/web/group/invite", {id: groupInfo.id, userId: inviteUserData.id}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        Message.alertMsg("邀请成功！", "success");
                        getReceiverGroupInfo();
                        if(props.chatId === groupInfo.chatId) {
                            context.emit("getChatGroup", resp.data, props.chatId);
                        }
                        showInviteUser.value = false;
                    } else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            let saveGroupInfo = reactive({id: "", name: "", groupPic: "", info: "", userId: ""});
            // 修改群聊信息
            function editGroupInfo() {
                saveGroupInfo.userId = user.id;
                axios.post(process.env.VUE_APP_SERVER + "/web/group/save", saveGroupInfo).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        Message.alertMsg("群聊更新成功！", "success");
                        getReceiverGroupInfo();
                        const data = resp.data;
                        if(data.chatId === props.chatId) {
                            context.emit('getChatGroup', data, props.chatId);
                        }
                        showEditGroupInfo.value = false;
                    } else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 打开图片上传窗口
            function openUploadPhoto() {
                (document as any).getElementById("photo").click();
            }

            // 上传图片
            const photo = ref(null);
            function uploadPhoto() {
                const photoList = (photo as any).value.files;
                if(photoList === null || photoList.length !== 1) {
                    Message.alertMsg("请选择一个图片！", "error");
                    return;
                }
                const uploadPhoto = photoList[0];
                const config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                const formData = new FormData();
                formData.append('photo', uploadPhoto);
                axios.post(process.env.VUE_APP_SERVER + "/photo/upload", formData, config).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        Message.alertMsg(resp.msg, "success");
                        saveGroupInfo.groupPic = resp.data;
                    } else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            return {
                closeProfileInfo,
                props,
                receiverUser,
                groupInfo,
                user,
                inviteGroupUser,
                showInviteUser,
                inviteUserData,
                showEditGroupInfo,
                editGroupInfo,
                saveGroupInfo,
                openUploadPhoto,
                uploadPhoto,
                photo
            }
        }
    });
</script>
