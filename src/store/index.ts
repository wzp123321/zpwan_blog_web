import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { music } from "./music/index"

Vue.use(Vuex)
// https://www.jianshu.com/p/25a2b9b45c99

const store: StoreOptions<RootState> = {
  modules: {
    music
  }
}

export default new Vuex.Store<RootState>(store)