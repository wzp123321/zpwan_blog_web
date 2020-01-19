import { getRequest, postRequest } from "../request"

const AdminModule = {
    /**
     * 
     * @param params 访客登录
     */
    async getTouristAdd(params: { [key: string]: any }) {
        const url = " /tourist/add";
        return postRequest(url, params);
    },

    async getTokenByUserId(params: { [key: string]: any }) {
        const url = "/token/getById";
        return postRequest(url, params);
    }
}

export default AdminModule