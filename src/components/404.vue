<template>
  <b-container>
    <b-row class="notfound-wrapper">
      <b-col xl="3" offset-xl="2" md="4" offset-md="1" cols="12">
        <img src="../assets/imgs/404.png" alt />
      </b-col>
      <b-col xl="6" md="6" cols="12" class="suggestion">
        <h1>抱歉，你访问的页面不存在。</h1>
        <p>可能是因为您的链接地址有误、该文章已经被删除，</p>
        <p>
          您可以尝试返回
          <a href="/app">首页</a>。
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "NotFoundModule"
})
export default class NotFoundModule extends Vue {}
</script>
<style lang="less" scoped>
.notfound-wrapper {
  text-align: center;
  img {
    width: 280px;
    height: 280px;
  }
  .suggestion {
    padding-top: 100px;
    h1,
    p {
      margin: 5px 0;
    }
    h1 {
      font-size: 28px;
    }
    p {
      color: #666;
      font-size: 14px;
    }
  }
}
@media screen and (max-width: 500px) {
  .suggestion {
    padding-top: 10px !important;
    h1,
    p {
      margin: 2px 0 !important;
    }
    h1 {
      font-size: 18px !important;
    }
    p {
      font-size: 12px !important;
    }
  }
}
</style>