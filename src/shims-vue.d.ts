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
    id?: string,
    name?: string,
    avatar_url?: string,
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

declare namespace ArticleModule {
  interface ArticleInfo {
    id?: string,
    title?: string,
    content?: string,
    imgUrl?: string,
    description?: string,
    author?: string,
    tags?: string,
    first_catalogId?: number,
    first_catalogName?: string,
    second_catalogId?: 9
    second_catalogName?: string,
    isDelete?: number,
    isShelves?: number,
    isRecommend?: number,
    isTop?: number,
    visit_count?: number,
    like_count?: number,
    comment_count?: number,
    create_time?: number,
    modify_time?: number,
  }
  interface CommentInfo {
    id: string,
    author: DashoboardModule.UserInfo,
    article_id: string,
    content: string,
    is_delete: number,
    ups: number,
    downs: number,
    parent_id: string,
    is_root: string,
    reply_userInfo: DashoboardModule.UserInfo,
    create_time: number,
    children?:[]
  }
}

interface FriendlyLinkInfo {
  id: number,
  name: string,
  ico: string,
  url: string,
  isShelves: number,
  create_time: number,
  modify_time: number,
}