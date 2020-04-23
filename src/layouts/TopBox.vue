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
          <span>
            <a href="https://github.com/wzp123321" target="blank">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-github" />
              </svg> github
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
          <span @click="()=>{dialogFormVisible = true}" v-if="name ===''">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-denglu" />
            </svg> 登录
          </span>
          <span v-else class="username">
            <i class="el-icon-user-solid"></i>
            {{name}}
            <span @click="loginout" class="loginout">退出登录</span>
          </span>
        </div>
      </b-col>
      <UserLoginModule
        :dialogFormVisible="dialogFormVisible"
        @cancel="()=>{dialogFormVisible = false}"
        @submit="(value)=>{dialogFormVisible = value}"
      ></UserLoginModule>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
// 解决AMap使用语法提示
declare let AMap: any;
import UserLoginModule from "@/components/UserLoginModal.vue";

@Component({
  name: "TopBox",
  components: {
    UserLoginModule
  }
})
export default class TopBox extends Vue {
  // 用户名
  private name: string = localStorage.getItem("name") || "";
  // 登录对话框
  private dialogFormVisible: boolean = false;
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
          localStorage.setItem("location", cityinfo);
        }
      }
    });
  }
  /**
   * 登出
   */
  private loginout() {
    localStorage.clear();
    window.location.reload();
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
      padding: 0 5px;
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
      .loginout {
        font-size: 12px;
        color: #31c27c;
      }
    }
    span:first-child {
      padding-left: 0;
    }
    span:last-child {
      color: #31c27c;
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