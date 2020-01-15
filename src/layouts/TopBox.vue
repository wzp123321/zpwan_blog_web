<template>
  <div class="top-wrapper boxW frspace">
    <div class="time">
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xingzhuanggongnengtubiao-" />
        </svg>
        {{cityinfo}}
      </span>
      <span>{{current_time}}</span>
    </div>
    <div class="link">
      <span>
        <a href="https://github.com/wzp123321" target="blank">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangmu" />
          </svg> 我的github
        </a>
      </span>
      <span @click="()=>{$router.push('/about')}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-guanyuxitong" />
        </svg> 关于
      </span>
      <span @click="()=>{$router.push('/links')}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-lianjie" />
        </svg> 友情链接
      </span>
      <span @click="handleGithubLogin">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github" />
        </svg> 登录
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// 解决AMap使用语法提示
declare let AMap: any;

@Component({
  name: "TopBox"
})
export default class TopBox extends Vue {
  // 当前时间
  private current_time: string = "";
  // 定时器
  private timer: any = null;
  // 当前定位城市
  private cityinfo: string = "";
  /**
   * 获取实时时间
   */
  private getCurrentTime() {
    const weeks = ["日", "一", "二", "三", "四", "五", "六"];
    const date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getHours();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    this.current_time =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      " " +
      "星期" +
      weeks[date.getDay()];
  }

  //获取用户所在城市信息
  showCityInfo() {
    const citysearch = new AMap.CitySearch();
    const that = this;
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity(function(status: string, result: any) {
      if (status === "complete" && result.info === "OK") {
        if (result && result.city && result.bounds) {
          const cityinfo = result.province + "" + result.city;
          that.cityinfo = cityinfo;
        }
      }
    });
  }
  /**
   * github登录
   */
  private handleGithubLogin() {
    window.location.href =
      "/githubAuthorize?client_id=e8066bfd81332a5fd345&redirect_uri=http://localhost:8080/signin_github";
  }
  mounted() {
    this.showCityInfo();
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>
<style lang="less" scoped>
.top-wrapper {
  position: relative;
  height: 30px;
  padding-top: 5px;
  .time,
  .link {
    font-size: 13px;
    span {
      display: inline-block;
      padding: 0 5px;
      .icon {
        width: 16px;
        height: 16px;
        position: relative;
        bottom: -2px;
      }
      a {
        color: #000;
        text-decoration: none;
      }
    }
  }
  .link span:hover {
    text-decoration: underline;
  }
}
</style>