import childrenComponent from './children.vue'
const childrenComp = {
  install: function (Vue) {
    Vue.component('zpArticleItem', childrenComponent)
  }
}
export default childrenComp
