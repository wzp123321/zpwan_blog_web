<template>
  <div class="main-wrapper">
    <div style="flex:1">
      <TopBox></TopBox>
      <HeaderBox :isCeil="isCeil" :positionLeft="positionLeft"></HeaderBox>
      <zp-bread-crumb v-if="$route.path !=='/app'"></zp-bread-crumb>
      <ContentBox :style="{marginTop:isCeil?'64px':'10px'}"></ContentBox>
    </div>
    <FooterBox></FooterBox>
    <div class="scroll-to-top" v-show="isTop">
      <i class="iconfont icon-huojianxianxing" @click="handleScrollToTop"></i>
    </div>
    <!-- 用户登录对话框 -->
    <zp-user-login></zp-user-login>
    <!-- 左下角音乐托盘 -->
    <zp-music-player class="music-player"></zp-music-player>
    <!-- 图片预览 -->
    <viewer v-show="false" :images="viewerList" class="images" ref="viewer">
      <img v-for="src in viewerList" :src="src" :key="src" class="image" />
    </viewer>
    <!-- <div v-show="false" v-viewer ref="viewer">
      <img v-for="(view, index) in viewerList" :key="index" :src="view" />
    </div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TopBox from "@/layouts/TopBox.vue";
import HeaderBox from "@/layouts/HeaderBox.vue";
import ContentBox from "@/layouts/ContentBox.vue";
import FooterBox from "@/layouts/FooterBox.vue";
import HttpRequest from "@/assets/api/modules/index";

@Component({
  name: "Main",
  components: {
    TopBox,
    HeaderBox,
    ContentBox,
    FooterBox,
  },
})
export default class Main extends Vue {
  // 预览图片地址
  private viewerList: string[] = []; // 预览list -- 有图片url即可
  // 顶部是否吸顶
  private isCeil: boolean = false;
  // 距离左边距离
  private positionLeft: number = 0;
  // 是否显示回到顶骨图标
  private isTop: boolean = false;
  // websocket对象
  private socket: any = {};
  /**
   * 回到顶部
   */
  private handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
      type: "success",
    });
  }

  // 初始化滚轮监听事件
  private initScroll() {
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

  /**
   * 图片预览
   * config [Object]:
   *    imgList: 图片list
   *    urlAlias:图片地址的别名，默认url
   *    index: 播放索引,默认0
   */
  imagePreviewListen() {
    window.eventBus.$on(
      "global.image.preview",
      (config: { imgList: string[]; index: number }) => {
        if (config.imgList && config.imgList.length) {
          this.viewerList = config.imgList;
          const viewer: any = this.$refs.viewer;
          viewer.$viewer.show();
          // 为0或者不传时
          if (config.index) {
            setTimeout(() => {
              viewer.$viewer.view(config.index);
            }, 100);
          }
        }
      }
    );
  }

  mounted() {
    this.imagePreviewListen();
    this.initWebSocket();
    this.initScroll();
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
@media screen and(max-width: 500px) {
  .music-player {
    display: none;
  }
}
</style>