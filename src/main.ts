import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

// 引入公共样式
import "@/assets/css/common.css"
// 引入element
import 'element-ui/lib/theme-chalk/index.css';
// iconfont
import "@/assets/js/iconfont.js"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
