<template>
  <div class="music-player-wrapper" v-if="musicInfo">
    <!-- audio组件 -->
    <audio
      :autoplay="false"
      ref="audio"
      :loop="mode===2"
      :src="musicInfo.src"
      :controls="false"
      @loadedmetadata="handleLoadData"
      @ended="handleMusicPlayEnd"
    ></audio>
    <div class="player-info flex-row">
      <!-- 最小化--歌曲封面 -->
      <div class="mini-player">
        <img :src="musicInfo.pic||require('../../assets/imgs/music_back.jpg')" alt />
        <i
          :class="['iconfont',isPlay?'icon-weibiaoti519':'icon-bofang']"
          @click="()=>{isPlay = !isPlay}"
        ></i>
        <i class="iconfont icon-zhankai-" v-show="isMin" @click="()=>{isMin = false}"></i>
      </div>
      <!-- 最大化--详细信息 -->
      <div class="max-player" :style="{'width':isMin?'0':'240px'}">
        <div class="max-player-info" v-if="!isMin">
          <i class="iconfont icon-guanbi" @click="()=>{isMin=true}"></i>
          <!-- 标题 -->
          <div class="max-player-info-title">
            {{musicInfo.title || '音乐播放器'}}
            <span>{{musicInfo.author || 'zpwan'}}</span>
          </div>
          <!-- 切换歌曲 -->
          <div class="max-player-info-switch">
            <i class="iconfont icon-diyiyeshouyeshangyishou" @click="getMusicPlayByListBefore"></i>
            <i class="iconfont icon-zuihouyiyemoyexiayishou" @click="getMusicPlayByListAfter"></i>
          </div>
          <!-- 播放进度 -->
          <div class="max-player-info-progress frspace">
            <Slider
              class="player-progress-wrapper"
              :min="0"
              :max="total"
              v-model="currentTime"
              @change="handleProgressChange"
              :format-tooltip="handleTooltipFormat"
            ></Slider>
            <div class="player-time">{{formatDuration(currentTime)}}/{{formatDuration(total)}}</div>
          </div>
          <!-- 音量/播放模式 -->
          <div class="max-player-info-operation">
            <!-- 音量 -->
            <span class="volume">
              <i class="iconfont icon-laba"></i>
              <Slider
                class="volume-wrapper"
                height="40"
                v-model="volume"
                :vertical="true"
                @change="handleVolumeChange"
              ></Slider>
            </span>
            <!-- 播放模式 -->
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
            <!-- 提示前往留言想听的歌 -->
            <span class="add">
              <i class="iconfont icon-tianjiajiahaowubiankuang" @click="handleAddMusicModal"></i>
            </span>
            <!-- 音乐列表 -->
            <span class="list">
              <i class="iconfont icon-liebiao"></i>
              <!-- 当前音乐列表 -->
              <div class="music-list">
                <div
                  class="music-list-item"
                  v-for="(musicItem,musicIndex) in musicList"
                  :key="musicIndex"
                >
                  <span>{{musicItem.title}}</span>
                  <span>{{musicItem.author}}</span>
                  <i :class="['iconfont',isPlay?'icon-weibiaoti519':'icon-bofang']"></i>
                </div>
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
import { Slider, MessageBox } from "element-ui";
import { formatDuration } from "@/utils/index";

@Component({
  name: "MusicPlayer",
  components: {
    Slider,
  },
})
export default class MusicPlayer extends Vue {
  // 当前播放位置
  private currentTime: number = 0;
  // 总时长
  private total: number = 0;
  // 定时器
  private timeInterval: any = null;
  // 当前播放模式 0-列表循环 1-随机播放
  private mode: number = 0;
  // 是否最小化
  private isMin: boolean = true;
  // 是否播放
  private isPlay: boolean = false;
  // 模式iconfont数组
  private modes: string[] = [
    "icon-xunhuanbofang",
    "icon-suijibofang",
    "icon-danquxunhuan",
  ];
  // 音量
  private volume: number = 50;

  // 格式化时间
  private formatDuration(time: number) {
    return formatDuration(time) || "00:00";
  }

