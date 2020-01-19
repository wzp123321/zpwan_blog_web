import { getRequest, postRequest } from "@/assets/api/request"

const ArticleModule = {
    async getArticleList(params: { [key: string]: any }) {
        const url = '/article/web/list'
        return getRequest(url, params);
    },


    async getArticleInfoById(params: { [key: string]: any }) {
        const url = '/article/getById'
        return getRequest(url, params);
    },

    async getArticleInfoVisit(params: { [key: string]: any }) {
        const url = '/article/visit'
        return getRequest(url, params);
    },

    async getArticleInfoUps(params: { [key: string]: any }) {
        const url = '/article/ups'
        return getRequest(url, params);
    },

    
    async getHotArticleList(params: { [key: string]: any }) {
        const url = 'article/web/hotlist'
        return getRequest(url, params);
    },

}

export default ArticleModule