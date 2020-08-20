<template>
  <zp-github-login></zp-github-login>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "GithubLogin",
})
export default class GithubLogin extends Vue {}
</script>
