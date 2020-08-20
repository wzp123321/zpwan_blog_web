/**
 * 自定义组件注册
 */
import Vue from 'vue'
import bus from '@/utils/EventBus'


/* 自定义组件 */
const files = require.context('../components', true, /index\.js$/)
const modules: any = {}
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

// 自定义组件注册
export function customRegister() {
  Object.entries(modules).forEach((arr: any) => {
    Vue.use(arr[1]);
  })
}

// bus注册
export function busRegister() {
  Vue.prototype.bus = bus
  window.eventBus = Vue.prototype.bus
}
