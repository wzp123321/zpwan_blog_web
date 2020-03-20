<template>
  <div class="main-wrapper flex-column">
    <div class="top-model">
      <TopBox></TopBox>
      <HeaderBox :isCeil="isCeil"></HeaderBox>
      <BreadcrumbModule v-if="$route.path !=='/app'"></BreadcrumbModule>
      <ContentBox :style="{marginTop:isCeil?'64px':'10px'}" class="boxW"></ContentBox>
    </div>
    <FooterBox></FooterBox>
    <div class="scroll-to-top" v-show="isTop">
      <i class="iconfont icon-huojianxianxing" @click="handleScrollToTop"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TopBox from "@/layouts/TopBox.vue";
import HeaderBox from "@/layouts/HeaderBox.vue";
import ContentBox from "@/layouts/ContentBox.vue";
import FooterBox from "@/layouts/FooterBox.vue";
import BreadcrumbModule from "@/components/Breadcrumb.vue";
@Component({
  name: "Main",
  components: {
    TopBox,
    HeaderBox,
    ContentBox,
    FooterBox,
    BreadcrumbModule
  }
})
export default class Main extends Vue {
  // 顶部是否吸顶
  private isCeil: boolean = false;
  // 是否显示回到顶骨图标
  private isTop: boolean = false;
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
   * 添加全局监听
   */
  mounted() {
    window.addEventListener("scroll", () => {
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop > 30) {
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
  height: 100%;
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