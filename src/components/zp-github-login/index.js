import childrenComponent from './children.vue'

const childComp = {
  install: function (Vue) {
    Vue.component('zpGithubLogin', childrenComponent)
  }
}

export default childComp