  // 重新加载资源
  private handleLoadData(e: any) {
    const audio: any = this.$refs.audio;
    if (this.isPlay) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  // 播放结束
  private handleMusicPlayEnd() {
    switch (this.mode) {
      case 0:
        this.getMusicPlayByListAfter();
        break;
      case 1:
        this.getMusicRandomPlay();
        break;
    }
  }

  // 列表循环-- 下一首
  private getMusicPlayByListAfter() {
    let index = Number(this.current_index) + 1;
    index = index === this.musicList.length ? 0 : index;
    this.$store.dispatch("music/setCurrentIndex", index);
  }

  // 列表循环-- 上一首
  private getMusicPlayByListBefore() {
    let index = Number(this.current_index) - 1;
    index = index < 0 ? this.musicList.length - 1 : index;
    this.$store.dispatch("music/setCurrentIndex", index);
  }

  // 随机播放
  private getMusicRandomPlay() {
    let index = Math.ceil(Math.random() * this.musicList.length);
    this.$store.dispatch("music/setCurrentIndex", index);
  }

  // 切换模式
  private handleModeChange(mode: number) {
    this.mode = mode;
  }

  // 改变音量
  private handleVolumeChange(value: number) {
    let audio: any = this.$refs.audio;
    this.volume = value;
    audio.volume = (value / 100).toFixed(1);
  }

  // 改变进度
  private handleProgressChange(value: number) {
    const player: any = this.$refs.audio;
    this.currentTime = value;
    player.currentTime = value;
  }

  // 格式化tooltip
  private handleTooltipFormat(value: number) {
    return formatDuration(this.currentTime);
  }

  //获取当前已播放时间
  getPlayTime() {
    const audio: any = this.$refs.audio;
    this.timeInterval = setInterval(() => {
      this.currentTime = audio.currentTime;
    }, 1000);
  }

  // 获取audio时长
  private getTotalTimeByAudio() {
    const that = this;
    const audio: any = this.$refs.audio;
    if (audio != null) {
      audio.load();
      audio.oncanplay = function () {
        that.total = Math.floor(audio.duration);
      };
      audio.onerror = function () {
        that.getMusicPlayByListAfter();
      };
    }
  }

  // 新增歌曲提示留言对话框
  private handleAddMusicModal() {
    MessageBox.confirm("如果您想听什么歌，欢迎给我留言！", "温馨提示", {
      confirmButtonText: "确定",
      showCancelButton: false,
      callback: (action) => {
        this.$router.push("/leave_message");
      },
    });
  }

  @Watch("isPlay")
  private handlePlayStatusChange(newVal: boolean, oldVal: boolean) {
    const audio: any = this.$refs.audio;
    if (newVal) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  // 计算歌曲时长
  @Watch("musicInfo")
  private handleMusicChange(newVal: MusicInfo, oldVal: MusicInfo) {
    this.getTotalTimeByAudio();
  }

  /**
   * 通过计算属性得到当前音乐对象以及音乐数组
   */
  get current_index() {
    return this.$store.state.music.current_index;
  }

  get musicInfo() {
    return this.$store.state.music.musicInfo;
  }

  get musicList() {
    return this.$store.state.music.musicList;
  }

  mounted() {
    this.$nextTick(() => {
      if (this.musicInfo && this.musicInfo.src) {
        this.getPlayTime();
      }
      this.getTotalTimeByAudio();
    });
  }
}
</script>
<style lang="less" scoped>
.music-player-wrapper {
  position: fixed;
  bottom: 10px;
  left: 10px;
  min-width: 70px;
  min-height: 70px;
  color: #333;
  font-size: 10px;
  z-index: 999;

  .player-info {
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
    .mini-player {
      color: white;
      position: relative;
      width: 70px;
      height: 70px;
      background-color: rgba(0, 0, 0, 0.3);

      .iconfont {
        z-index: 3;
        font-size: 28px;
        position: relative;
        top: 25%;
        left: 28%;
      }
      .icon-weibiaoti519 {
        animation: rotate 500ms infinite forwards;
      }
      .icon-weibiaoti519,
      .icon-bofang {
        padding: 2px;
      }
      .icon-zhankai- {
        top: 53%;
        left: 38%;
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
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
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
        padding: 0 5px;
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
            flex: 1;
            height: 2px;
          }
          .player-time {
            margin-left: 5px;
          }
        }
        &-operation {
          text-align: right;
          font-size: 10px;
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
          span:last-child {
            padding-right: 0;
          }
          .volume-wrapper {
            position: absolute;
            bottom: 20px;
            left: -6px;
            height: 48px;
            display: none;
          }
          .mode:hover .mode-item {
            display: inline-block;
          }
          .volume:hover .volume-wrapper {
            display: inline-block;
          }
          .list:hover .music-list {
            display: inline-block;
          }
          .music-list {
            display: none;
            position: absolute;
            bottom: 12px;
            right: 12px;
            font-size: 10px;
            width: 85px;
            height: 57px;
            border: 1px solid #ededed;
            border-radius: 3px;
            background-color: white;
            overflow-y: scroll;
            &-item {
              border-bottom: 1px solid #ededed;
              span {
                display: inline-block;
                padding: 0 3px;
              }
              .iconfont {
                font-size: 10px;
              }
            }
            &-item:last-child {
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.volume {
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
}
.el-slider__button {
  width: 8px;
  height: 8px;
  border-color: #31c27c;
}

.player-progress-wrapper {
  position: relative;
  top: 9px;
  .el-slider__runway {
    margin: 0;
    height: 2px;
    .el-slider__bar {
      height: 2px;
      background-color: #31c27c;
    }
    .el-slider__button-wrapper {
      top: -17px;
    }
  }
}
</style>