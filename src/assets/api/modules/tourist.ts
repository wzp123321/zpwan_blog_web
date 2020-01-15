import { getRequest, postRequest } from "../request"

export const AdminModule = {

    async getTokenByUserId(params: { [key: string]: any }) {
        const url = "";
        return getRequest(url, params);
    }
}