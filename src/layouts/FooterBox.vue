<template>
  <div class="footer-wrapper">footer</div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "FooterBox"
})
export default class FooterBox extends Vue {}
</script>
<style lang="less" scoped>
.footer-wrapper {
  position: relative;
  width: 100%;
}
</style>