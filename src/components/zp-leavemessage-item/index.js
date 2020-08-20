import childrenComponent from './children.vue'

const childComp = {
  install: function (Vue) {
    Vue.component('zpLeaveMessageItem', childrenComponent)
  }
}

export default childComp
