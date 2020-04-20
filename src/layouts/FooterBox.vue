<template>
  <div class="footer-wrapper">
    <div class="boxW flex-row">
      <div class="foot-left">
        <h1>友好交流</h1>
        <div>
          <a href="https://www.jianshu.com/u/914a5045e1e4" target="_blank">
            <img src="../assets/imgs/jianshu.png" alt />
          </a>
          <a href="https://github.com/wzp123321" target="_blank">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-github" />
            </svg>
          </a>
        </div>
        <h1>关于博主</h1>
        <p>本人前端小菜鸟一枚,如有大佬愿意赐教可通过上方联系方式联系小弟</p>
      </div>
      <div class="foot-right">
        <img src="../assets/imgs/qq.jpg" alt />
      </div>
    </div>
    <div style="width:300px;margin:0 auto; padding:20px 0;">
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34019202000830"
        style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
      >
        <img src="@/assets/imgs/beian-ico.png" style="float:left;" />
        <p
          style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;"
        >皖公网安备 34019202000830号</p>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "FooterBox"
})
export default class FooterBox extends Vue {}
</script>
<style lang="less" scoped>
.footer-wrapper {
  margin-top: 50px;
  position: relative;
  color: #fff;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px 0;
  width: 100%;
  .foot-left {
    flex: 1;
    p {
      margin: 5px 0;
    }
    h1 {
      margin: 0;
      font-size: 20px;
    }
    div {
      margin-bottom: 10px;
      a {
        img,
        svg {
          width: 20px;
          height: 20px;
          margin: 10px;
        }
      }
    }
    span {
      display: inline-block;
      padding: 0 5px;
    }
  }
  .foot-right {
    width: 300px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 2px;
    }
  }
}
</style>