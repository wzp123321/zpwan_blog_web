import {
  getRequest,
  postRequest
} from "../request"

const BannerModule = {
  async getBannerList(params: { [key: string]: any }) {
    const url = "/banner/list"
    return getRequest(url, params)
  },
}

export default BannerModule
