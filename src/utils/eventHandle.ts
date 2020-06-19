/**
 * 全局事件处理分发
 */
/**
 * 
 * @param args type:类型   data：参数
 */
export const blogEventHandle = (args: { type: string, data: any }) => {
    const { type, data } = args
    switch (type) {
        case 'user-login-show':
            window.eventBus.$emit('handleLoginModalShow', data);
            break;
    }
}