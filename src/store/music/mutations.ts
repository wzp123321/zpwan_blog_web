import { MutationTree } from 'vuex'
import { MusicState } from './types'

export const mutations: MutationTree<MusicState> = {
    changeCurMusicInfo(state, index: number) {
        const len = state.musicList.length;
        const idx = state.current_index + index <= 0 ? len - 1 : state.current_index + index > len - 1 ? 0 : state.current_index + index;
        state.current_musicInfo = state.musicList[idx];
        state.current_index = idx;
    }
}