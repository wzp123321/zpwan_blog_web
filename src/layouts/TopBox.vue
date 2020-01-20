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
      <span @click="()=>{dialogFormVisible = true}" v-if="name ===''">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github" />
        </svg> 登录
      </span>
      <span v-else class="username">
        <i class="el-icon-user-solid"></i>
        {{name}}
        <span @click="loginout" class="loginout">退出登录</span>
      </span>
    </div>
    <UserLoginModule
      :dialogFormVisible="dialogFormVisible"
      @cancel="()=>{dialogFormVisible = false}"
      @submit="(value)=>{dialogFormVisible = value}"
    ></UserLoginModule>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
// 解决AMap使用语法提示
declare let AMap: any;
import UserLoginModule from "@/components/UserLoginModal.vue";
import { UserModule } from "@/store/module/user";

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
          UserModule.setUserInfo({
            name: "",
            avatar_url: "",
            user_id: "",
            location: cityinfo
          });
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
  height: 30px;
  padding-top: 5px;
  .time,
  .link {
    font-size: 13px;
    span {
      display: inline-block;
      padding: 0 5px;
      position: relative;
      .icon {
        width: 16px;
        height: 16px;
        position: relative;
        bottom: -3px;
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
    span:last-child{
      color: #31c27c;
    }
  }
  .link span:hover {
    text-decoration: underline;
  }
}
</style>