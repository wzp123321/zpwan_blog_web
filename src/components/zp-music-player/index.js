import childrenComponent from './children.vue'

const childComp = {
  install: function (Vue) {
    Vue.component('zpMusicPlayer', childrenComponent)
  }
}
export default childComp
