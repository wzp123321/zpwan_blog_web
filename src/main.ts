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
import "@/assets/css/iconfont.css"
// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// rem
import "@/assets/js/rem"


router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})

router.afterEach(route => {
  NProgress.done();
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
