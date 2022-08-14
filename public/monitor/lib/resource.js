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

    // 控制台输出统计结果
    console.table(result);

    // 失败
    window.addEventListener('error', function (e) {
        var typeName = e.target.localName;
        var sourceUrl = "";
        if (typeName === "link") {
            sourceUrl = e.target.href;
        } else{
            sourceUrl = e.target.src;
        }
        var resourceLoadInfo = new ResourceLoadInfo(RESOURCE_LOAD, sourceUrl, typeName, "0");
        resourceLoadInfo.handleLogInfo(RESOURCE_LOAD, resourceLoadInfo);
        console.log("resourceLoadInfo",resourceLoadInfo);
    }, true);
}