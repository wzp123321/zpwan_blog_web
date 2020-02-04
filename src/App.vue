<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "App"
})
export default class App extends Vue {
  destroyed () {
    localStorage.clear();
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
