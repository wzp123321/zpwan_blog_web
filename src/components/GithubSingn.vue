<template>
  <div class="login">
    <b-container>
      <b-row class="login-title">
        <b-col>欢迎登陆万直鹏的博客</b-col>
      </b-row>
      <b-row>
        <b-col class="login-form">
          <svg class="icon" aria-hidden="true" style="width:50px;height:50px">
            <use xlink:href="#icon-github" />
          </svg>
          <div class="loading">
            <div class="content">
              <span v-for="(item,index) in total" :key="index">-</span>
            </div>
            <div class="loading-title">登录中</div>
          </div>
          <img src="../assets/imgs/favicon.png" alt class="logo" />
        </b-col>
      </b-row>
    </b-container>
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
        const userInfo = {
          user_id: id,
          avatar_url,
          name,
          location
        };
        this.$store.dispatch("permission/setUserInfo", userInfo);
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
      this.total = this.total % 5;
      if (this.total === 0) {
        this.total = 1;
      }
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
  height: 100%;
  background: #fff;
  .login-title {
    padding-top: 150px;
    text-align: center;
    margin-bottom: 10px;
    font-size: 24px;
  }
  .login-form {
    width: 400px;
    height: 80px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    border-radius: 5px;
    padding-top: 12px;
    .loading {
      display: inline-block;
      width: 100px;
      height: 100%;
      line-height: 100%;
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