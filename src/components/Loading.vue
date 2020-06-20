<template>
  <div class="loading-wrapper" v-show="loading">
    <div class="content flex-column">
      <img src="../assets/imgs/loading_green.gif" alt />
      <div>拼命加载中</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "LoadingModule"
})
export default class LoadingModule extends Vue {
  private loading: boolean = false;

  handleLoading(value: boolean) {
    this.loading = value;
  }

  mounted() {
    window.eventBus.$on("handleLoadingShow", this.handleLoading);
  }
  beforeDestroy() {
    window.eventBus.$off("handleLoadingShow", this.handleLoading);
  }
}
</script>
<style lang="less" scoped>
.loading-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 12px;
    color: white;
    img {
      width: 24px;
      height: 24px;
      margin: 0 auto;
    }
  }
}
</style>