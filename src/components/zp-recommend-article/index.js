import childrenComponent from './children.vue'

const childComp = {
  install: function (Vue) {
    Vue.component('zpRecommendArticle', childrenComponent)
  }
}
export default childComp
