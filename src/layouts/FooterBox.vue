<template>
  <div class="footer-wrapper">
    <b-container>
      <div class="personal-wrapper">
        <a v-for="(item,index) in visits" :key="index" :href="item.url" target="_blank">
          <svg class="icon" aria-hidden="true" v-if="item.isSvg">
            <use :xlink:href="`#${item.imgUrl}`" />
          </svg>
          <img v-else src="../assets/imgs/jianshu.png" alt="简书" />
        </a>
      </div>
      <div class="run-day">
        <i class="iconfont icon-diqiu"></i>
        <span>本站已经运行了{{run_date}}</span>
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
      <p style="text-align:center">Copyright © 2020 万直鹏博客</p>
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

  private run_date: string = "";

  private timer: any = null;

  getBlogRunDays() {
    const start = 1587184669000;
    const end = new Date().getTime();
    const days = Math.floor((end - start) / 24 / 60 / 60 / 1000);
    const hours = Math.floor(
      (end - start - days * 24 * 60 * 60 * 1000) / 60 / 60 / 1000
    );
    const minutes = Math.floor(
      (end - start - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) /
        60 /
        1000
    );
    const seconds = Math.floor(
      (end -
        start -
        days * 24 * 60 * 60 * 1000 -
        hours * 60 * 60 * 1000 -
        minutes * 60 * 1000) /
        1000
    );
    this.run_date =
      days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
  }

  mounted() {
    this.timer = setInterval(() => {
      this.getBlogRunDays();
    }, 1000);
  }

  beforeDestroy() {
     this.timer = null;
  }
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
  .run-day {
    padding: 5px 0;
    .icon-diqiu {
      display: inline-block;
      animation: user_avatar_rorate 1500ms infinite linear;
    }
    span {
      display: inline-block;
      margin-left: 10px;
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
@keyframes user_avatar_rorate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}

@media screen and (max-width: 800px) {
  .footer-wrapper {
    margin-top: 30px;
    padding: 10px;
  }
}
</style>