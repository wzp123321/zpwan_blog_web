<template>
  <div class="music-player-wrapper">
    <!-- audio组件 -->
    <audio
      ref="player"
      :src="musicInfo.src || ''"
      :controls="false"
      :autoplay="true"
      :volume="volume"
      @pause="handleMusicPause"
      @play="handleMusicPlay"
      @playing="handleMusicPlaying"
      @timeupdate="handleTimeUpdate"
    ></audio>
    <div class="player-info flex-row">
      <!-- 最小化--歌曲封面 -->
      <div class="mini-player">
        <img :src="musicInfo.pic" alt />
        <i :class="['iconfont',isPlay?'icon-weibiaoti519':'icon-bofang']"></i>
        <i class="iconfont icon-zhankai-" v-show="isMin" @click="handlePlayerMaxMin(false)"></i>
      </div>
      <!-- 最大化--详细信息 -->
      <div class="max-player" :style="{'width':isMin?'0':'240px'}">
        <div class="max-player-info" v-if="!isMin">
          <i class="iconfont icon-guanbi" @click="handlePlayerMaxMin(true)"></i>
          <!-- 标题 -->
          <div class="max-player-info-title">
            {{musicInfo.title || '音乐播放器'}}
            <span>{{musicInfo.author || 'zpwan'}}</span>
          </div>
          <!-- 切换歌曲 -->
          <div class="max-player-info-switch">
            <i class="iconfont icon-diyiyeshouyeshangyishou"></i>
            <i class="iconfont icon-zuihouyiyemoyexiayishou"></i>
          </div>
          <!-- 播放进度 -->
          <div class="max-player-info-progress frspace">
            <div class="player-progress-wrapper">
              <div class="progress-loaded"></div>
              <div class="progress-playing flex-row">
                <div class="count" :style="{'width':progress+'%'}"></div>
                <span class="thumb"></span>
              </div>
            </div>
            <div class="player-time">{{play_time}}/{{total_time}}</div>
          </div>
          <!-- 音量/播放模式 -->
          <div class="max-player-info-operation">
            <span class="volume">
              <i class="iconfont icon-laba"></i>
              <Slider
                class="volume-wrapper"
                height="40"
                :value="(volume)*100"
                :vertical="true"
                @change="handleVolumeChange"
              ></Slider>
            </span>
            <span class="mode">
              <i :class="['iconfont',modes[mode]]"></i>
              <div class="mode-item">
                <i
                  v-for="(modeItem,modeIndex) in modes"
                  :key="'mode_'+modeIndex"
                  :class="['iconfont',modes[modeIndex],modeIndex===mode?'active-mode':'']"
                  @click="handleModeChange(modeIndex)"
                ></i>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { Slider } from "element-ui";
@Component({
  name: "MusicPlayer",
  components: {
    Slider
  }
})
export default class MusicPlayer extends Vue {
  private isDrag: boolean = false;
  // 当前播放时长
  private play_time: number = 0;
  // 当前音乐时长
  private total_time: number = 0;
  // 当前播放模式 0-列表循环 1-单曲循环 2随机播放
  private mode: number = 0;
  // 模式iconfont数组
  private modes: string[] = [
    "icon-suijibofang",
    "icon-xunhuanbofang",
    "icon-danquxunhuan"
  ];
  // 音量
  private volume: number = 0.5;
  // 是否最小化
  @Prop({ default: true })
  private isMin!: boolean;
  // 当前播放音乐
  @Prop({ default: {} })
  private musicInfo!: MusicInfo;
  // 是否播放
  @Prop({ default: false })
  private isPlay!: boolean;
  // 音乐列表
  @Prop({ default: [] })
  private musicList!: Array<MusicInfo>;
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
  // 最大最小化
  @Emit("minMax")
  private handlePlayerMaxMin(value: boolean) {
    return value;
  }
  // 切换模式
  private handleModeChange(mode: number) {
    this.mode = mode;
  }
  // 改变音量
  private handleVolumeChange(value: number) {
    this.volume = value / 100;
  }
  @Watch("isPlay")
  private handlePlayStatusChange(newVal: boolean, oldVal: boolean) {
    const player: any = this.$refs.player;
    if (newVal) {
      player.play();
    } else {
      player.pause();
    }
  }

  /**
   * 计算当前播放进度条长度
   */
  get progress() {
    const { play_time, total_time } = this;
    return total_time !== 0 ? (play_time / total_time).toFixed(2) : 0;
  }
}
</script>
<style lang="less" scoped>
.music-player-wrapper {
  position: fixed;
  bottom: 15px;
  left: 30px;
  min-width: 80px;
  min-height: 80px;
  color: #333;
  font-size: 10px;

  .player-info {
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
    .mini-player {
      color: white;
      position: relative;
      width: 80px;
      height: 80px;
      background-color: rgba(0, 0, 0, 0.3);

      .iconfont {
        z-index: 3;
        font-size: 28px;
        position: relative;
        top: 25%;
        left: 30%;
      }
      .icon-bofang {
        padding: 2px;
        border: 1px solid white;
        border-radius: 50%;
      }
      .icon-zhankai- {
        top: 16%;
        left: 45%;
        font-size: 10px;
        display: none;
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
    }
    .mini-player:hover .icon-zhankai- {
      display: inline-block;
    }
    .max-player {
      transition: 500ms all;
      background-color: white;
      .max-player-info {
        position: relative;
        height: 100%;
        padding: 1px 3px;
        .icon-guanbi {
          position: absolute;
          right: 4px;
          top: 1px;
          font-size: 10px;
        }
        &-title {
          margin-left: 3px;
          // 禁止换行解决内容展开时闪动现象
          white-space: nowrap;
          span {
            color: #666;
          }
        }
        &-progress {
          .player-progress-wrapper {
            padding: 2px 0;
            height: 2px;
            flex: 1;
            position: relative;
            top: 4px;
            .progress-loaded {
              height: 2px;
              width: 100%;
              background-color: #cdcdcd;
            }
            .progress-playing {
              width: 100%;
              position: absolute;
              left: 0;
              top: 2px;
              .count {
                height: 2px;
                background-color: #31c27c;
              }
              .thumb {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: 1px solid #31c27c;
                position: relative;
                bottom: 4px;
                background-color: white;
              }
            }
          }
          .player-time {
            margin-left: 5px;
          }
        }
        &-operation {
          text-align: right;
          font-size: 10px;
          margin-top: 5px;
          padding: 0 3px;
          .iconfont {
            font-size: 10px;
          }
          span {
            position: relative;
            padding: 5px;
            .mode-item {
              display: none;
              position: absolute;
              bottom: 18px;
              left: 0;
              width: 20px;
              z-index: 999;
              border: 1px solid #ededed;
              background-color: white;
              .iconfont {
                display: block;
                padding: 2px 5px;
              }
              .active-mode {
                color: #31c27c;
              }
            }
          }
          .volume-wrapper {
            position: absolute;
            bottom: 20px;
            left: -8px;
            height: 48px;
            display: none;
          }
          .mode:hover .mode-item {
            display: inline-block;
          }
          .volume:hover .volume-wrapper {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-slider.is-vertical .el-slider__runway,
.el-slider.is-vertical .el-slider__bar {
  width: 2px !important;
}
.el-slider.is-vertical .el-slider__bar {
  background-color: #31c27c;
}
.el-slider.is-vertical .el-slider__button-wrapper {
  left: -17px;
}
.el-slider__button {
  width: 8px;
  height: 8px;
  border-color: #31c27c;
}
</style>