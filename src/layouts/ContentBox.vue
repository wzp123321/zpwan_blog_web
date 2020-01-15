<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "ContentBox"
})
export default class ContentBox extends Vue {}
</script>
<style lang="less" scoped>
</style>