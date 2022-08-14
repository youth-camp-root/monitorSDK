<template>

    <!-- layout -->
    <div class="layout">

        <!-- navigation -->
        <nav class="navigation">
            <div class="nav-group">
                <ul>
                    <li class="logo">
                        <a href="javascript:void(0);">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 width="612px" height="612px" viewBox="0 0 612 612"
                                 style="enable-background:new 0 0 612 612;" xml:space="preserve">
                            <g>
                                <g id="_x32__26_">
                                    <g>
                                    <path d="M401.625,325.125h-191.25c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h191.25
                                    c10.557,0,19.125-8.568,19.125-19.125S412.182,325.125,401.625,325.125z M439.875,210.375h-267.75
                                    c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h267.75c10.557,0,19.125-8.568,19.125-19.125
                                    S450.432,210.375,439.875,210.375z M306,0C137.012,0,0,119.875,0,267.75c0,84.514,44.848,159.751,114.75,208.826V612
                                    l134.047-81.339c18.552,3.061,37.638,4.839,57.203,4.839c169.008,0,306-119.875,306-267.75C612,119.875,475.008,0,306,0z
                                    M306,497.25c-22.338,0-43.911-2.601-64.643-7.019l-90.041,54.123l1.205-88.701C83.5,414.133,38.25,345.513,38.25,267.75
                                    c0-126.741,119.875-229.5,267.75-229.5c147.875,0,267.75,102.759,267.75,229.5S453.875,497.25,306,497.25z"/>
                                    </g>
                                </g>
                            </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                        </svg>
                        </a>
                    </li>

                    <li>
                        <a :class="menuIndex === 1 ? 'active tab-active' : 'tab-no-active'" @click="changeMenuIndex(1)" href="javascript:void(0);"
                           title="聊天">
                            <span v-if="noReadMsgCount > 0">
                                <el-badge :value="noReadMsgCount">
                                    <EIcon name="chat-round"></EIcon>
                                </el-badge>
                            </span>
                            <span v-else>
                                <EIcon name="chat-round"></EIcon>
                            </span>
                        </a>
                    </li>

                    <li>
                        <a :class="menuIndex === 2 ? 'active tab-active' : 'tab-no-active'" @click="changeMenuIndex(2)" href="javascript:void(0);"
                           title="好友">
                            <span class="badge"></span>
                            <i data-feather="user"></i>
                        </a>
                    </li>
                    <li class="brackets">
                        <a :class="menuIndex === 4 ? 'active tab-active' : 'tab-no-active'" @click="changeMenuIndex(4)" href="javascript:void(0);"
                           title="群聊">
                            <span class="badge"></span>
                            <i data-feather="users"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" @click="changeMenuIndex(3)" class="tab-no-active" title="模式">
                            <i data-feather="moon"></i>
                        </a>
                    </li>
                    <li title="我的">
                        <a href="javascript:void(0);">
                            <el-dropdown>
                                <figure class="avatar">
                                    <img :src="computeFileUrl(user.headPic)" class="rounded-circle" alt="image">
                                </figure>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="showPersonInfo = true">查看资料</el-dropdown-item>
                                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                                        <div class="dropdown-divider"></div>
                                        <el-dropdown-item @click="cancelAccount"><span style="color: red">注销账户</span></el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>

                        </a>

                    </li>

                </ul>
            </div>
        </nav>
        <!-- ./ navigation -->


        <el-dialog v-model="showPersonInfo" title="个人信息" :close-on-click-modal="false">
            <el-form :model="saveUserInfo">
                <el-form-item label="用户id" label-width="120px">
                    <el-input v-model="saveUserInfo.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" label-width="120px">
                    <el-input v-model="saveUserInfo.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" label-width="120px">
                    <el-input v-model="saveUserInfo.password" autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="用户头像" label-width="120px">
                    <img :src="computeFileUrl(saveUserInfo.headPic)" id="photo-view" style="width:100px; height:70px;" />
                    <el-button type="danger" @click="openUploadPhoto" style="vertical-align:middle;float:none;margin-left:20px;">上传图片</el-button>
                </el-form-item>
                <el-form-item label="手机号码" label-width="120px">
                    <el-input v-model="saveUserInfo.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在城市" label-width="120px">
                    <el-input v-model="saveUserInfo.city" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" label-width="120px">
                    <el-select v-model="saveUserInfo.sex" placeholder="请选择用户性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="2"></el-option>
                        <el-option label="未知" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介" label-width="120px">
                    <el-input type="textarea" v-model="saveUserInfo.info" :rows="5" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="showPersonInfo = false">取消</el-button>
                <el-button type="primary" @click="savePersonInfo">确定</el-button>
              </span>
            </template>
        </el-dialog>

        <!-- content -->
        <div class="content">

            <!-- sidebar group -->
            <div class="sidebar-group">

                <!-- Chats sidebar -->
                <chat-list  v-if="menuIndex === 1" ref="chatList" @reloadChatId="reloadChatId" @unreadMsgCount="unreadMsgCount" @storageChatList="storageChatList" @getChatUser="getChatUser" @getChatGroup="getChatGroup"></chat-list>
                <!-- ./ Chats sidebar -->

                <!-- Friends sidebar -->
                <friend-list v-if="menuIndex === 2" ref="friendList" @toChat="toChat" @afterDeleteFriend="afterDeleteFriend" @openFriendProfileInfo="openFriendProfileInfo"></friend-list>
                <!-- ./ Friends sidebar -->

                <group-list v-if="menuIndex === 4" ref="groupList" @toChat="toChat" @afterExitGroup="afterExitGroup" @openGroupProfileInfo="openGroupProfileInfo"></group-list>


            </div>
            <!-- ./ sidebar group -->

            <div class="chat" v-if="chat.id === ''">
                <div class="chat-body" style="margin-top: 180px">
                    <el-empty description="请选择聊天对象..."></el-empty>
                </div>
            </div>


            <!-- chat -->
            <!-- 单聊页面 -->
            <div class="chat" v-if="chat.id !== '' && chat.chatType === 1">
                <div class="chat-header">
                    <div class="chat-header-user">
                        <figure class="avatar">
                            <img :src="computeFileUrl(receiverUser.headPic)" class="rounded-circle" alt="image">
                        </figure>
                        <div>
                            <h5>{{receiverUser.username}}</h5>
                        </div>
                    </div>
                    <div class="chat-header-action">
                        <ul class="list-inline">
                            <li class="list-inline-item d-xl-none d-inline">
                                <a href="#" class="btn btn-outline-light mobile-navigation-button">
                                    <i data-feather="menu"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <el-dropdown>
                                    <a href="javascript:void(0);" class="btn btn-outline-light">
                                        <i data-feather="more-horizontal"></i>
                                    </a>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click="openProfileInfo">查看资料</el-dropdown-item>
                                            <div class="dropdown-divider"></div>
                                            <el-dropdown-item @click="deleteFriend"><span style="color: red">删除好友</span></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="chat-body"> <!-- .no-message -->
                    <div class="messages">

                        <template v-for="(item,index) in messageList" :key="index">
                            <div v-if="item.sender === user.id" class="message-item outgoing-message">
                                <div class="message-avatar">
                                    <figure class="avatar">
                                        <img :src="computeFileUrl(item.senderDTO.headPic)" class="rounded-circle" alt="image">
                                    </figure>
                                    <div>
                                        <h5>{{item.senderDTO.username}}</h5>
                                        <div class="time">{{item.createTime}}</div>
                                    </div>
                                </div>
                                <template v-if="item.messageType === 1">
                                    <div class="message-content">
                                        {{item.content}}
                                    </div>
                                </template>
                                <template v-if="item.messageType === 2">
                                    <div class="message-content message-file">
                                        <div class="file-icon">
                                            <i v-if="item.fileMessageDTO.suffix === 'pdf'" class="fa fa-file-pdf-o" style="color:#ffffff"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'zip' || item.fileMessageDTO.suffix === 'gz'" class="fa fa-file-zip-o" style="color:#ffffff"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'doc' || item.fileMessageDTO.suffix === 'docx'" class="fa fa-file-word-o" style="color:#ffffff"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'xls' || item.fileMessageDTO.suffix === 'xlsx'" class="fa fa-file-excel-o" style="color:#ffffff"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'txt'" class="fa fa-file-text-o" style="color:#ffffff"></i>
                                            <i v-else class="fa fa-file-o" style="color:#ffffff"></i>
                                        </div>
                                        <div>
                                            <div :title="item.fileMessageDTO.name">{{computeFileName(item.fileMessageDTO.name)}} <i class="text-muted small"><span style="color:#ffffff">({{item.fileMessageDTO.strSize}})</span></i></div>
                                            <ul class="list-inline">
                                                <li class="list-inline-item mb-0"><a :href="computeDownloadFileUrl(item.fileMessageDTO.id)" style="color:#ffffff">下载</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div v-if="item.receiver === user.id" class="message-item">
                                <div class="message-avatar">
                                    <figure class="avatar">
                                        <img :src="computeFileUrl(item.senderDTO.headPic)" class="rounded-circle" alt="image">
                                    </figure>
                                    <div>
                                        <h5>{{item.senderDTO.username}}</h5>
                                        <div class="time">{{item.createTime}}</div>
                                    </div>
                                </div>
                                <template v-if="item.messageType === 1">
                                    <div class="message-content">
                                        {{item.content}}
                                    </div>
                                </template>
                                <template v-if="item.messageType === 2">
                                    <div class="message-content message-file">
                                        <div class="file-icon">
                                            <i v-if="item.fileMessageDTO.suffix === 'pdf'" class="fa fa-file-pdf-o"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'zip' || item.fileMessageDTO.suffix === 'gz'" class="fa fa-file-zip-o"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'doc' || item.fileMessageDTO.suffix === 'docx'" class="fa fa-file-word-o"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'xls' || item.fileMessageDTO.suffix === 'xlsx'" class="fa fa-file-excel-o"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'txt'" class="fa fa-file-text-o"></i>
                                            <i v-else class="fa fa-file-o"></i>
                                        </div>
                                        <div>
                                            <div :title="item.fileMessageDTO.name">{{computeFileName(item.fileMessageDTO.name)}} <i class="text-muted small">({{item.fileMessageDTO.strSize}})</i></div>
                                            <ul class="list-inline">
                                                <li class="list-inline-item mb-0"><a :href="computeDownloadFileUrl(item.fileMessageDTO.id)">下载</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </template>
                            </div>

                        </template>




                    </div>
                </div>
                <div class="chat-footer">
                    <form>
                        <div>
                            <el-popover
                                    placement="top-start"
                                    :width="350"
                                    trigger="click">
                                <template #reference>
                                    <button class="btn btn-light mr-3" data-toggle="tooltip" type="button">
                                        <i data-feather="smile"></i>
                                    </button>
                                </template>
                                <template v-for="(item,index) in emojiMap" :key="index">
                                    <span style="font-size: 20px;cursor: pointer;float:left; width: 40px; margin-bottom: 5px;" @click="selectIcon(item.text)">{{item.text}}</span>
                                </template>
                            </el-popover>
                        </div>
                        <input type="text" class="form-control" v-model="messageText" placeholder="请输入消息内容...">
                        <div class="form-buttons">
                            <button class="btn btn-light" @click="openUploadFile" data-toggle="tooltip" title="文件" type="button">
                                <i data-feather="paperclip"></i>
                            </button>
                            <button class="btn btn-light d-sm-none d-block" data-toggle="tooltip"
                                    title="Send a voice record" type="button">
                                <i data-feather="mic"></i>
                            </button>
                            <button class="btn btn-primary" type="button" @click="sendMsg">
                                <i data-feather="send"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- 群聊页面 -->
            <div class="chat" v-if="chat.id !== '' && chat.chatType === 2">
                <div class="chat-header">
                    <div class="chat-header-user">
                        <figure class="avatar">
                            <img v-if="groupInfo.groupPic !== ''" :src="computeFileUrl(groupInfo.groupPic)" class="rounded-circle" alt="image">
                            <span v-else class="avatar-title bg-warning bg-success rounded-circle">
                                    <i class="fa fa-users"></i>
                            </span>
                        </figure>
                        <div>
                            <h5>{{groupInfo.name}}（{{groupInfo.total}}人）</h5>
                        </div>
                    </div>
                    <div class="chat-header-action">
                        <ul class="list-inline">
                            <li class="list-inline-item d-xl-none d-inline">
                                <a href="#" class="btn btn-outline-light mobile-navigation-button">
                                    <i data-feather="menu"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <el-dropdown>
                                    <a href="javascript:void(0);" class="btn btn-outline-light">
                                        <i data-feather="more-horizontal"></i>
                                    </a>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click="openProfileInfo">查看资料</el-dropdown-item>
                                            <div class="dropdown-divider"></div>
                                            <el-dropdown-item v-if="groupInfo.userId === user.id" @click="exitGroup('退出并解散群聊')"><span style="color: red">退出并解散群聊</span></el-dropdown-item>
                                            <el-dropdown-item v-else @click="exitGroup('退出群聊')"><span style="color: red">退出群聊</span></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="chat-body"> <!-- .no-message -->
                    <div class="messages">

                        <template v-for="(item,index) in messageList" :key="index">
                            <div v-if="item.sender === user.id" class="message-item outgoing-message">
                                <div class="message-avatar">
                                    <figure class="avatar">
                                        <img :src="computeFileUrl(item.senderDTO.headPic)" class="rounded-circle" alt="image">
                                    </figure>
                                    <div>
                                        <h5>{{item.senderDTO.username}}</h5>
                                        <div class="time">{{item.createTime}}</div>
                                    </div>
                                </div>
                                <template v-if="item.messageType === 1">
                                    <div class="message-content">
                                        {{item.content}}
                                    </div>
                                </template>
                                <template v-if="item.messageType === 2">
                                    <div class="message-content message-file">
                                        <div class="file-icon">
                                            <i v-if="item.fileMessageDTO.suffix === 'pdf'" class="fa fa-file-pdf-o" style="color:#ffffff"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'zip' || item.fileMessageDTO.suffix === 'gz'" class="fa fa-file-zip-o" style="color:#ffffff"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'doc' || item.fileMessageDTO.suffix === 'docx'" class="fa fa-file-word-o" style="color:#ffffff"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'xls' || item.fileMessageDTO.suffix === 'xlsx'" class="fa fa-file-excel-o" style="color:#ffffff"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'txt'" class="fa fa-file-text-o" style="color:#ffffff"></i>
                                            <i v-else class="fa fa-file-o" style="color:#ffffff"></i>
                                        </div>
                                        <div>
                                            <div :title="item.fileMessageDTO.name">{{computeFileName(item.fileMessageDTO.name)}} <i class="text-muted small"><span style="color:#ffffff">({{item.fileMessageDTO.strSize}})</span></i></div>
                                            <ul class="list-inline">
                                                <li class="list-inline-item mb-0"><a :href="computeDownloadFileUrl(item.fileMessageDTO.id)" style="color:#ffffff">下载</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div v-if="item.sender !== user.id" class="message-item">
                                <div class="message-avatar">
                                    <figure class="avatar">
                                        <img :src="computeFileUrl(item.senderDTO.headPic)" class="rounded-circle" alt="image">
                                    </figure>
                                    <div>
                                        <h5>{{item.senderDTO.username}}</h5>
                                        <div class="time">{{item.createTime}}</div>
                                    </div>
                                </div>
                                <template v-if="item.messageType === 1">
                                    <div class="message-content">
                                        {{item.content}}
                                    </div>
                                </template>
                                <template v-if="item.messageType === 2">
                                    <div class="message-content message-file">
                                        <div class="file-icon">
                                            <i v-if="item.fileMessageDTO.suffix === 'pdf'" class="fa fa-file-pdf-o"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'zip' || item.fileMessageDTO.suffix === 'gz'" class="fa fa-file-zip-o"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'doc' || item.fileMessageDTO.suffix === 'docx'" class="fa fa-file-word-o"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'xls' || item.fileMessageDTO.suffix === 'xlsx'" class="fa fa-file-excel-o"></i>
                                            <i v-else-if="item.fileMessageDTO.suffix === 'txt'" class="fa fa-file-text-o"></i>
                                            <i v-else class="fa fa-file-o"></i>
                                        </div>
                                        <div>
                                            <div :title="item.fileMessageDTO.name">{{computeFileName(item.fileMessageDTO.name)}} <i class="text-muted small">({{item.fileMessageDTO.strSize}})</i></div>
                                            <ul class="list-inline">
                                                <li class="list-inline-item mb-0"><a :href="computeDownloadFileUrl(item.fileMessageDTO.id)">下载</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </template>
                            </div>

                        </template>

                    </div>
                </div>
                <div class="chat-footer">
                    <form>
                        <div>
                            <el-popover
                                    placement="top-start"
                                    :width="350"
                                    trigger="click">
                                <template #reference>
                                    <button class="btn btn-light mr-3" data-toggle="tooltip" type="button">
                                        <i data-feather="smile"></i>
                                    </button>
                                </template>
                                <template v-for="(item,index) in emojiMap" :key="index">
                                    <span style="font-size: 20px;cursor: pointer;float:left; width: 40px; margin-bottom: 5px;" @click="selectIcon(item.text)">{{item.text}}</span>
                                </template>
                            </el-popover>
                        </div>
                        <input type="text" class="form-control" v-model="messageText" placeholder="请输入消息内容...">
                        <div class="form-buttons">
                            <button class="btn btn-light" @click="openUploadFile" data-toggle="tooltip" title="文件" type="button">
                                <i data-feather="paperclip"></i>
                            </button>
                            <button class="btn btn-light d-sm-none d-block" data-toggle="tooltip"
                                    title="Send a voice record" type="button">
                                <i data-feather="mic"></i>
                            </button>
                            <button class="btn btn-primary" type="button" @click="sendMsg">
                                <i data-feather="send"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- ./ chat -->

            <profile-info v-if="showProfileInfo" :profileType="profileType.type" :chatId="chat.id" :receiver="profileUser.id" :groupId="profileGroup.id" @closeProfileInfo="closeProfileInfo" @getChatGroup="getChatGroup"></profile-info>
            <input id="file" style="display: none" ref="file" @change="uploadFile" type="file" />
            <input id="photo" style="display: none" ref="photo" @change="uploadPhoto" type="file" />
        </div>
        <!-- ./ content -->

    </div>

