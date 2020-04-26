<template>
  <div class="footer-wrapper">
    <!-- 简书  微博  github   qq  微信-->
    <b-container>
      <div class="personal-wrapper">
        <a v-for="(item,index) in visits" :key="index" :href="item.url" target="_blank">
          <svg class="icon" aria-hidden="true" v-if="item.isSvg">
            <use :xlink:href="`#${item.imgUrl}`" />
          </svg>
          <img v-else src="../assets/imgs/jianshu.png" alt="简书" />
        </a>
      </div>
      <div class="record-content">
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34019202000830"
        >
          <img src="@/assets/imgs/beian-ico.png" style="float:left;" />
          <p>皖公网安备 34019202000830号</p>
        </a>
      </div>
      <p>Copyright © 2020 万直鹏博客</p>
    </b-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { visits } from "@/assets/js/common";
@Component({
  name: "FooterBox"
})
export default class FooterBox extends Vue {
  private visits: { [key: string]: any }[] = visits;
}
</script>
<style lang="less" scoped>
.footer-wrapper {
  margin-top: 50px;
  position: relative;
  color: #fff;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 0;
  width: 100%;
  p {
    margin: 0;
  }
  .personal-wrapper {
    margin-bottom: 10px;
    a {
      display: inline-block;
      svg,
      img {
        width: 24px;
        height: 24px;
        margin-right: 15px;
      }
    }
  }
  .record-content {
    a {
      display: inline-block;
      text-decoration: none;
      height: 20px;
      line-height: 20px;
    }
    p {
      float: left;
      height: 20px;
      line-height: 20px;
      margin: 0px 0px 0px 5px;
      color: #fff;
    }
  }
}

@media screen and (max-width: 800px) {
  .footer-wrapper {
    margin-top: 30px;
    padding: 10px;
  }
}
</style>