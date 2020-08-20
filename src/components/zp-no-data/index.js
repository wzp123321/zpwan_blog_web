import childrenComponent from './children.vue'
const childrenComp = {
  install: function (Vue) {
    Vue.component('zpNoData', childrenComponent)
  }
}
export default childrenComp
