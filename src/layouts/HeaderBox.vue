<template>
  <div :class="[{'ceil': isCeil}, 'header-wrapper']">header</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "HeaderBox"
})
export default class HeaderBox extends Vue {
  @Prop({ default: false })
  private isCeil!: boolean;
}
</script>
<style lang="less" scoped>
.header-wrapper {
  height: 64px;
  width: 100%;
  background: #fff;
}
.ceil {
  position: fixed;
  top: 0;
}
</style>