import { getRequest, postRequest } from '../request'

const MusicModule = {
    async getMusicList(params: { [key: string]: any }) {
        const url: string = '/music/list';
        return getRequest(url, params);
    }
}

export default MusicModule