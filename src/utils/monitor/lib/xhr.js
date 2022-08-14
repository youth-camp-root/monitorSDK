export function injectXHR() {
    let XMLHttpRequest = window.XMLHttpRequest;
    let oldOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (
        method,
        url,
        async,
        username,
        password
    ) {
        // 上报的接口不用处理
        if (!url.match(/logstores/) && !url.match(/sockjs/)) {
            this.logData = {
                method,
                url,
                async,
                username,
                password,
            };
        }
        return oldOpen.apply(this, arguments);
    };
    let oldSend = XMLHttpRequest.prototype.send;
    let start;
    XMLHttpRequest.prototype.send = function (body) {
        if (this.logData) {//有值表示经过拦截
            start = Date.now();//记录开始时间以计算耗时
            let handler = (type) => () => {
                let status = this.status;
                let statusText = this.statusText;
                // 上传日志
                console.log('tarck-----------', {
                    //未捕获的promise错误
                    type: "xhr", //xhr
                    eventType: type, //请求类型 load error abort
                    pathname: this.logData.url, //接口的url地址
                    status: status + "-" + statusText,// 状态码
                    duration: "" + Date.now() - start, // 耗时
                    response: this.response ? JSON.stringify(this.response) : "",// 返回信息
                    params: body || "", //请求参数
                });
            };
            this.addEventListener("load", handler("load"), false);
            this.addEventListener("error", handler("error"), false);//失败
            this.addEventListener("abort", handler("abort"), false);//放弃
        }
        oldSend.apply(this, arguments);
    };
}

// export function injectXHR() {
//     let XMLHttpRequest = window.XMLHttpRequest;
//     let oldOpen = XMLHttpRequest.prototype.open;
//     XMLHttpRequest.prototype.open = function() {

//     }
// }