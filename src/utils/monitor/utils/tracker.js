class Tracker {
    constructor() {
        this.url = "";
    }

    send(data, target) {
        const targetData = {
            userid:localStorage.getItem("SDK_userId"),
            ...data
        };
        console.log("tracker-----", targetData);
        switch(target) {
            case 'user':
                this.sendToUser(targetData)
                break;
            case 'pageload':
                this.sendToPageload(targetData)
                break;
            case 'request':
                this.sendToRequest(targetData)
                break;
            case 'error':
                this.sendToError(targetData)
        }
    }

    sendToUser(data) {
        let url = 'https://monitor-backend.xiaotianxt.com/api/add/user'
        let query = new URLSearchParams(data).toString();
        var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
        httpRequest.open('GET', `${url}?${query}`, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send();//第三步：发送请求  将请求参数写在URL中
    }

    sendToPageload(data) {
        let url = 'https://monitor-backend.xiaotianxt.com/api/add/pageload'
        let query = new URLSearchParams(data).toString();
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', `${url}?${query}`, true);
        httpRequest.send();
    }

    sendToRequest(data) {
        let url = 'https://monitor-backend.xiaotianxt.com/api/add/request'
        let query = new URLSearchParams(data).toString();
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', `${url}?${query}`, true);
        httpRequest.send();
    }

    sendToError(data) {
        let url = 'https://monitor-backend.xiaotianxt.com/api/add/error'
        let query = new URLSearchParams(data).toString();
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', `${url}?${query}`, true);
        httpRequest.send();
    }
}
export default new Tracker();