import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './module/user'

Vue.use(Vuex)

interface IRootState {
  user: IUserState
}

export default new Vuex.Store<IRootState>({})
