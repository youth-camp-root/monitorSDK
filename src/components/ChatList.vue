<template>
    <div id="chats" class="sidebar active">
        <header>
            <span>聊天列表</span>
            <ul class="list-inline">
                <el-badge :value="noteCount">
                    <li class="list-inline-item" @click="showNoteContent = true">
                        <a class="btn btn-outline-light" data-toggle="tooltip" title="消息提示">
                            <i data-feather="bell"></i>
                        </a>
                    </li>
                </el-badge>
                <li class="list-inline-item d-xl-none d-inline">
                    <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                        <i data-feather="x"></i>
                    </a>
                </li>
            </ul>
        </header>
        <div class="sidebar-body">
            <ul class="list-group list-group-flush">


                <template v-for="(item,index) in chatList" :key="index">
                    <!-- 单聊消息 -->
                    <template v-if="item.chatType === 1">
                        <template v-if="user.id === item.receiver">
                            <li v-if="item.unreadReceiver > 0" :class="chatId === item.id ? 'list-group-item open-chat' : 'list-group-item'" @click="changeChatIndex(item.id, item.sender)">
                                <figure class="avatar avatar-state-success">
                                    <img :src="computeFileUrl(item.senderDTO.headPic)" class="rounded-circle" alt="image">
                                </figure>
                                <div class="users-list-body">
                                    <div>
                                        <h5 class="text-primary">{{item.senderDTO.username}}</h5>
                                        <p>{{item.lastMessage}}</p>
                                    </div>
                                    <div class="users-list-action">
                                        <div class="new-message-count">{{item.unreadReceiver}}</div>
                                        <small class="text-primary">{{item.showDate}}</small>
                                    </div>
                                </div>
                                <div>
                                    <el-dropdown>
                                        <span style="color: #0a80ff; margin-left: 5px; margin-right: -30px; font-size: 33px;">⋮</span>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="deleteChat(item.id)"><span style="color: red">删除聊天</span></el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </li>
                            <li v-if="item.unreadReceiver === 0" :class="chatId === item.id ? 'list-group-item open-chat' : 'list-group-item'"  @click="changeChatIndex(item.id, item.sender)">
                                <div>
                                    <figure class="avatar">
                                        <img :src="computeFileUrl(item.senderDTO.headPic)" class="rounded-circle" alt="image">
                                    </figure>
                                </div>
                                <div class="users-list-body">
                                    <div>
                                        <h5>{{item.senderDTO.username}}</h5>
                                        <p>{{item.lastMessage}}</p>
                                    </div>
                                    <div class="users-list-action">
                                        <small class="text-muted">{{item.showDate}}</small>
                                    </div>
                                </div>
                                <div>
                                    <el-dropdown>
                                        <span style="color: #0a80ff; margin-left: 5px; margin-right: -30px; font-size: 33px;">⋮</span>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="deleteChat(item.id)"><span style="color: red">删除聊天</span></el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </li>
                        </template>
                        <template v-if="user.id === item.sender">
                            <li v-if="item.unreadSender > 0" :class="chatId === item.id ? 'list-group-item open-chat' : 'list-group-item'" @click="changeChatIndex(item.id, item.receiver)">
                                <figure class="avatar avatar-state-success">
                                    <img :src="computeFileUrl(item.receiverUserDTO.headPic)" class="rounded-circle" alt="image">
                                </figure>
                                <div class="users-list-body">
                                    <div>
                                        <h5 class="text-primary">{{item.receiverUserDTO.username}}</h5>
                                        <p>{{item.lastMessage}}</p>
                                    </div>
                                    <div class="users-list-action">
                                        <div class="new-message-count">{{item.unreadSender}}</div>
                                        <small class="text-primary">{{item.showDate}}</small>
                                    </div>
                                </div>
                                <div>
                                    <el-dropdown>
                                        <span style="color: #0a80ff; margin-left: 5px; margin-right: -30px; font-size: 33px;">⋮</span>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="deleteChat(item.id)"><span style="color: red">删除聊天</span></el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </li>
                            <li v-if="item.unreadSender === 0" :class="chatId === item.id ? 'list-group-item open-chat' : 'list-group-item'"  @click="changeChatIndex(item.id, item.receiver)">
                                <div>
                                    <figure class="avatar">
                                        <img :src="computeFileUrl(item.receiverUserDTO.headPic)" class="rounded-circle" alt="image">
                                    </figure>
                                </div>
                                <div class="users-list-body">
                                    <div>
                                        <h5>{{item.receiverUserDTO.username}}</h5>
                                        <p>{{item.lastMessage}}</p>
                                    </div>
                                    <div class="users-list-action">
                                        <small class="text-muted">{{item.showDate}}</small>
                                    </div>
                                </div>
                                <div>
                                    <el-dropdown>
                                        <span style="color: #0a80ff; margin-left: 5px; margin-right: -30px; font-size: 33px;">⋮</span>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="deleteChat(item.id)"><span style="color: red">删除聊天</span></el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </li>
                        </template>
                    </template>
                    <!-- 群聊消息 -->
                    <template v-if="item.chatType === 2">
                        <li v-if="item.groupDTO.unreadCount > 0" :class="chatId === item.id ? 'list-group-item open-chat' : 'list-group-item'" @click="changeChatIndex(item.id, '')">
                            <figure class="avatar avatar-state-success">
                                <img v-if="item.groupDTO.groupPic !== ''" :src="computeFileUrl(item.groupDTO.groupPic)" class="rounded-circle" alt="image">
                                <span v-else class="avatar-title bg-warning bg-success rounded-circle">
                                    <i class="fa fa-users"></i>
                                </span>
                            </figure>
                            <div class="users-list-body">
                                <div>
                                    <h5 class="text-primary">{{item.groupDTO.name}}</h5>
                                    <p>{{item.lastMessage}}</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="new-message-count">{{item.groupDTO.unreadCount}}</div>
                                    <small class="text-primary">{{item.showDate}}</small>
                                </div>
                            </div>
                            <div>
                                <el-dropdown>
                                    <span style="color: #0a80ff; margin-left: 5px; margin-right: -30px; font-size: 33px;">⋮</span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click="deleteChat(item.id)"><span style="color: red">删除聊天</span></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </li>


                        <li v-if="item.groupDTO.unreadCount === 0" :class="chatId === item.id ? 'list-group-item open-chat' : 'list-group-item'" @click="changeChatIndex(item.id, '')">
                                <div>
                                    <figure class="avatar">
                                        <img v-if="item.groupDTO.groupPic !== ''" :src="computeFileUrl(item.groupDTO.groupPic)" class="rounded-circle" alt="image">
                                        <span v-else class="avatar-title bg-warning bg-success rounded-circle">
                                            <i class="fa fa-users"></i>
                                        </span>
                                    </figure>
                                </div>
                                <div class="users-list-body">
                                    <div>
                                        <h5>{{item.groupDTO.name}}</h5>
                                        <p>{{item.lastMessage}}</p>
                                    </div>
                                    <div class="users-list-action">
                                        <small class="text-muted">{{item.showDate}}</small>
                                    </div>
                                </div>
                                <div>
                                    <el-dropdown>
                                        <span style="color: #0a80ff; margin-left: 5px; margin-right: -30px; font-size: 33px;">⋮</span>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="deleteChat(item.id)"><span style="color: red">删除聊天</span></el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>

                        </li>




                    </template>
                </template>



            </ul>
        </div>
    </div>
    <el-dialog v-model="showNoteContent" title="消息内容" :close-on-click-modal="false" width="70%">
        <el-descriptions
                :column="3"
                border
                title="好友申请"
                v-if="friendList.length !== 0">
            <template v-for="(item,index) in friendList" :key="index">
                <el-descriptions-item>
                    <template #label>
                        <div>
                            <EIcon name="user" size="18px"></EIcon>
                            用户昵称
                        </div>
                    </template>
                    {{item.applyUserDTO.username}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div>
                            <EIcon name="tickets" size="18px"></EIcon>
                            <span>申请备注</span>
                        </div>
                    </template>
                    {{item.remark}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div>
                            <EIcon name="setting" size="18px"></EIcon>
                            操作
                        </div>
                    </template>
                    <el-button type="success" @click="agreeApplyFriend(item.id)">同意</el-button>
                    <el-button type="danger" @click="refuseApplyFriend(item.id)">拒绝</el-button>
                </el-descriptions-item>
            </template>
        </el-descriptions>

        <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="showNoteContent = false">关闭</el-button>
              </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
    import {defineComponent, onMounted, reactive, ref} from "vue";
    import axios from "axios";
    import Tool from "@/utils/Tool";
    import Message from "@/utils/Message";
    import EIcon from '../components/EIcon.vue';
    import {useRouter} from "vue-router";
    export default defineComponent({
        name: "ChatList",
        props: {
            EIcon
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
            // 当前打开的聊天框
            const chatId = ref("");
            onMounted(() => {
                // 验证是否登录
                const token = Tool.getLoginUser();
                axios.post(process.env.VUE_APP_SERVER + "/web/user/check_login", {token: token}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        const data = resp.data;
                        user.id = data.id;
                        user.username = data.username;
                        // 获取好友申请数据
                        getApplyFriendList();
                        // 获取会话信息
                        getChatList();
                        // 获取当前会话信息
                        chatId.value = Tool.getChatId();
                        // 获取当前会话对象
                        const receiver = Tool.getChatUser();
                        // 加载聊天记录和聊天对象信息
                        loadChatAndUser(chatId.value, receiver);
                        // 动态加载js文件
                        Tool.loadJs();
                    }else {
                        router.push({
                            path:"/"
                        });
                    }
                });
            });


            // 聊天对象用户信息
            let receiverUser = reactive({id: "", username: ""});
            // 切换聊天对象触发
            function changeChatIndex(index: string, receiverId: string) {
                Tool.setChatUser(receiverId);
                Tool.setChatId(index);
                // 标记会话为已读
                axios.post(process.env.VUE_APP_SERVER + "/web/chat/read", {id: index, token: Tool.getLoginUser()}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        loadChatAndUser(index, receiverId);
                    } else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 加载聊天记录和聊天对象信息
            function loadChatAndUser(index: string, receiverId: string) {
                const chatList = Tool.getChatList();
                if(chatList.length == 0) {
                    context.emit('storageChatList', []);
                }
                for(let i=0; i<chatList.length; i++) {
                    if(index === chatList[i].id) {
                        receiverUser.id = receiverId;
                        chatId.value = index;
                        Tool.loadJs();
                        if(chatList[i].chatType === 1) {
                            // 单聊
                            if(chatList[i].receiverUserDTO.id == receiverId) {
                                context.emit('getChatUser', chatList[i].receiverUserDTO, chatId.value);
                            } else if(chatList[i].senderDTO.id == receiverId) {
                                context.emit('getChatUser', chatList[i].senderDTO, chatId.value);
                            }
                            context.emit('storageChatList', chatList[i].messageDTOList);
                        } else if(chatList[i].chatType === 2) {
                            // 群聊
                            context.emit('getChatGroup', chatList[i].groupDTO, chatId.value);
                            context.emit('storageChatList', chatList[i].messageDTOList);
                        }
                    }
                }
            }

            const noteCount = ref(0);
            const showNoteContent = ref(false);
            let friendList = ref([]);
            // 获取当前登录用户收到的好友申请信息
            function getApplyFriendList() {
                const token = Tool.getLoginUser();
                axios.post(process.env.VUE_APP_SERVER + "/web/friend/get_apply", {token: token}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        noteCount.value = 0;
                        friendList.value = resp.data;
                        noteCount.value = noteCount.value + friendList.value.length;
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            const chatList = ref([]);
            // 获取当前登录用户的会话信息
            function getChatList() {
                const token = Tool.getLoginUser();
                axios.post(process.env.VUE_APP_SERVER + "/web/chat/get", {token: token}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        chatList.value = resp.data;
                        Tool.setChatList(chatList.value);
                        let unreadCount = 0;
                        const data: any[] = chatList.value;
                        for(let i=0; i<data.length; i++) {
                            if(data[i].chatType === 1) {
                                if(user.id === data[i].receiver) {
                                    unreadCount = unreadCount + data[i].unreadReceiver;
                                } else if (user.id === data[i].sender) {
                                    unreadCount = unreadCount + data[i].unreadSender;
                                }
                            } else if (data[i].chatType === 2) {
                                unreadCount = unreadCount + data[i].groupDTO.unreadCount;
                            }
                         }
                        context.emit("unreadMsgCount", unreadCount);
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 同意好友申请请求
            function agreeApplyFriend(id: string) {
                axios.post(process.env.VUE_APP_SERVER + "/web/friend/agree_apply", {id: id}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        Message.alertMsg(resp.msg, "success");
                        getApplyFriendList();
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 拒绝好友申请请求
            function refuseApplyFriend(id: string) {
                axios.post(process.env.VUE_APP_SERVER + "/web/friend/refuse_apply", {id: id}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        Message.alertMsg(resp.msg, "success");
                        getApplyFriendList();
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 删除聊天操作
            function deleteChat(id: string) {
                axios.post(process.env.VUE_APP_SERVER + "/web/chat/delete", {id: id, sender: user.id}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        getChatList();
                        context.emit("reloadChatId", id);
                        Message.alertMsg(resp.msg, "success");
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            return {
                user,
                chatId,
                getApplyFriendList,
                changeChatIndex,
                friendList,
                noteCount,
                showNoteContent,
                chatList,
                agreeApplyFriend,
                refuseApplyFriend,
                getChatList,
                deleteChat
            }
        }
    });
</script>


<style>
    .show-icon {
        display: inline;
    }
</style>
