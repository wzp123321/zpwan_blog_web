import { getRequest, postRequest } from '../request'

const PictureModule = {
    async getPictureBathCreate(params: { [key: string]: any }) {
        const url: string = '/picture/web/add';
        return postRequest(url, params);
    },

    async getPictureList(params: { [key: string]: any }) {
        const url: string = '/picture/list';
        return getRequest(url, params);
    }
}

export default PictureModule