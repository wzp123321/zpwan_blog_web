import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// 引入插件css
import "@/assets/css/common.css"
import "@/assets/js/iconfont.js"
import "@/assets/css/iconfont.css"
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'viewerjs/dist/viewer.css';

// 引入第三方插件注册
import { customRegister, elementRegister, pluginRegister, vueInjecter } from '@/plugins/index'

// 自定义组件
customRegister()
// element-ui组件注册
elementRegister()
// 第三方插件
pluginRegister()

// * ----------------------------------------
// * 调用注入器
// * ----------------------------------------
Vue.use(vueInjecter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
