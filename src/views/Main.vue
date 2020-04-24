<template>
  <div class="main-wrapper">
    <div style="flex:1">
      <TopBox></TopBox>
      <HeaderBox :isCeil="isCeil" :positionLeft="positionLeft"></HeaderBox>
      <BreadcrumbModule v-if="$route.path !=='/app'"></BreadcrumbModule>
      <ContentBox :style="{marginTop:isCeil?'64px':'10px'}"></ContentBox>
    </div>
    <FooterBox></FooterBox>
    <div class="scroll-to-top" v-show="isTop">
      <i class="iconfont icon-huojianxianxing" @click="handleScrollToTop"></i>
    </div>
    <!-- 音乐播放托盘 -->
    <MusicPlayer
      :isMin="isMin"
      :isPlay="isPlay"
      :cur_music="currentMusicInfo"
      :musicList="musicList"
      @change="handlePlayChange"
      @index_change="handleMusicIndexChange"
      @play_pause="handleMusicPlayPause"
    ></MusicPlayer>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TopBox from "@/layouts/TopBox.vue";
import HeaderBox from "@/layouts/HeaderBox.vue";
import ContentBox from "@/layouts/ContentBox.vue";
import FooterBox from "@/layouts/FooterBox.vue";
import BreadcrumbModule from "@/components/Breadcrumb.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
/**
 * 引入vuex
 */
import { namespace } from "vuex-class";

const musicModule = namespace("music");
@Component({
  name: "Main",
  components: {
    TopBox,
    HeaderBox,
    ContentBox,
    FooterBox,
    BreadcrumbModule,
    MusicPlayer
  }
})
export default class Main extends Vue {
  // 引入vuex
  @musicModule.Action("changeMusicData") public changeMusicData!: Function;
  @musicModule.Mutation("changeCurMusicInfo")
  public changeCurMusicInfo!: Function;
  @musicModule.Getter("currentMusicInfo") public currentMusicInfo!: MusicInfo;
  @musicModule.Getter("getMusicList") public getMusicList!: Array<MusicInfo>;
  @musicModule.State("current_musicInfo") public current_musicInfo!: MusicInfo;
  @musicModule.State("current_index") public current_index!: number;
  @musicModule.State("musicList") public musicList!: MusicInfo[];
  // 顶部是否吸顶
  private isCeil: boolean = false;
  // 距离左边距离
  private positionLeft: number = 0;
  // 是否显示回到顶骨图标
  private isTop: boolean = false;
  // 是否最小化
  private isMin: boolean = true;
  // 当前播放音乐索引
  private cur_index: number = 0;
  // 是否播放
  private isPlay: boolean = false;
  /**
   * 回到顶部
   */
  private handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  /**
   * 最大最小化
   */
  private handlePlayChange(flag: boolean) {
    this.isMin = flag;
  }
  // 切换歌曲
  private handleMusicIndexChange(index: number) {
    this.changeMusicData(index);
  }
  // 播放暂停
  private handleMusicPlayPause(flag: boolean) {
    this.isPlay = flag;
  }
  /**
   * 添加全局监听
   */
  mounted() {
    window.addEventListener("scroll", () => {
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop > 30) {
        let width =
          document.documentElement.clientWidth > 1140
            ? 1200
            : document.documentElement.clientWidth > 700
            ? 768
            : document.documentElement.clientWidth;
        this.positionLeft = (document.documentElement.clientWidth - width) / 2;
        this.isCeil = true;
      } else {
        this.isCeil = false;
      }
      if (scrollTop > 60) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
    });
  }
}
</script>
<style lang="less" scoped>
.main-wrapper {
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 40px;
    z-index: 999;
    .iconfont {
      transition: ease-in 1s linear;
      color: #31c27c;
      font-size: 50px;
      cursor: pointer;
    }
  }
}
</style>