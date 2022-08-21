class Tracker {
    constructor() {
        this.url = "https://monitor-backend.xiaotianxt.com";
    }

    send(data, target) {
        const targetData = {
            user:localStorage.getItem("SDK_userId"),
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
        let url = this.url + '/api/add/user?'
        for(let key in data) {
            data[key] += "";
            url += `${key}=${data[key]}&`;
        }
        var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
        httpRequest.open('GET', url, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send();//第三步：发送请求  将请求参数写在URL中
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;//获取到json字符串，还需解析
                let res = JSON.parse(json)
                console.log("res",res);

            }
        }
    }

    sendToPageload(data) {
        let url = this.url + '/api/add/pageload?'
        for(let key in data) {
            data[key] += "";
            url += `${key}=${data[key]}&`;
        }
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', url, true);
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;//获取到json字符串，还需解析
                let res = JSON.parse(json)
                console.log("res",res);

            }
        }
    }

    sendToRequest(data) {
        let url = this.url + '/api/add/request?'
        for(let key in data) {
            data[key] += "";
            url += `${key}=${data[key]}&`;
        }
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', url, true);
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;//获取到json字符串，还需解析
                let res = JSON.parse(json)
                console.log("res",res);

            }
        }
    }

    sendToError(data) {
        let url = this.url +'/api/add/error?'
        for(let key in data) {
            data[key] += "";
            url += `${key}=${data[key]}&`;
        }
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET',  url , true);
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;//获取到json字符串，还需解析
                let res = JSON.parse(json)
                console.log("res",res);
            }
        }
    }
}
export default new Tracker();