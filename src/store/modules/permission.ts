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
      state.userInfo = userInfo;
    }
  },
  actions: {
    // 赋值用户信息
    async setUserAction({ commit }, userInfo:DashoboardModule.UserInfo) {
      commit('setUserInfo', userInfo)
    }
  },
  getters: {
    userInfo(state: PermissionState) {
      return state.userInfo
    }
  }
};

export default Permission
