declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

/**
 * api相关
 */
interface ApiResponse<T> {
  code: number,
  data: T,
  message: string
}

interface ListResponse<T> {
  total: number,
  data: T
}


/**
 * 首页模块
 */
declare namespace DashoboardModule {

  /**
   * 用户信息
   */
  interface UserInfo {
    id: string,
    name: string,
    avatar_url: string,
    location?: string
  }

  /**
   * menu
   */
  interface MenuInfo {
    id: number,
    code: string,
    value: string,
    children: Array<MenuInfo>
  }

  /**
   * 目录模块
   */
  interface CatalogInfo {
    id: number,
    code: string,
    value: string,
    type: number,
    description: string,
    create_time: number,
    modify_time: number,
    pid: number,
    pvalue: string,
    pcode: string,
  }

  /**
   * banner模块
   */
  interface BannerInfo {
    title: string,
    imgUrl: string,
    url: string,
  }
}
