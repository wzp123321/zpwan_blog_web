<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { ID, WEB_ID } from "@/assets/js/common";
import { RouteConfig } from "vue-router";
import { blogEventHandle } from "@/utils/eventHandle";
import HttpRequest from "@/assets/api/modules/index";

@Component({
  name: "App",
})
export default class App extends Vue {
  destroyed() {
    localStorage.clear();
  }
  blogEventHandle(args: { type: string; data: any }) {
    blogEventHandle(args);
  }
  /**
   * 1.在Vue组件中，可以用过$on,$once去监听所有的生命周期钩子函数，如监听组件的updated钩子函数可以写成 this.$on('hook:updated', () => {})
   * 2.Vue支持在外部监听组件的生命周期钩子函数。
   * 3.可以使用Vue2.6提供的新API Vue.observable手动打造一个Vuex
   */
  mounted() {
    // 初始化
    this.$nextTick(() => {
      this.getMysicList();
    });
    // 创建cnzz统计js
    const script: any = document.createElement("script");
    script.src = `https://s95.cnzz.com/z_stat.php?id=${ID}&web_id=${WEB_ID}`;
    script.language = "JavaScript";
    document.body.appendChild(script);

    // 监听事件
    window.eventBus.$on("blogEventHandle", this.blogEventHandle);
    // 利用hook监听组件销毁钩子函数，并取消监听
    this.$once("hook:beforeDestroy", () => {
      window.eventBus.$off("blogEventHandle", this.blogEventHandle);
    });
  }

  /**
   * 递归请求音乐列表
   */
  async getMysicList() {
    let page = 1;
    let datas: MusicInfo[] = [];
    const getAllMusic = async (page: number) => {
      const res: ApiResponse<ListResponse<
        MusicInfo[]
      >> = await HttpRequest.MusicModule.getMusicList({ page });
      if (res && res.data) {
        const list = res.data.data;
        datas = [...datas, ...list];
        if (res.data.total > datas.length) {
          getAllMusic(page + 1);
        }
        if (datas.length === res.data.total) {
          const musicIndex =
            window.localStorage.getItem("zpwan_music_index") || 0;
          this.$store.dispatch("music/setMusicList", datas);
          this.$store.dispatch("music/setCurrentIndex", musicIndex);
        }
      }
    };
    getAllMusic(page);
  }

  @Watch("$route")
  handler(to: RouteConfig, from: RouteConfig) {
    setTimeout(() => {
      //避免首次获取不到window._czc
      let _window: any = window;
      if (_window._czc) {
        let location = window.location;
        let contentUrl = location.pathname + location.hash;
        let refererUrl = "/";
        _window._czc.push(["_trackPageview", contentUrl, refererUrl]);
      }
    }, 300);
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
