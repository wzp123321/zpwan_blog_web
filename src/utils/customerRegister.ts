import Vue from 'vue'


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
