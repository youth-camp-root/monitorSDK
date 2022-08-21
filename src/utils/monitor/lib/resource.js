import tracker from "../utils/tracker";

export function injectResource() {
    // 资源加载成功
    if (!window.performance && !window.performance.getEntries) {
        return false;
    }

    var result = [];
    // 获取当前页面所有请求对应的PerformanceResourceTiming对象进行分析
    window.performance.getEntries().forEach(function (perf) {
        result.push({
            'url': perf.name,
            'entryType': perf.entryType,
            'type': perf.initiatorType,
            'duration(ms)': perf.duration
        });
    });

    // 发送
    tracker.send(result, 'resourceError');
}