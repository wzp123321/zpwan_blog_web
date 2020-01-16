<template>
  <div class="main-wrapper flex-column">
    <div class="top-model">
      <TopBox></TopBox>
      <HeaderBox :isCeil="isCeil"></HeaderBox>
      <ContentBox :style="{marginTop:isCeil?'64px':'10px'}" class="boxW"></ContentBox>
    </div>
    <FooterBox></FooterBox>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TopBox from "@/layouts/TopBox.vue";
import HeaderBox from "@/layouts/HeaderBox.vue";
import ContentBox from "@/layouts/ContentBox.vue";
import FooterBox from "@/layouts/FooterBox.vue";
@Component({
  name: "Main",
  components: {
    TopBox,
    HeaderBox,
    ContentBox,
    FooterBox
  }
})
export default class Main extends Vue {
  // 顶部是否吸顶
  private isCeil: boolean = false;

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
}
</style>