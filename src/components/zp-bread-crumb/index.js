import childrenComponent from './children.vue'
const childrenComp = {
  install: function (Vue) {
    Vue.component('zpBreadCrumb', childrenComponent)
  }
}
export default childrenComp
