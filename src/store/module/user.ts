import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IUserState {
    userInfo: DashoboardModule.UserInfo
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public userInfo!: DashoboardModule.UserInfo;

    @Mutation
    private SET_USER_INFO (data: DashoboardModule.UserInfo) {
      this.userInfo = data
    }

    @Action
    public async setUserInfo (userInfo: DashoboardModule.UserInfo) {
      this.SET_USER_INFO(userInfo)
    }
}

export const UserModule = getModule(User)
