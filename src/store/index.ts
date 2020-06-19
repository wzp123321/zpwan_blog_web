import Vue from 'vue'
import Vuex from 'vuex'
import PermissionModule from './modules/permission'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    permission: PermissionModule
  }
})
