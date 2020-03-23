<template>
  <el-dialog
    title="用户登录"
    :visible.sync="dialogFormVisible"
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
        <template v-for="item in 6">
          <span :key="item" class="avatar-span">
            <img
              :src="require('../assets/imgs/avatar_'+item+'.png')"
              :class="{'choosed-img' :avaItem===item,}"
              @click="()=>{avaItem= item}"
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
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import generateUUId from "@/assets/js/crypto";
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Button,
  Notification
} from "element-ui";
Vue.prototype.$notify = Notification;

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
  @Emit("cancel")
  private cancel() {}

  @Emit("cancel")
  private close() {}
  // 选择头像
  private avaItem: number = 1;
  /**
   * 用户登录
   */
  @Emit("submit")
  private handleUserLogin() {
    let flag: boolean = true;
    const form: any = this.$refs.form;
    form.validate((valid: any) => {
      if (valid) {
        window.location.href = this.$route.path;
        this.$notify({
          title: "登录成功",
          message: "恭喜你登录成功",
          type: "success"
        });
        const user_id: string = generateUUId(16);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("name", this.form.name);
        localStorage.setItem(
          "avatar_url",this.avaItem+'');
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
    window.location.href =
      "/githubAuthorize?client_id=e8066bfd81332a5fd345&redirect_uri=http://localhost:8088/signin_github";
    localStorage.setItem("current_url", this.$route.path);
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
</style>
