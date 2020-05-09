<template>
  <el-dialog
    title="少侠,留个名吧！"
    :visible.sync="show"
    @close="close"
    @cancel="close"
    width="420px"
  >
    <el-form :model="form" ref="form">
      <el-form-item
        prop="name"
        label="用户名:"
        label-width="70px"
        :rules="[
      { required: true, message: '游客名不能为空'},
      { max: 10, message: '游客名不得超过10个字符'}
    ]"
      >
        <el-input
          v-model="form.name"
          style="width:280px"
          autocomplete="off"
          size="small"
          placeholder="请填写您的用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像:" label-width="60px">
        <template v-for="(item,index) in avatars">
          <span :key="index" class="avatar-span">
            <img
              :src="item"
              :class="{'choosed-img' :avatarUrl===item}"
              @click="()=>{avatarUrl = item}"
              alt
            />
          </span>
        </template>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button size="small" type="primary" style="width:100%;" @click="handleUserLogin">登 录</el-button>
      </el-form-item>
      <div class="other-login">
        <div class="title">您还可以选择其他登录方式:</div>
        <div @click="handleGithubLogin" style="text-align:center">
          <svg class="icon" aria-hidden="true" style="width:24px;height:24px">
            <use xlink:href="#icon-github" />
          </svg>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { generateUUId } from "@/utils/index";
import { avatars } from "@/assets/js/common";
const env = process.env.NODE_ENV;
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Button,
  Notification
} from "element-ui";
Vue.prototype.$notify = Notification;
// https://docs.justauth.whnb.wang/#/oauth/qq

@Component({
  name: "UserLoginModal",
  components: {
    "el-dialog": Dialog,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-button": Button,
    "el-input": Input
  }
})
export default class UserLoginModal extends Vue {
  @Prop({ default: false })
  private dialogFormVisible!: boolean;
  //表单数据
  private form: { [key: string]: any } = {};
  // 头像地址数组
  private avatars: string[] = avatars;
  private show: boolean = false;

  @Emit("cancel")
  private close() {
    this.show = false;
    return false;
  }
  // 选择头像
  private avatarUrl: string = "";
  /**
   * 用户登录
   */
  @Emit("submit")
  private handleUserLogin() {
    let flag: boolean = true;
    const form: any = this.$refs.form;
    form.validate((valid: any) => {
      if (valid) {
        const user_id: string = generateUUId(16);
        localStorage.setItem("blog_user_id", user_id);
        localStorage.setItem("blog_name", this.form.name);
        localStorage.setItem("blog_avatar_url", this.avatarUrl);
        flag = false;
      } else {
        flag = true;
      }
    });
    return flag;
  }
  /**
   * github登录
   */
  private handleGithubLogin() {
    const url =
      env === "production"
        ? "http://zpwan-yz.com/signin_github"
        : "http://localhost:8088/signin_github";
    window.location.href =
      "/githubAuthorize?client_id=e8066bfd81332a5fd345&redirect_uri=" + url;
  }
  @Watch("dialogFormVisible")
  private handledialogFormVisibleChange(newVal: boolean, oldVal: boolean) {
    this.show = newVal;
  }
}
</script>
<style lang="less" scoped>
.title {
  margin-left: 15px;
  font-size: 12px;
  margin-bottom: 10px;
}
.avatar-span {
  display: inline-block;
  cursor: pointer;
  padding: 3px;
  .choosed-img {
    border: 1px dashed #c7c7c7;
  }
  img {
    width: 40px;
    height: 40px;
    padding: 5px;
    border: 0;
    border-radius: 4px;
  }
}
</style>
<style lang="less">
.el-form-item__content {
  line-height: 0 !important;
}
@media screen and (max-width: 400px) {
  .el-dialog {
    width: 320px !important;
  }
  .el-input__inner {
    width: 66% !important;
  }
}
</style>
