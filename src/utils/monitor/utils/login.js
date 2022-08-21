// 首次执行sdk需要登录获取userid
export function login() {
    console.log("login----------");
    let getUserAPI = 'https://monitor-backend.xiaotianxt.com/api/useraction/login'
    let userid = localStorage.getItem('SDK_userId');
    let os = getOS()
    let browser = getBrowser().type
    let device = 'Surface'
    console.log(userid)
    if (!userid) {
        console.log("here")
        var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
        httpRequest.open('GET', `${getUserAPI}?device=${device}&os=${os}&browser=${browser}`, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send();//第三步：发送请求  将请求参数写在URL中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;//获取到json字符串，还需解析
                let res = JSON.parse(json)
                localStorage.setItem('SDK_userId', res.data)
                console.log('userid',res.data);
            }
        }
    }
}

function getOS() {
    var u = navigator.userAgent
    if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
        return 'windows'
    } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
        return 'macOS'
    } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
        return 'ios'
    } else if (u.match(/android/i)) {
        return 'android'
    } else if (u.match(/Ubuntu/i)) {
        return 'Ubuntu'
    } else {
        return 'other'
    }
}

function getBrowser() {
    var UserAgent = navigator.userAgent.toLowerCase();
    var browserInfo = {};
    var browserArray = {
        IE: window.ActiveXObject || "ActiveXObject" in window,
        // IE       
        Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1,
        // Chrome浏览器       
        Firefox: UserAgent.indexOf('firefox') > -1,
        // 火狐浏览器       
        Opera: UserAgent.indexOf('opera') > -1,
        // Opera浏览器        
        Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') == -1,
        // safari浏览器        
        Edge: UserAgent.indexOf('edge') > -1,
        // Edge浏览器        
        QQBrowser: /qqbrowser/.test(UserAgent),
        // qq浏览器        
        WeixinBrowser: /MicroMessenger/i.test(UserAgent)
        // 微信浏览器  
    };
    // console.log(browserArray)  
    for (var i in browserArray) {
        if (browserArray[i]) {
            var versions = '';
            if (i == 'IE') {
                versions = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)[2];
            } else if (i == 'Chrome') {
                for (var mt in navigator.mimeTypes) {

                    //检测是否是360浏览器(测试只有pc端的360才起作用)      
                    if (navigator.mimeTypes[mt]['type'] == 'application/360softmgrplugin') {
                        i = '360';
                    }
                }
                versions = UserAgent.match(/chrome\/([\d.]+)/)[1];
            } else if (i == 'Firefox') {
                versions = UserAgent.match(/firefox\/([\d.]+)/)[1];
            } else if (i == 'Opera') {
                versions = UserAgent.match(/opera\/([\d.]+)/)[1];
            } else if (i == 'Safari') {
                versions = UserAgent.match(/version\/([\d.]+)/)[1];
            } else if (i == 'Edge') {
                versions = UserAgent.match(/edge\/([\d.]+)/)[1];
            } else if (i == 'QQBrowser') {
                versions = UserAgent.match(/qqrowser\/([\d.]+)/)[1];
            }
            browserInfo.type = i; browserInfo.versions = parseInt(versions);
        }
    } 
    return browserInfo;
}