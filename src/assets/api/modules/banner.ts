import {
  getRequest,
  postRequest
} from "../request"

const BannerModule = {
  async getBannerList(params: { [key: string]: any }) {
    const url = "/banner/list"
    return getRequest(url, params)
  },

  async getFriendlyLinkList(params: { [key: string]: any }) {
    const url = "/friendlylink/list"
    return getRequest(url, params)
  },

  async getFriendlyLinkAdd(params: { [key: string]: any }) {
    const url = "/friendlylink/web/add"
    return postRequest(url, params)
  },

}

export default BannerModule
