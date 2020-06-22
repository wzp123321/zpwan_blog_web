import { Module } from 'vuex';

interface PermissionState {
  userInfo: DashoboardModule.UserInfo;
}

const Permission: Module<PermissionState, {}> = {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    // 设置用户信息
    setUserInfo(state: PermissionState, userInfo: DashoboardModule.UserInfo) {
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      state.userInfo = userInfo;
    }
  },
  actions: {
    // 赋值用户信息
    async setUserInfo({ commit }, userInfo: DashoboardModule.UserInfo) {
      commit('setUserInfo', userInfo)
    }
  },
  getters: {
    userInfo(state: PermissionState) {
      if (localStorage.getItem('userInfo')) {
        const userInfo: DashoboardModule.UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
        state.userInfo = userInfo
      }
      return state.userInfo
    }
  }
};

export default Permission
