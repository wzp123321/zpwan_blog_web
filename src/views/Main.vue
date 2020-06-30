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
    <!-- 用户登录对话框 -->
    <UserLoginModule></UserLoginModule>
    <!-- loading过渡 -->
    <LoadingModule></LoadingModule>
    <!-- 左下角音乐托盘 -->
    <MusicPlayer
      :isMin="isMin"
      :isPlay="isPlay"
      :musicInfo="musicInfo"
      :musicList="musicList"
      @minMax="handlePlayerMinMax"
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
import UserLoginModule from "@/components/UserLoginModal.vue";
import LoadingModule from "@/components/Loading.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import { Notification } from "element-ui";
Vue.prototype.$notify = Notification;

@Component({
  name: "Main",
  components: {
    TopBox,
    HeaderBox,
    ContentBox,
    FooterBox,
    BreadcrumbModule,
    UserLoginModule,
    LoadingModule,
    MusicPlayer
  }
})
export default class Main extends Vue {
  // 最小化
  private isMin: boolean = true;
  // 是否播放
  private isPlay: boolean = false;
  // 当前播放音乐
  private musicInfo: MusicInfo = {
    title: "有多少爱可以重来",
    pic:
      "http://p1.music.126.net/TIQMdKKvWY0dDr-yKBaBeQ==/19000660439853455.jpg",
    author: "迪克牛仔",
    src:
      "http://m7.music.126.net/20200629170120/6896e6329535c12e20240ee1e9162797/ymusic/071d/ca5f/ab5b/97adc83065f23caf6f4b409e961f0f0c.mp3"
  };
  // 当前播放列表
  private musicList: MusicInfo[] = [];

  // 顶部是否吸顶
  private isCeil: boolean = false;
  // 距离左边距离
  private positionLeft: number = 0;
  // 是否显示回到顶骨图标
  private isTop: boolean = false;
  // websocket对象
  private socket: any = {};
  /**
   * 播放器最大最小化
   */
  handlePlayerMinMax(value: boolean) {
    this.isMin = value;
  }
  /**
   * 回到顶部
   */
  private handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  //初始化websocket
  private initWebSocket() {
    if (typeof WebSocket === "undefined") {
      this.$message.error("您的浏览器不支持socket");
    } else {
      // 判断环境
      const env = process.env.NODE_ENV;
      const BASE_URL: string =
        env === "production" ? "132.232.66.140:9898" : "localhost:9898";
      // 判断请求协议http&https
      const protocol = document.location.protocol === "https:" ? "wss" : "ws";
      console.log("BASE_URL", BASE_URL);
      // 实例化socket
      this.socket = new WebSocket(`wss://${BASE_URL}/websocket`);
      // 监听socket连接
      this.socket.onopen = () => {
        console.log("socket连接成功");
      };
      // 监听socket错误信息
      this.socket.onerror = () => {
        console.log("连接错误");
      };
      // 监听socket消息
      this.socket.onmessage = (msg: any) => {
        console.log("msg", msg);
        this.notificationMessage(msg.data);
      };
    }
  }
  // 消息提醒
  private notificationMessage(data: string) {
    const info: { [key: string]: any } = JSON.parse(data);
    const href: string = `/article/${info.article_id}`;
    const title: string = info.type === 1 ? "文章新增" : "文章更新";
    const message: string =
      info.type === 1
        ? `又有新文章发布啦,<a href=${href}>快去浏览吧</a>`
        : `有文章更新啦,<a href=${href}>快去浏览吧</a>`;
    this.$notify({
      title,
      message,
      dangerouslyUseHTMLString: true,
      type: "success"
    });
  }
  /**
   * 添加全局监听
   */
  mounted() {
    this.initWebSocket();
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
  // 销毁前
  beforeDestroy() {
    this.socket = null;
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