import tracker from "../utils/tracker";

export function injectBlankScreen() {
    // "FP 白屏时间",
    // "FCP 灰屏时间",
    // DomReady HTML加载完成时间
    // DNS DNS查询时间
    window.onload = function () {
        let FP, FCP, DOMReady, dnsDuration;
        new PerformanceObserver((entryList) => {
            // console.log(entryList.getEntries());
            FP = entryList.getEntriesByName("first-paint")[0].startTime;
            FCP = entryList.getEntriesByName("first-contentful-paint")[0].startTime;
            tracker.send({ FP, FCP });
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
            tracker.send({ DOMReady,dnsDuration });
        }).observe({ entryTypes: ["navigation"] });
    };

}