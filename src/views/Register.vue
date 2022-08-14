<template>
    <body class="form-membership">
    <div class="form-wrapper">
        <!-- logo -->
        <div class="logo">
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
                </svg>
        </div>
        <!-- ./ logo -->
        <h5>注册</h5>

        <!-- form -->
        <form>

            <div class="form-group">
                <input type="text" v-model="registerUser.username" class="form-control" placeholder="请输入用户昵称...">
            </div>
            <div class="form-group">
                <input type="password" v-model="registerUser.password" class="form-control" placeholder="请输入用户密码...">
            </div>
            <div class="form-group">
                <input type="password" v-model="registerUser.rePassword" class="form-control" placeholder="请再次输入用户密码...">
            </div>
            <div class="form-group">
                <input type="password" v-model="registerUser.phone" class="form-control" placeholder="请输入手机号码...">
            </div>
            <input type="button" class="btn btn-primary btn-block" value="注 册" @click="register">
            <hr>
            <p class="text-muted">已有账号?</p>
            <router-link to="/"><a href="javascript:void(0)" class="btn btn-outline-light btn-sm">立即登录!</a></router-link>
        </form>
        <!-- ./ form -->

    </div>
    </body>
</template>

<script lang="ts">
    import {
        onMounted,
        reactive
    } from "vue";
    import axios from 'axios';
    import Message from "@/utils/Message";
    import Tool from "@/utils/Tool";
    import {useRouter} from 'vue-router'
    export default {

        setup() {

            onMounted(() => {
                // 动态加载js文件
                Tool.loadJs();
            });
            let registerUser: any = reactive({username: "", password: "", rePassword: "", phone: ""});
            const router = useRouter();
            function register() {

                axios.post(process.env.VUE_APP_SERVER + "/web/user/register", registerUser).then((response)=>{
                    let resp = response.data;
                    if(resp.code === 0) {
                        Message.alertMsg(resp.msg, "success");
                        registerUser = {};
                        router.push({
                            path:"/"
                        });
                    }else {
                        Message.alertMsg(resp.msg, "error");
                    }
                });
            }

            return {
                registerUser,
                register
            }
        }

    }
</script>
