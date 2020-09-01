/**
 * @author zpwan
 * @description 注入器
 */

import Vue from "vue";
import bus from '@/utils/EventBus'

import { throttle, debounce, audioPlay, delay, getAllImages } from '../utils/index'

const vueInjecter = {
    install: (Vue: any, options: any) => {
        Vue.prototype.$throttle = throttle; // 节流
        Vue.prototype.$debounce = debounce; // 防抖函数
        Vue.prototype.$audioPlay = audioPlay // 音频播放
        Vue.prototype.$delay = delay;
        Vue.prototype.$bus = new Vue();
        Vue.prototype.bus = bus;
        window.eventBus = Vue.prototype.bus;
        Vue.prototype.$getAllImages = getAllImages;// 获取富文本所有图片
    }
};

export { vueInjecter };
