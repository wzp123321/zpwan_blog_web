import { MusicState } from './types'
import { ActionTree } from 'vuex'
import { RootState } from '../types'

export const actions: ActionTree<MusicState, RootState> = {
    changeMusicData({ commit }, index): void {
        commit('changeCurMusicInfo', index)
    }
}