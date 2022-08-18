/* eslint-disable @typescript-eslint/no-unused-vars */
import tracker from "../utils/tracker";
export function countStayTime() {
let getUserAPI = ''
let userid = localStorage.getItem('userId')
if(userid){
  var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
        httpRequest.open('GET', getUserAPI, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send();//第三步：发送请求  将请求参数写在URL中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;//获取到json字符串，还需解析
                localStorage.setItem('userId',json)
                console.log('userid',json);
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