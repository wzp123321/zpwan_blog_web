import childrenComponent from './children.vue'

const childComp = {
  install: function (Vue) {
    Vue.component('zpLoading', childrenComponent)
  }
}

export default childComp
