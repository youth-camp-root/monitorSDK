import SessionStorage from './session-storage'


/**
 * 保存登录用户信息
 */
const setLoginUser = (loginUser: any) => {
    SessionStorage.setSessionStorage(SessionStorage.SESSION_KEY_LOGIN_USER, loginUser);
};

/**
 * 获取登录用户信息
 */
const getLoginUser = () => {
    return SessionStorage.getSessionStorage(SessionStorage.SESSION_KEY_LOGIN_USER) || "";
};

/**
 * 保存当前会话信息
 */
const setChatId = (chatId: any) => {
    SessionStorage.setSessionStorage(SessionStorage.SESSION_KEY_CHAT_ID, chatId);
};

/**
 * 获取当前会话信息
 */
const getChatId = () => {
    return SessionStorage.getSessionStorage(SessionStorage.SESSION_KEY_CHAT_ID) || "";
};

/**
 * 保存当前会话信息
 */
const setChatList = (chatList: any) => {
    SessionStorage.setSessionStorage(SessionStorage.SESSION_KEY_CHAT_LIST, chatList);
};

/**
 * 获取当前会话信息
 */
const getChatList = () => {
    return SessionStorage.getSessionStorage(SessionStorage.SESSION_KEY_CHAT_LIST) || [];
};

/**
 * 保存当前会话对象
 */
const setChatUser = (chatUser: any) => {
    SessionStorage.setSessionStorage(SessionStorage.SESSION_KEY_CHAT_USER, chatUser);
};

/**
 * 获取当前会话对象
 */
const getChatUser = () => {
    return SessionStorage.getSessionStorage(SessionStorage.SESSION_KEY_CHAT_USER) || "";
};

/**
 * 清除全部缓存
 */
const clearAllStorage = () => {
    SessionStorage.clearAllSessionStorage();
};

/**
 * 空校验 null或""都返回true
 */
const isEmpty = (obj: any) => {
    if ((typeof obj == 'string')) {
        return !obj || obj.replace(/\s+/g, "") == ""
    } else {
        return (!obj || JSON.stringify(obj) === "{}" || obj.length === 0);
    }
};

/**
 * 非空校验
 */
const isNotEmpty = (obj: any) => {
    return !isEmpty(obj);
};

/**
 * 动态加载js
 */
const loadJs = () => {
    const jsArr = [{id: "js-1", src:"/static/vendor/bundle.js"}, {id: "js-2", src: "/static/dist/js/app.min.js"}];
    // 先卸载之前已有的js
    const srcArr = document.getElementsByTagName("script");
    for(let i=0; i<srcArr.length; i++) {
        for(let j=0; j<jsArr.length; j++) {
            if(srcArr[i].src.indexOf(jsArr[j].src) != -1) {
                const js = document.getElementById(jsArr[j].id);
                if(js) {
                    js.remove();
                }
            }
        }
    }
    // 重新加载js
    const head = document.getElementsByTagName("head")[0];
    for(let i=0; i<jsArr.length; i++)  {
        const script = document.createElement("script");
        script.src = jsArr[i].src;
        script.id = jsArr[i].id;
        head.append(script);
    }
};


export default {
    setLoginUser,
    getLoginUser,
    isEmpty,
    isNotEmpty,
    loadJs,
    setChatId,
    getChatId,
    setChatList,
    getChatList,
    setChatUser,
    getChatUser,
    clearAllStorage
}
