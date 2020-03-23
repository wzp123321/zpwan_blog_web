<template>
  <div :class="['music_wrapper',isMin?'min-player':'max-player']"  v-drag="greet">
    <!-- 最大化 -->
    <div class="max-music-player" v-if="!isMin">
      <VueAplayer
        autoplay
        ref="vueplayer"
        :music="cur_music"
        @pause="handleVueAplayerPlayOrPause(false)"
        @play="handleVueAplayerPlayOrPause(true)"
        @timeupdate="onTimeupdate"
      ></VueAplayer>
      <i class="iconfont icon-diyiyeshouyeshangyishou" @click="changeCurrentIndex(-1)"></i>
      <i class="iconfont icon-zuihouyiyemoyexiayishou" @click="changeCurrentIndex(1)"></i>
      <i class="iconfont icon-guanbi" @click="getMusicPlayMax(true)"></i>
    </div>
    <!-- 最小化 -->
    <div :class="['min-music-player',isPlay?'playing':'']" v-else @click="getMusicPlayMax(false)">
      <i class="iconfont icon-yinle"></i>
      <!-- <audio src="cur_music.url" v-if="isPlay"></audio> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
// 引入缩放拖拽
import draggable from "vuedraggable";

import VueAplayer from "vue-aplayer";
@Component({
  name: "MusicPlayer",
  components: {
    VueAplayer,
    draggable
  }
})
export default class MusicPlayer extends Vue {
  private isDrag: boolean = false;
  // 是否最小化
  @Prop({ default: true })
  private isMin!: boolean;
  // 当前播放音乐
  @Prop({ default: {} })
  private cur_music!: MusicInfo;
  // 是否播放
  @Prop({ default: false })
  private isPlay!: boolean;
  @Prop({ default: [] })
  private musicList!: Array<MusicInfo>;
  // 最大化 最小化
  @Emit("change")
  private getMusicPlayMax(flag: boolean) {
    return this.isDrag ? false : flag;
  }
  // 切换歌曲
  @Emit("index_change")
  private changeCurrentIndex(cur: number) {
    return cur;
  }
  // 播放 暂停
  @Emit("play_pause")
  private handleVueAplayerPlayOrPause(flag: boolean) {
    return flag;
  }
  // 播放中
  private onTimeupdate(value: any) {}
  //
  greet() {}
}
</script>
<style lang="less" scoped>
.music_wrapper {
  position: fixed;
  z-index: 999;
  left: 20px;
  bottom:40px;
  .min-music-player {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    .iconfont {
      padding: 9px 10px;
      display: inline-block;
      color: #fff;
      font-size: 24px;
    }
  }
  .max-music-player {
    .iconfont {
      position: absolute;
      top: 35px;
    }
    .icon-diyiyeshouyeshangyishou {
      left: 83px;
    }
    .icon-zuihouyiyemoyexiayishou {
      left: 100px;
    }
    .icon-guanbi {
      top: 6px;
      right: 6px;
    }
  }
  .min-music-player:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
.max-player {
  width: 280px;
  height: 40px;
}

</style>