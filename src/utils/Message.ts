import { ElMessage, ElMessageBox } from 'element-plus'

const alertMsg = (msg: string, type: any) => {
    ElMessage({
        showClose: true,
        message: msg,
        type: type,
    })
};

const confirmMsg = (msg: string) => {
    const confirm = ElMessageBox.confirm(
        msg,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    );
    return confirm;
};

export default {
    alertMsg,
    confirmMsg
}



