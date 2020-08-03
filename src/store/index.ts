import Vue from 'vue'
import Vuex from 'vuex'
import PermissionModule from './modules/permission'
import MusicModule from './modules/music'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    permission: PermissionModule,
    music: MusicModule
  }
})
