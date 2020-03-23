<template>
  <div class="login">
    <div class="login-form">
      <svg class="icon" aria-hidden="true" style="width:50px;height:50px">
        <use xlink:href="#icon-github" />
      </svg>
      <div class="loading">
        <span v-for="(item,index) in total%6" :key="index">-</span>
      </div>
      <img src="../assets/imgs/favicon.png" alt class="logo" />
      <span class="logining">登录中</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { Route } from "vue-router";
import { Notification } from "element-ui";
import axios from "axios";
Vue.prototype.$notify = Notification;

@Component({
  name: "GithubLogin"
})
export default class GithubLogin extends Vue {
  private total: number = 1;
  private timer: any = null;
  /**
   * 根据access-token获取用户信息
   */
  private getUserInfoByAccessToken(access_token: string) {
    axios({
      method: "GET",
      url: "/githubUserInfo",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
        Authorization: `token ${access_token}`
      }
    }).then(async res => {
      if (res && res.data) {
        const { id, avatar_url, name, location } = res.data;
        localStorage.setItem("id", id);
        localStorage.setItem("avatar_url", avatar_url);
        localStorage.setItem("name", name);
        localStorage.setItem("location", location);
        window.location.href = localStorage.getItem("current_url") || "/";
        this.$notify({
          title: "登录成功",
          message: "恭喜你登录成功",
          type: "success"
        });
      } else {
        this.$router.push("/signin");
      }
    });
  }
  /**
   * 根据code请求token
   */
  private async getAccessTokenByCode() {
    const client_id = "e8066bfd81332a5fd345";
    const client_secret = "dbd033bca15cd61b1b8b5666dfe41f2d50581bc1";
    const code = this.$route.query.code;
    const tokenResponse = await axios({
      method: "get",
      url: "/githubAccessToken",
      params: {
        client_id,
        client_secret,
        code
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json"
      }
    });
    if (tokenResponse) {
      this.getUserInfoByAccessToken(tokenResponse.data.access_token);
    }
  }
  mounted() {
    this.getAccessTokenByCode();
    this.timer = setInterval(() => {
      this.total += 1;
    }, 500);
  }
  /**
   * 页面销毁前 ---清除定时器
   */
  beforeDestroy() {
    clearInterval();
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  padding-top: 200px;
  .login-form {
    width: 400px;
    height: 80px;
    text-align: center;
    border: 1px solid #eee;
    position: relative;
    border-radius: 5px;
    padding-top: 12px;
    .loading {
      display: inline-block;
      width: 100px;
    }
    .logo {
      width: 53px;
      height: 53px;
      border-radius: 50px;
    }
    .logining {
      display: inline-block;
      position: absolute;
      top: 28px;
      left: 181px;
      font-size: 11px;
    }
  }
}
</style>