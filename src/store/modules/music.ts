import { Module } from 'vuex';
import HttpRequest from '@/assets/api/modules/index'
interface MusicState {
    current_index: number,
    musicInfo: MusicInfo,
    musicList: MusicInfo[]
}

const Music: Module<MusicState, {}> = {
    namespaced: true,
    state: {
        current_index: 0,// 当前音乐索引
        musicInfo: {},
        musicList: []
    },
    mutations: {
        // 设置音乐索引
        setCurrentIndex(state: MusicState, index: number) {
            localStorage.setItem('zpwan_music_index', String(index))
            state.musicInfo = state.musicList[index];
            state.current_index = index;
        },
        // 设置数组
        setMusicList(state: MusicState, musicList: MusicInfo[]) {
            localStorage.setItem('zpwan_musicList', JSON.stringify(musicList))
            state.musicList = musicList;
        }
    },
    actions: {
        // 设置音乐
        async setCurrentIndex({ commit }, index: number) {
            return commit('setCurrentIndex', index)
        },
        // 设置音乐数组
        async setMusicList({ commit }, musicList: MusicInfo[]) {
            return commit('setMusicList', musicList)
        }
    },
    getters: {
        current_index(state: MusicState) {
            return state.current_index
        },
        musicInfo(state: MusicState) {
            return state.musicInfo
        },
        musicList(state: MusicState) {
            return state.musicList
        }
    }
};



export default Music
