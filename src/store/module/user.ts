import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IUserState {
  name: string,
  user_id: string,
  avatar_url: string,
  location: string,
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public name!: string;
  public user_id!: string;
  public avatar_url!: string;
  public location!: string;


  @Mutation
  SET_USER_INFO(data: DashoboardModule.UserInfo) {
    this.name = data.name;
    this.user_id = data.user_id;
    this.avatar_url = data.avatar_url;
    this.location = data.location
  }

  @Action
  public async setUserInfo(userInfo: DashoboardModule.UserInfo) {
    this.SET_USER_INFO(userInfo)
  }
}

export const UserModule = getModule(User)
