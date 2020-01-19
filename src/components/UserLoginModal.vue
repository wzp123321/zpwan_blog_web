<template>
  <el-dialog title="用户登录" :visible.sync="dialogFormVisible" @close="close">
    <el-form :model="form" ref="form">
      <div class="title">您可以选择游客登录:</div>
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="name"
        :rules="[
      { required: true, message: '游客名不能为空'},
      { max: 10, message: '游客名不得超过10个字符'}
    ]"
      >
        <el-input
          v-model="form.name"
          style="width:330px"
          autocomplete="off"
          size="mini"
          placeholder="请填写您的用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像选择" label-width="80px">
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
      <div class="other-login">
        <div class="title">您还可以选择其他登录方式:</div>
        <div class="svg" @click="handleGithubLogin">
          <svg class="icon" aria-hidden="true" style="width:16px;height:16px">
            <use xlink:href="#icon-github" />
          </svg>
          <span>Github登录</span>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancel">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleUserLogin">登 录</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { UserModule } from "@/store/module/user";
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Button,
  RadioGroup,
  Radio
} from "element-ui";
@Component({
  name: "UserLoginModal",
  components: {
    "el-dialog": Dialog,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-button": Button,
    "el-input": Input,
    "el-radio": Radio,
    "el-radio-group": RadioGroup
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
  private handleUserLogin() {
    const form: any = this.$refs.form;
    form.validate(async (valid: any) => {
      if (valid) {
        const res: ApiResponse<string> = await HttpRequest.AdminModule.getTouristAdd(
          {
            name: this.form.name,
            url: "@/assets/imgs/avatar_" + this.avaItem + ".png",
            location: UserModule.userInfo.location
          }
        );

        if (res && res.data) {
          this.$notify({
            title: "登录成功",
            message: "恭喜你登录成功",
            type: "success"
          });
          localStorage.setItem("name", this.form.name);
          localStorage.setItem(
            "user_avatar",
            "@/assets/imgs/avatar_" + this.avaItem + ".png"
          );
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  /**
   * github登录
   */
  private handleGithubLogin() {
    window.location.href =
      "/githubAuthorize?client_id=e8066bfd81332a5fd345&redirect_uri=http://localhost:8088/signin_github";
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
    border: 1px dashed #eee;
  }
  img {
    width: 40px;
    height: 40px;
    padding: 5px;
    border: 0;
    border-radius: 4px;
  }
}

.other-login {
  .svg {
    .icon {
      position: relative;
      bottom: -2px;
      margin-left: 100px;
      font-size: 12px;
    }
    span {
      padding-left: 4px;
      font-size: 12px;
    }
  }
  .svg:hover {
    text-decoration: underline;
  }
}
</style>
