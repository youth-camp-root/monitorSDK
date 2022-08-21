import tracker from "../utils/tracker";
export function countStayTime() {
  let FP, FCP, DOMReady, dnsDuration;
  window.onload = function () {
    new PerformanceObserver((entryList) => {
        // console.log(entryList.getEntries());
        FP = entryList.getEntriesByName("first-paint")[0].startTime;
        FCP = entryList.getEntriesByName("first-contentful-paint")[0].startTime;
        // tracker.send({ FP, FCP });
    }).observe({ type: "paint", buffered: true });

    new PerformanceObserver((entryList) => {
        const {
            domContentLoadedEventEnd,
            fetchStart,
            domainLookupEnd,
            domainLookupStart,
        } = entryList.getEntries()[0];
        // console.log(entryList.getEntries()[0]);
        // console.log("fetchSatrt", fetchStart);
        // console.log("domContentLoadedEventEnd", domContentLoadedEventEnd);
        DOMReady = domContentLoadedEventEnd - fetchStart
        // domainLookupStart DNS域名解析开始
        // domainLookupEnd DNS域名解析结束
        dnsDuration = domainLookupEnd - domainLookupStart;
        // 发送
        // tracker.send({ DOMReady,dnsDuration });
    }).observe({ entryTypes: ["navigation"] });
  };

  let timeStr
  // 单页面 -- Hash模式
  window.addEventListener('hashchange', () => {
    let t = new Date().getTime() - timeStr
    timeStr = new Date().getTime()
    // console.log('待了时长：'+ t)
    if (t && t >= 1) {
      tracker.send({
          pageUrl: window.location.href,
          // type:"hashchange",
          // timestamp: Date.now(),
          FP: FP,
          FCP: FCP,
          DOMReady: DOMReady,
          stayDuration: t,
      }, 'pageload')
    }

  })
  // 单页面 -- History模式
  let rewriteHis = function (type) {
    let origin = window.history[type]
    return function () {
      let rs = origin.apply(this, arguments)
      let e = new Event(type.toLocaleLowerCase())
      e.arguments = arguments
      window.dispatchEvent(e)
      return rs
    }
  }

  window.history.pushState = rewriteHis('pushState')

  window.history.replaceState = rewriteHis('replaceState')

window.addEventListener('popstate',()=>{
  let t = new Date().getTime() - timeStr
  timeStr = new Date().getTime()
//   console.log('待了时长popstate：'+ t)
 if(t && t>=1){
  tracker.send({
    pageUrl: window.location.href,
    stayDuration: t,
    // type:"popstate",
    // timestamp: Date.now(),
    FP: FP,
    FCP: FCP,
    DOMReady: DOMReady,
}, 'pageload')}
})

window.addEventListener('pushstate',()=>{
  let t = new Date().getTime() - timeStr
  timeStr = new Date().getTime()
  if(t && t>=1){
  tracker.send({
    pageUrl: window.location.href,
    stayDuration: t,
    // type:"pushstate",
    // timestamp: Date.now(),
    FP: FP,
    FCP: FCP,
    DOMReady: DOMReady,
}, 'pageload')}
//   console.log('待了时长pushstate：'+ t)
})

window.addEventListener('replacestate',()=>{
  let t = new Date().getTime() - timeStr
  timeStr = new Date().getTime()
   if(t && t>=1){
  tracker.send({
    pageUrl: window.location.href,
    stayDuration: t,
    // type:"replacestate",
    // timestamp: Date.now(),
    FP: FP,
    FCP: FCP,
    DOMReady: DOMReady,
}, 'pageload')}
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
      pageUrl: window.location.href,
      stayDuration: stopTime,
      // type:"replacestate",
      // timestamp: Date.now(),
      FP: FP,
      FCP: FCP,
      DOMReady: DOMReady,
  }, 'pageload')}
  // localStorage.setItem('data',
  // JSON.stringify([...data,{user:new Date().getTime(),path:window.location.href,stopTime}]))
}
// 但是刷新的时候会先触发onpagehide,在触发onpageshow
}
