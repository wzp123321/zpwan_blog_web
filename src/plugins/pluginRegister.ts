/**
 * 第三方插件注册
 */
import Vue from 'vue'
import router from '../router'

// 引入nprogress
import NProgress from 'nprogress'

// 引入bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// 引入flexible
import '@/assets/js/flexible'
//引入tag云
import tagCloud from 'v-tag-cloud'
// 图片预览插件
import Viewer from 'v-viewer';



export function pluginRegister() {
    Vue.use(BootstrapVue)
    Vue.use(IconsPlugin)
    Vue.use(tagCloud)
    Vue.use(Viewer);

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


}