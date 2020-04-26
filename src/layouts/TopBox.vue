<template>
  <b-container>
    <b-row class="top-wrapper">
      <b-col xl="4" md="5" cols="5">
        <div class="time">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xingzhuanggongnengtubiao-" />
            </svg>
            {{cityinfo}}
          </span>
          <span>{{current_time}}</span>
        </div>
      </b-col>
      <b-col xl="3" offset-xl="5" md="4" offset-md="3" cols="12">
        <div class="link">
          <span
            v-for="(linkItem,linkIndex) in links"
            :key="linkIndex"
            @click="handleRouterLocation(linkItem)"
          >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#${linkItem.svg}`" />
            </svg>
            {{linkItem.title}}
          </span>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { links } from "@/assets/js/common";
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
  // 链接数组
  private links: { [key: string]: any }[] = links;
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
          localStorage.setItem("blog_location", cityinfo);
        }
      }
    });
  }
  // 路由跳转
  private handleRouterLocation(item: { [key: string]: any }) {
    if (item.isBlank) {
      window.open(item.url, "_blank");
    } else {
      this.$router.push(item.url);
    }
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
  padding: 5px 0;
  .time,
  .link {
    font-size: 13px;
    span {
      padding: 0 10px;
      display: inline-block;
      position: relative;
      .icon {
        width: 16px;
        height: 16px;
        position: relative;
        bottom: 0px;
      }
      a {
        color: #000;
        text-decoration: none;
      }
    }
    span:first-child {
      padding-left: 0;
    }
    span:last-child {
      padding-right: 0;
    }
  }
  .link span:hover {
    text-decoration: underline;
  }
}
@media screen and (max-width: 500px) {
  .top-wrapper {
    display: none;
  }
}
</style>