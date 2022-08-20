/* eslint-disable @typescript-eslint/no-unused-vars */
import tracker from "../utils/tracker";
export function countStayTime() {
let getUserAPI = 'http://127.0.0.1:5000/api/useraction/login'
let userid = localStorage.getItem('userId')
let os = getOS()
let browser = getBrowser().type
let device = 'Surface'
console.log('os',os)
console.log('browser',browser)
console.log(userid)
if(!userid){
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
                localStorage.setItem('userId',res.data)
                // console.log('userid',json);
            }
        };
}
let timeStr
// 单页面 -- Hash模式
window.addEventListener('hashchange',()=>{
  let t = new Date().getTime() - timeStr
  timeStr = new Date().getTime()
  // console.log('待了时长：'+ t)
   if(t && t>=1){
      tracker.send({
          userid:this.userid,
          page:window.location.href,
          stayTime:t,
          type:"hashchange",
          time:new Date().getTime(),
      })
  }
  
})
// 单页面 -- History模式
let rewriteHis = function(type){
  let origin = window.history[type]
  return function(){
    let rs = origin.apply(this, arguments)
    let e = new Event(type.toLocaleLowerCase())
    e.arguments = arguments
    window.dispatchEvent(e)
    return rs
  }
}
  
window.history.pushState = rewriteHis('pushState')

window.history.replaceState = rewriteHis('replaceState')

window.addEventListener('onload',(e)=>{
  timeStr = new Date().getTime()
})

window.addEventListener('popstate',()=>{
  let t = new Date().getTime() - timeStr
  timeStr = new Date().getTime()
//   console.log('待了时长popstate：'+ t)
 if(t && t>=1){
  tracker.send({
    userid:this.userid,
    page:window.location.href,
    stayTime:t,
    type:"popstate",
    time:new Date().getTime(),
})}
})

window.addEventListener('pushstate',()=>{
  let t = new Date().getTime() - timeStr
  timeStr = new Date().getTime()
  if(t && t>=1){
  tracker.send({
    userid:this.userid,
    page:window.location.href,
    stayTime:t,
    type:"pushstate",
    time:new Date().getTime(),
})}
//   console.log('待了时长pushstate：'+ t)
})

window.addEventListener('replacestate',()=>{
  let t = new Date().getTime() - timeStr
  timeStr = new Date().getTime()
   if(t && t>=1){
  tracker.send({
    userid:this.userid,
    page:window.location.href,
    stayTime:t,
    type:"replacestate",
    time:new Date().getTime(),
})}
//   console.log('待了时长replacestate：'+ t)
})

// 多页面
let stopTime
// 加载/刷新
window.onpageshow = ()=>{
  stopTime = new Date().getTime()
}
// 关闭的时候（也就是点击叉），还是隐藏的时候（也就是点击左右箭头）
window.onpagehide = ()=>{
  stopTime = new Date().getTime() - stopTime
  // let record = localStorage.getItem('data')
  // let data = record && JSON.parse(record) || []
  if(stopTime && stopTime>=1){
    tracker.send({
      userid:this.userid,
      time:new Date().getTime(),
      page:window.location.href,
      stayTime:stopTime,
  })}
  // localStorage.setItem('data',
  // JSON.stringify([...data,{user:new Date().getTime(),path:window.location.href,stopTime}]))
}
// 但是刷新的时候会先触发onpagehide,在触发onpageshow
}

// 获取客户端属性
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
  } return browserInfo;
}
var getOS = function () {
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
};

// var getDevice() = function(){
//   // 获取初始信息
//   var app=navigator.appVersion;
//   //    根据括号进行分割
//        var left=app.indexOf('(');
//         var right=app.indexOf(')');
//         var str=app.substring(left+1,right); 
//       // console.log(str+'裁剪过后的');
//       var Str=str.split(";");
//   // 手机型号--苹果 iPhone
//   var Mobile_Iphone=Str[0];
//   // 手机型号--安卓 
//   var Mobile_Android=Str[2];
//     // 红米手机等特殊型号处理 匹配字符
//     var res=/Android/;
//     var reslut=res.test(Mobile_Android);
//   // 根据设备型号判断设备系统
//   if(phoneVersion=='iPhone'){
//     alert('访问设备型号'+Mobile_Iphone+'系统版本'+Str[1].substring(4,19));
//   }else if(phoneVersion=='Linux'){
//     if(reslut){
//       alert('访问设备型号'+Str[4].substring(0,9)+'系统版本'+Str[2]);
//     }else{
//       alert('访问设备型号'+Mobile_Android.substring(0,9)+'系统版本'+Str[1]);
//     }
//   }else if(phoneVersion=='iPad'){
//     alert('访问设备'+Str[0]+'系统版本'+Str[1].substring(4,12));
//   }
// }
