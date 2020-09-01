import childrenComponent from './children.vue'

const childComp = {
  install: function (Vue) {
    Vue.component('zpLeavemessageItem', childrenComponent)
  }
}

export default childComp
