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
// import "@/assets/js/rem"


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

Vue.directive('drag',//自定义指令          
  {
    bind: function (el, binding) {
      let oDiv = el; //当前元素
      oDiv.onmousedown = function (e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;

        document.onmousemove = function (e) {
          //通过事件委托，计算移动的距离 
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素 
          oDiv.style.left = l + 'px';
          oDiv.style.top = t + 'px';
          //将此时的位置传出去
          binding.value({ x: e.pageX, y: e.pageY })
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  }
);
