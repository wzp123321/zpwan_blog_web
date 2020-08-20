import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
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

// 引入bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// 引入flexible
import '@/assets/js/flexible'
//引入tag云
import tagCloud from 'v-tag-cloud'

// 引入自定义组件注册
import { customRegister } from '@/utils/customerRegister'
// 注册element组件
import { elementRegister } from '@/utils/elementRegister'

import bus from '@/utils/EventBus'
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(tagCloud)
// 引入event bus
Vue.prototype.bus = bus
window.eventBus = Vue.prototype.bus

router.beforeEach((to, from, next) => {
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isiOS && to.path !== location.pathname) {
    // 此处不可使用location.replace
    location.assign(to.fullPath)
  } else {
    next()
  }
  NProgress.start();
})

router.afterEach(route => {
  NProgress.done();
})


// 自定义组件
customRegister()
// element-ui组件注册
elementRegister()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// Vue.directive('drag',//自定义指令          
//   {
//     bind: function (el, binding) {
//       let oDiv = el; //当前元素
//       oDiv.onmousedown = function (e) {
//         //鼠标按下，计算当前元素距离可视区的距离
//         let disX = e.clientX - oDiv.offsetLeft;
//         let disY = e.clientY - oDiv.offsetTop;
//         document.onmousemove = function (e) {
//           //通过事件委托，计算移动的距离 
//           let l = e.clientX - disX;
//           let t = e.clientY - disY;
//           // 防止越界
//           if (l < 0) {
//             l = 0
//           }
//           if (l > document.documentElement.clientWidth - oDiv.getBoundingClientRect().width) {
//             l = document.documentElement.clientWidth - oDiv.getBoundingClientRect().width
//           }
//           if (t < 0) {
//             t = 0
//           }
//           if (t > document.body.clientHeight - oDiv.getBoundingClientRect().height) {
//             t = document.body.clientHeight - oDiv.getBoundingClientRect().height - 40
//           }
//           //移动当前元素 
//           oDiv.style.left = l + 'px';
//           oDiv.style.top = t + 'px';
//         };
//         document.onmouseup = function (e) {
//           document.onmousemove = null;
//           document.onmouseup = null;
//         };
//       };
//     }
//   }
// );
