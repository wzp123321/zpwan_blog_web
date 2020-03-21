<template>
  <div class="about-wrapper">
    <div class="about-header">
      <h1>关于本站</h1>
      <div>本人前端新手,闲暇时间弄个博客玩玩,前后端都是自己开发的,后续在学习服务相关知识,希望能完成部署</div>
    </div>
    <div class="about-info">
      <div class="title">关于博主</div>
      <p>前端开发一枚</p>
      <div class="title">关于博客</div>
      <p>搞这个博客纯属娱乐,希望能够学到更多技术</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "AboutModule"
})
export default class AboutModule extends Vue {}
</script>
<style lang="less" scoped>
.about-wrapper {
  position: relative;
  .about-header,
  .about-info {
    padding: 10px;
    background: #fff;
  }
  .about-header {
    font-size: 13px;
    h1 {
      margin: 0 0 10px 0;
    }
  }
  .about-info {
    margin-top: 10px;
    .title {
      border-left: 4px solid #31c27c;
      padding-left: 10px;
    }
    p {
      margin: 0;
      padding: 10px 5px;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>