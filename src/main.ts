import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'

import "@/utils/monitor"

const app = createApp(App);
app.use(ElementUI);
app.use(router).mount('#app');
import Eloading from "@/utils/Eloading";

let Promise: any;
let loading: any;
axios.interceptors.request.use(config => {
    loading = Eloading.initLoading();
    return config
}, error => {
    return Promise.error(error)
});

axios.interceptors.response.use(config => {
    Eloading.closeLoading(loading);
    return config
}, error => {
    return Promise.error(error)
});
