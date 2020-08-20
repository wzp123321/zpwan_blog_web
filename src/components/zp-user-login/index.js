import childrenComponent from './children.vue'

const childComp = {
  install: function (Vue) {
    Vue.component('zpUserLogin', childrenComponent)
  }
}

export default childComp
