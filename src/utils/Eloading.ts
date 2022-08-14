import { ElLoading  } from 'element-plus'

// 初始化加载
const initLoading = () => {
    const loading = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    return loading;
};
// 关闭加载
const closeLoading = (loading: any) => {
    loading.close();
};

export default {
    initLoading,
    closeLoading
}
