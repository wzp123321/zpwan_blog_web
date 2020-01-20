import { getRequest, postRequest } from '../request'

const CommentModule = {
    /**
     * 
     * @param params 测试专用
     */
    async getCommentCreate(params: { [key: string]: any }) {
        const url = "/comment/web/add";
        return postRequest(url, params);
    },

    async getCommentList(params: { [key: string]: any }) {
        const url = "/comment/list";
        return getRequest(url, params);
    },
}

export default CommentModule