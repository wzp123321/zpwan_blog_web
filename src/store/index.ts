import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { music } from "./music/index"

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    music
  }
}

export default new Vuex.Store<RootState>(store)
