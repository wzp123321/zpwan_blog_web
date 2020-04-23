<template>
  <!-- -->
  <div
    :class="['music_wrapper',isMin?'min-player':'max-player']"
    id="music_player"
    @mousedown="handlemousedown"
  >
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
      <i class="iconfont icon-guanbi"></i>
    </div>
    <!-- 最小化 -->
    <div class="min-music-player" v-else>
      <i class="iconfont icon-yinle"></i>
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
    return flag;
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
  handlemousedown(e: any) {
    // 当前元素
    let music_player: any = document.querySelector("#music_player");
    //  鼠标按下，计算当前元素距离可视区的距离
    let disX = e.clientX - music_player.offsetLeft;
    let disY = e.clientY - music_player.offsetTop;
    this.isDrag = true;
    // 获取鼠标按下时间戳
    let startTime = e.timeStamp;
    document.onmousemove = (el: any) => {
      if (this.isDrag) {
        let moveX = el.clientX - disX;
        let moveY = el.clientY - disY;
        if (moveX < 0) {
          moveX = 0;
        }
        if (
          moveX >
          document.documentElement.clientWidth -
            music_player.getBoundingClientRect().width
        ) {
          moveX =
            document.documentElement.clientWidth -
            music_player.getBoundingClientRect().width;
        }
        if (
          moveY >
          document.documentElement.clientHeight -
            music_player.getBoundingClientRect().height
        ) {
          moveY =
            document.documentElement.clientHeight -
            music_player.getBoundingClientRect().height;
        }
        if (moveY < 0) {
          moveY = 0;
        }
        music_player.style.left = moveX + "px";
        music_player.style.top = moveY + "px";
      }
    };
    document.onmouseup = (el: any) => {
      const that = this;
      this.isDrag = false;
      let endTime = el.timeStamp;
      if (endTime - startTime < 150) {
        /**
         * 当鼠标点击抬起间隔不超过150时则为点击事件   此时判断当前点击元素包含的className来判断是否执行打开关闭事件
         */
        try {
          if (
            this.isMin &&
            el.target &&
            el.target.className.includes("icon-yinle")
          ) {
            this.getMusicPlayMax(false);
          } else if (
            el.target &&
            el.target.className &&
            el.target.className.includes("icon-guanbi")
          ) {
            this.getMusicPlayMax(true);
          }
        } catch (error) {}
      }
    };
  }
}
</script>
<style lang="less" scoped>
.music_wrapper {
  position: fixed;
  z-index: 999;
  left: 20px;
  bottom: 40px;
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

@media screen and (max-width: 1200px) {
  .music_wrapper {
    display: none;
  }
}
</style>