</template>

<script lang="ts">
    import {
        ref,
        reactive,
        onMounted
    } from 'vue';
    import EIcon from '../components/EIcon.vue';
    import axios from 'axios';
    import Tool from "@/utils/Tool";
    import Message from "@/utils/Message";
    import {useRouter} from 'vue-router';
    import FriendList from "@/components/FriendList.vue";
    import ChatList from "@/components/ChatList.vue";
    import GroupList from "@/components/GroupList.vue";
    import ProfileInfo from "@/components/ProfileInfo.vue";
    export default {
        components: {
            EIcon,
            FriendList,
            ChatList,
            GroupList,
            ProfileInfo
        },
        computed: {
            computeFileUrl() {
                return function(url: string) {
                    return process.env.VUE_APP_SERVER + "/photo/view?filename=" + url;
                }
            },
            computeDownloadFileUrl() {
                return function(id: string) {
                    return process.env.VUE_APP_SERVER + "/file/download?id=" + id;
                }
            },
            computeFileName() {
                return function(name: string) {
                    if(name.length >= 25) {
                        name = name.substring(0, 24);
                        return name + "...";
                    } else {
                        return name;
                    }
                }
            }
        },
        setup() {
            const router = useRouter();
            const messageList: any = ref([]);

            let user = reactive({id: "", username: "", headPic: ""});

            let chat = reactive({id: "", chatType: 1});
            let receiverUser = reactive({id: "", username: "", headPic: ""});
            // 获取当前聊天对象
            function getChatUser(receiver: any, chatId: string) {
                receiverUser.id = receiver.id;
                receiverUser.username = receiver.username;
                receiverUser.headPic = receiver.headPic;
                chat.id = chatId;
                chat.chatType = 1;
                profileType.type = 1;
                profileUser.id = receiver.id;
            }

            onMounted(() => {
                // 动态加载js文件
                Tool.loadJs();
                checkLogin();
            });



            function checkLogin() {
                // 验证是否登录
                const token = Tool.getLoginUser();
                axios.post(process.env.VUE_APP_SERVER + "/web/user/check_login", {token: token}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        const data = resp.data;
                        user.id = data.id;
                        user.username = data.username;
                        user.headPic = data.headPic;
                        // console.log(data);
                        
                        // 给个人信息 赋值
                        saveUserInfo.id = data.id;
                        saveUserInfo.username = data.username;
                        saveUserInfo.password = data.password;
                        saveUserInfo.headPic = data.headPic;
                        saveUserInfo.phone = data.phone;
                        saveUserInfo.city = data.city;
                        saveUserInfo.info = data.info;
                        saveUserInfo.sex = data.sex;
                        // 初始化WebSocket
                        initWebSocket();
                        // 获取当前会话对象
                        chat.id = Tool.getChatId();
                        getNoMsgCount();
                    }else {
                        router.push({
                            path:"/"
                        });
                    }
                });
            }

            // 展示用户资料信息
            let showProfileInfo = ref(false);
            let profileUser = reactive({id: ""});
            let profileGroup = reactive({id: ""});
            let profileType = reactive({type: 1});
            function openProfileInfo() {
                showProfileInfo.value = true;
            }

            const chatList = ref(null);
            const groupList = ref(null);


            // 声明ws变量
            let ws: any = null;

            // 初始化表情数据
            const emoji = [
                '😀', '😄', '😅', '🤣', '😂', '😉', '😊', '😍', '😘', '😜',
                '😝', '😏', '😒', '🙄', '😔', '😴', '😷', '🤮', '🥵', '😎',
                '😮', '😰', '😭', '😱', '😩', '😡', '💀', '👽', '🤓', '🥳',
                '😺', '😹', '😻', '🤚', '💩', '👍', '👎', '👏', '🙏', '💪'
            ];
            const emojiMap = emoji.map(e => ({text: e}));

            // 消息框输入内容
            const messageText = ref('');




            // 选中某个表情触发
            function selectIcon(icon: string) {
                messageText.value = messageText.value + icon;
            }


            // 从数据库中获取聊天记录
            function getMessageList() {
                axios.post(process.env.VUE_APP_SERVER + "/web/message/get", {id: Tool.getChatId()}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        messageList.value = resp.data;
                    } else {
                        Tool.setChatId("");
                        chat.id = "";
                    }
                    Tool.loadJs();
                });
            }

            // 退出登录
            function logout() {
                axios.post(process.env.VUE_APP_SERVER + "/web/user/logout", {token: Tool.getLoginUser()}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        Tool.clearAllStorage();
                        (document as any).querySelector('body').removeAttribute('class', 'dark');
                        router.push({
                            path:"/"
                        });
                    }
                });
            }

            // 从缓存中获取聊天记录
            function storageChatList(chatMessageList: any[]) {
                if(chatMessageList.length == 0) {
                    getMessageList();
                } else {
                    messageList.value = chatMessageList;
                }
            }

            let noReadMsgCount = ref(0);
            // 获取未读消息数
            function unreadMsgCount(count: number) {
                noReadMsgCount.value = count;
            }

            // 发送消息
            function sendMsg() {
                if(chat.id === '') {
                    Message.alertMsg("请选择一个聊天对象！", "error");
                    return false;
                }
                const data = {
                  chatId: chat.id,
                  content: messageText.value,
                  messageType: 1,
                  token: Tool.getLoginUser(),
                  receiver: "",
                  sender: user.id
                };
                // 单聊 赋值聊天对象id
                if(chat.chatType == 1) {
                    data.receiver = receiverUser.id;
                }
                axios.post(process.env.VUE_APP_SERVER + "/web/message/send", data).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        getMessageList();
                        Tool.loadJs();
                        const newMsg = {receiver: "", groupId: "", chatType: 1, groupItem: ""};
                        // 单聊 赋值聊天对象id
                        if(chat.chatType == 1) {
                            newMsg.receiver = receiverUser.id;
                            newMsg.chatType = 1;
                        } else if (chat.chatType == 2) {
                            newMsg.groupId = groupInfo.id;
                            newMsg.chatType = 2;
                            for(let i = 0; i < groupInfo.groupItemList.length; i++) {
                                newMsg.groupItem = newMsg.groupItem + (groupInfo as any).groupItemList[i].userId + ",";
                            }
                            newMsg.groupItem = newMsg.groupItem.substring(0, newMsg.groupItem.length - 1);
                        }
                        ws.send(JSON.stringify(newMsg));
                        messageText.value = '';
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 获取未读消息数
            function getNoMsgCount() {
                const token = Tool.getLoginUser();
                axios.post(process.env.VUE_APP_SERVER + "/web/chat/get", {token: token}).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        let unreadCount = 0;
                        const chatId = Tool.getChatId();
                        let flag = false; // 标记当前会话对象是否还存在
                        const data: any[] = resp.data;
                        for(let i=0; i<data.length; i++) {
                            if(data[i].id === chatId) {
                                flag = true;
                            }
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
                        if(!flag) {
                            chat.id = "";
                            Tool.setChatId("");
                        }
                        noReadMsgCount.value = unreadCount;
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // WebSocket初始化建立
            function initWebSocket() {
                //创建WebSocket对象
                ws = new WebSocket("ws://localhost:8080/chat/" + user.id);
                //给ws绑定事件
                ws.onopen = function(){
                    //建立连接后要做的事情
                };
                //接收到服务端推送的消息后触发事件
                ws.onmessage = function(evt: any) {
                    //获取服务端推送过来的消息 dataStr是服务端传来的字符串
                    const dataStr = evt.data;
                    // //将dataStr转换为json对象
                    const res = JSON.parse(dataStr);
                    if(menuIndex.value === 1) {
                        // 当前用户在聊天页面
                        (chatList as any).value.getChatList();
                        getMessageList();
                    } else if(menuIndex.value === 2) {
                        // 在好友页面
                        (friendList as any).value.selectFriendListByLoginUser();
                        getNoMsgCount();
                    } else if(menuIndex.value === 4) {
                        // 在群聊页面
                        (groupList as any).value.getGroupList();
                        getNoMsgCount();
                    } else {
                        getNoMsgCount();
                    }
                }
            }






            // 左侧菜单栏切换下标
            const menuIndex = ref(1);
            // 当前模式
            const mode = ref("")
            // 左侧菜单栏切换
            function changeMenuIndex(id: number) {
                showProfileInfo.value = false;
                if(id === 3) {
                    if(mode.value === "dark") {
                        (document as any).querySelector('body').removeAttribute('class', 'dark');
                        mode.value = "";
                    } else {
                        (document as any).querySelector('body').setAttribute('class', 'dark');
                        mode.value = "dark";
                    }
                } else {
                    menuIndex.value = id;
                }
                Tool.loadJs();
            }

            // 跳转聊天页面
            function toChat(id: string, receiver: any, chatType: number) {
                menuIndex.value = 1;
                Tool.setChatId(id);
                Tool.setChatUser(receiver.id);
                chat.id = id;
                if(chatType === 1) {
                    getChatUser(receiver, id);
                } else if (chatType === 2) {
                    getChatGroup(receiver, id);
                }
                getMessageList()
            }

            // 关闭个人信息页面
            function closeProfileInfo() {
                showProfileInfo.value = false;
                Tool.loadJs();
            }

            let groupInfo = reactive({id: '', userId: '', chatId: "", name: '', groupPic: '', groupItemList: [], total: 0});
            // 获取群聊信息
            function getChatGroup(group: any, chatId: string) {
                // console.log(JSON.stringify(group));
                groupInfo.id = group.id;
                groupInfo.name = group.name;
                groupInfo.groupPic = group.groupPic;
                groupInfo.userId = group.userId;
                groupInfo.chatId = group.chatId;
                groupInfo.groupItemList = group.groupItemDTOList;
                groupInfo.total = group.groupItemDTOList.length;
                chat.id = chatId;
                chat.chatType = 2;
                profileType.type = 2;
                profileGroup.id = group.id;
            }

            // 上传文件
            const file = ref(null);
            function uploadFile() {
                const fileList = (file as any).value.files;
                if(fileList === null || fileList.length !== 1) {
                    Message.alertMsg("请选择一个文件！", "error");
                    return;
                }
                const uploadFile = fileList[0];
                const config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                const formData = new FormData();
                formData.append('file', uploadFile);
                formData.append('chatId', chat.id);
                if(chat.chatType === 1) {
                    formData.append('toId', receiverUser.id);
                } else if (chat.chatType === 2) {
                    formData.append('toId', groupInfo.id);
                }
                formData.append('userId', user.id);
                axios.post(process.env.VUE_APP_SERVER + "/file/upload", formData, config).then((response)=>{
                    let resp = response.data;
                    if(resp.code !== 0) {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
                (file as any).value.value = "";
            }

            // 打开文件选择窗口
            function openUploadFile() {
                (document as any).getElementById("file").click();
            }

            // 下载文件
            function downloadFile(id: string) {
                axios.get(process.env.VUE_APP_SERVER + "/file/download?id="+id).then((response)=>{
                    let resp = response.data;
                    if(resp.code !== 0) {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            // 打开查看好友信息
            function openFriendProfileInfo(id: string) {
                profileUser.id = id;
                profileType.type = 1;
                showProfileInfo.value = true;
                Tool.loadJs();
            }

            // 打开查看群聊信息
            function openGroupProfileInfo(id: string) {
                profileGroup.id = id;
                profileType.type = 2;
                showProfileInfo.value = true;
                Tool.loadJs();
            }

            // 退出/解散群聊后续操作
            function afterExitGroup(id: string) {
                if(id === profileGroup.id) {
                    closeProfileInfo();
                }
            }

            // 删除好友后续操作
            function afterDeleteFriend(id: string) {
                if(id === profileUser.id) {
                    closeProfileInfo();
                }
            }


            // 退出群聊
            function exitGroup(msg: string) {
                const confirm = Message.confirmMsg("确认"+ msg +"吗？");
                confirm.then(() => {
                    axios.post(process.env.VUE_APP_SERVER + "/web/group/exit", {id: groupInfo.id, userId: user.id}).then((response)=>{
                        let resp = response.data;
                        if(resp.code === 0) {
                            Message.alertMsg(msg + "成功！", "success");
                            if(menuIndex.value === 4) {
                                (groupList as any).value.getGroupList();
                            }
                            if(menuIndex.value === 1) {
                                // 当前用户在聊天页面
                                (chatList as any).value.getChatList();
                                getMessageList();
                            } else {
                                // 当前用户不在聊天页面
                                getNoMsgCount();
                            }
                            afterExitGroup(groupInfo.id);
                        }else {
                            Message.alertMsg(resp.msg, "error");
                        }
                    });
                }).catch((e) => {
                    // console.log(e);
                });
            }

            const showPersonInfo = ref(false);


            const friendList = ref(null);
            // 删除好友
            function deleteFriend() {
                const confirm = Message.confirmMsg("确认删除好友吗？");
                confirm.then(() => {
                    axios.post(process.env.VUE_APP_SERVER + "/web/friend/delete", {applyUser: user.id, receiveUser: receiverUser.id}).then((response)=>{
                        let resp = response.data;
                        if(resp.code === 0) {
                            if(menuIndex.value === 2) {
                                (friendList as any).value.selectFriendListByLoginUser();
                            }
                            if(menuIndex.value === 1) {
                                // 当前用户在聊天页面
                                (chatList as any).value.getChatList();
                                getMessageList();
                            } else {
                                // 当前用户不在聊天页面
                                getNoMsgCount();
                            }
                            afterDeleteFriend(receiverUser.id);
                        }else {
                            Message.alertMsg(resp.msg, "error");
                        }
                    });
                }).catch((e) => {
                    // console.log(e);
                });
            }

            // 重新加载聊天对象
            function reloadChatId(id: string) {
                if(chat.id === id) {
                    chat.id = "";
                    Tool.setChatId("")
                }
            }

            let saveUserInfo = reactive({id: "", username: "", password: "", phone: "", city: "", sex: "", headPic: "", info: "", token: ""});
            // 保存个人信息
            function savePersonInfo() {
                saveUserInfo.token = Tool.getLoginUser();
                axios.post(process.env.VUE_APP_SERVER + "/web/user/save", saveUserInfo).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        Message.alertMsg(resp.msg, "success");
                        showPersonInfo.value = false;
                        checkLogin();
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
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
                        saveUserInfo.headPic = resp.data;
                    } else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
                (photo as any).value.value = "";
            }

            // 打开上传图片的窗口
            function openUploadPhoto() {
                (document as any).getElementById("photo").click();
            }

            // 注销账户的操作
            function cancelAccount() {
                const confirm = Message.confirmMsg("确认注销账户吗？");
                confirm.then(() => {
                    axios.post(process.env.VUE_APP_SERVER + "/web/user/cancel", {id: user.id}).then((response)=>{
                        let resp = response.data;
                        if(resp.code === 0) {
                            Message.alertMsg(resp.msg, "success");
                            Tool.clearAllStorage();
                            (document as any).querySelector('body').removeAttribute('class', 'dark');
                            router.push({
                                path:"/"
                            });
                        }else {
                            Message.alertMsg(resp.msg, "error");
                        }
                    });
                }).catch((e) => {
                    // console.log(e);
                });
            }

            return {
                emojiMap,
                selectIcon,
                messageText,
                messageList,
                sendMsg,
                user,
                toChat,
                getChatUser,
                receiverUser,
                menuIndex,
                changeMenuIndex,
                chatList,
                chat,
                getMessageList,
                storageChatList,
                unreadMsgCount,
                noReadMsgCount,
                showProfileInfo,
                openProfileInfo,
                closeProfileInfo,
                getChatGroup,
                groupInfo,
                logout,
                uploadFile,
                file,
                openUploadFile,
                downloadFile,
                openFriendProfileInfo,
                profileUser,
                profileType,
                openGroupProfileInfo,
                profileGroup,
                afterExitGroup,
                exitGroup,
                groupList,
                afterDeleteFriend,
                friendList,
                deleteFriend,
                reloadChatId,
                showPersonInfo,
                savePersonInfo,
                saveUserInfo,
                uploadPhoto,
                openUploadPhoto,
                photo,
                cancelAccount
            }
        }


    }
</script>

<style>
    .el-dialog__header{padding:20px 20px 10px;background-color: #B3EBF5;margin-right:0px !important;}
    .el-descriptions__cell{
        max-width: 400px;
    }
    .el-icon {
        display: inline-block !important;
        padding-right: 20px !important;
    }
    .tab-active {
        color: #0a80ff !important;
    }
    .tab-no-active {
        color: initial !important;
    }
</style>
