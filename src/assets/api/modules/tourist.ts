import { getRequest, postRequest } from "../request"

const AdminModule = {
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