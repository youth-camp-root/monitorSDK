import tracker from "../utils/tracker";

export function injectJsError() {
    //一般JS运行时错误使用window.onerror捕获处理
    window.addEventListener(
        "error",
        function (event) {
            // 有 e.target.src(href) 的认定为资源加载错误
            if (event.target && (event.target.src || event.target.href)) {
                tracker.send({
                    //资源加载错误
                    // type: "error", //resource
                    // errorType: "resourceError",
                    // filename: event.target.src || event.target.href, //加载失败的资源
                    // tagName: event.target.tagName, //标签名
                    // timestamp: event.timeStamp, //时间
                    category: 'Resource',
                    originURL: event.target.src || event.target.href,
                    timestamp: event.timeStamp,
                    errorType: "resourceError",
                    filename: event.target.src || event.target.href,
                    rsrcTimestamp: perf.duration,
                    tagName: event.target.tagName,
                    selector: ''
                }, 'error');
            } else {
                tracker.send({
                    // type: "error", //error
                    category: 'JS',
                    originURL: event.target.src || event.target.href,
                    timestamp: event.timeStamp,
                    errorType: "jsError", //jsError
                    errorMsg: event.message, //报错信息
                    filename: event.filename, //报错链接
                    position: (event.lineNo || 0) + ":" + (event.columnNo || 0), //行列号
                    stack: event.error.stack, //错误堆栈
                    selector: ''
                }, 'error');
            }
        },
        true
    ); 
}