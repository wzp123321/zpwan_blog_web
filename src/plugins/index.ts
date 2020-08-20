// 引入自定义组件注册
import { customRegister, busRegister } from './customerRegister'
// 注册element组件
import { elementRegister } from './elementRegister'
// 第三方插件
import { pluginRegister } from './pluginRegister'

export {
    busRegister,
    customRegister,
    elementRegister,
    pluginRegister
}