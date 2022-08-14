const SESSION_KEY_LOGIN_USER = "SESSION_KEY_LOGIN_USER"; // 普通用户登录信息
const SESSION_KEY_CHAT_ID = "SESSION_KEY_CHAT_ID"; // 当前会话信息
const SESSION_KEY_CHAT_LIST = "SESSION_KEY_CHAT_LIST"; // 当前会话列表
const SESSION_KEY_CHAT_USER = "SESSION_KEY_CHAT_USER"; // 当前会话对象

const getSessionStorage = (key: any) => {
    const v = sessionStorage.getItem(key);
    if (v && typeof(v) !== "undefined" && v !== "undefined") {
        const params = JSON.parse(v);
        if (params.time) {
            if (params.time > Date.parse(new Date().toString())) {
                return params.data;
            }
            removeSessionStorage(key);
        }
    }
};

const setSessionStorage = (key: any, data: any) => {
    const params = {
        data: data,
        time: Date.parse(new Date().toString()) + 60 * 1000 * 60
    };
    sessionStorage.setItem(key, JSON.stringify(params));
};

const removeSessionStorage = (key: any) => {
    sessionStorage.removeItem(key);
};

const clearAllSessionStorage = () => {
    sessionStorage.clear();
};


export default {
    SESSION_KEY_CHAT_ID,
    getSessionStorage,
    SESSION_KEY_LOGIN_USER,
    setSessionStorage,
    removeSessionStorage,
    clearAllSessionStorage,
    SESSION_KEY_CHAT_LIST,
    SESSION_KEY_CHAT_USER
}
