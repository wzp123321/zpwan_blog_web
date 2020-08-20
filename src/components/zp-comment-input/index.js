import childrenComponent from './children.vue'

const childComp = {
  install: function (Vue) {
    Vue.component('zpCommentInput', childrenComponent)
  }
}

export default childComp
