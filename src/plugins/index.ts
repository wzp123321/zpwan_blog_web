// 引入自定义组件注册
import { customRegister } from './customerRegister'
// 注册element组件
import { elementRegister } from './elementRegister'
// 第三方插件
import { pluginRegister } from './pluginRegister'
// 绑定到vue实例上的方法
import { vueInjecter } from './injecter'

export {
    customRegister,
    elementRegister,
    pluginRegister,
    vueInjecter
}