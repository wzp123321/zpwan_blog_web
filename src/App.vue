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

@Component({
  name: "App"
})
export default class App extends Vue {
  destroyed() {
    localStorage.clear();
  }
  blogEventHandle(args: { type: string; data: any }) {
    blogEventHandle(args);
  }
  mounted() {
    // 创建cnzz统计js
    const script: any = document.createElement("script");
    script.src = `https://s95.cnzz.com/z_stat.php?id=${ID}&web_id=${WEB_ID}`;
    script.language = "JavaScript";
    document.body.appendChild(script);

    // 添加登录对话框显示
    window.eventBus.$on("blogEventHandle", this.blogEventHandle);
  }
  beforeDestroy() {
    window.eventBus.$off("blogEventHandle", this.blogEventHandle);
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
