<template>
  <div class="music-player-wrapper">
    <!-- audio组件 -->
    <audio
      :src="music.src"
      :controls="false"
      :autoplay="true"
      :volume="volume"
      @pause="handleMusicPause"
      @play="handleMusicPlay"
      @playing="handleMusicPlaying"
      @timeupdate="handleTimeUpdate"
    ></audio>
    <!-- 缩小 -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "MusicPlayer",
  components: {}
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
  // 音量
  @Prop({ default: "0.5" })
  private volume!: number;
  // 最大化 最小化
  @Emit("change")
  private getMusicPlayMax(flag: boolean) {
    return flag;
  }
  // 切换歌曲
  @Emit("index_change")
  private changeCurrentIndex(cur: number) {
    return cur;
  }
  // 暂停
  @Emit("pause")
  private handleMusicPause(flag: boolean) {
    return flag;
  }
  // 播放
  @Emit("play")
  private handleMusicPlay(flag: boolean) {
    return flag;
  }
  // 播放中
  @Emit("playing")
  private handleMusicPlaying(e: any) {
    return e;
  }
  // 时间更新
   @Emit("timeupdate")
  private handleTimeUpdate(e: any) {
    return e;
  }
  
}
</script>
<style lang="less" scoped>
.music-player-wrapper {
  position: absolute;
  bottom: 50px;
  left: 30px;
}
</style>