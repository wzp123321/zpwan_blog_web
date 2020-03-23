import { GetterTree } from 'vuex'
import { MusicState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<MusicState, RootState> = {
    currentMusicInfo(state): MusicInfo {
        return state.musicList[state.current_index]
    },
    getMusicList(state): Array<MusicInfo> {
        return state.musicList
    }
}