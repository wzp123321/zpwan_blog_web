declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// 声明vue-aplayer
declare module 'vue-aplayer';
// 声明拖拽缩放
declare module 'vuedraggable';
// tag云
declare module 'v-tag-cloud';
// 二维码插件
declare module 'weixin-js-sdk';
declare module 'qrcodejs2';


declare namespace ArticleModule {
  interface ArticleInfo {
      id?: string,
      title: string,
      content?: string,
      imgUrl?: string,
      description: string,
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
      children?: []
  }
}

/**
* 友情链接
*/
interface FriendlyLinkInfo {
  id: number,
  name: string,
  ico: string,
  url: string,
  isShelves: number,
  create_time: number,
  modify_time: number,
}

/**
* 通知
*/
interface NoticeInfo {
  id?: number,
  content?: string,
  isEmergency?: number,
  create_time?: number,
  modify_time?: number
}

/**
* 音乐
*/
interface MusicInfo {
  id?: number,
  title?: string,
  url?: string,
  musicLen?: number,
  pic?: string,
  author?: string,
  lrc?: string
}

/**
* 分享参数
*/
interface WeiXinShareInfo {
  title?: string,
  desc?: string,
  linkUrl?: string,
  img?: string
}

interface LeaveMessageInfo {
  leave_message_id?: string,
  content?: string,
  author?: any,
  reply_user?: any,
  is_parent?: number,
  parent_id?: string,
  is_delete?: number,
  is_shelves?: number,
  is_good?: number,
  init_date?: string,
  create_time?: number,
  modify_time?: number,
}

interface PictureInfo {
  createDate?: number,
  create_time?: number,
  init_date: string,
  modify_time?: number,
  picture_id?: string,
  picture_url: string
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
  data: T,
  hasNext?: boolean,
}

/**
 * 路由模块
 */
interface RouteInfo {
  path: string,
  meta: { name: string }
  children?: Array<RouteInfo>,
}

/**
 * 分页模块
 */
interface PaginationInfo {
  page: number,
  total: number,
  limit?: number
}

/**
 * 首页模块
 */
declare namespace DashoboardModule {
  /**
   * 用户信息
   */
  interface UserInfo {
    user_id?: string,
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