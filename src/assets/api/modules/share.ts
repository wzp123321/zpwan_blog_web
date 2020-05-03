import { getRequest, postRequest } from '../request'

const ShareModule = {
    async getShareConfig(params: { [key: string]: any }) {
        const url = "/web/wxshare/config";
        return postRequest(url, params);
    },

}

export default ShareModule