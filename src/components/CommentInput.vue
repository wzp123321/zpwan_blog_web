<template>
  <div class="comment-input">
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入您的评论"
      v-model="input_data"
      style="margin-bottom:10px"
      @focus="handleInputFocusBlur()"
    ></el-input>
    <div class="frspace" v-show="btnShow">
      <div class="emoji" id="emoji">
        <i class="iconfont icon-iconsmile"></i>
        <span>Ctrl + Enter 发表</span>
        <div class="emoji-content" id="emoji-content">
          <span
            v-for="(item,index) in emojis"
            :key="index"
            @click="handleEmojiPut(item)"
            id="emoji-span"
          >{{item}}</span>
        </div>
      </div>
      <div class="btn">
        <el-button
          type="primary"
          style="border-radius:20px"
          :disabled="input_data === ''"
          @click="handleCommentRelease"
          size="mini"
        >发布</el-button>
        <el-button
          style="border-radius:20px;margin-left:10px"
          @click="handleInputCancel"
          size="mini"
        >取消</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { Input, Button } from "element-ui";
@Component({
  name: "CommentInput",
  components: {
    "el-input": Input,
    "el-button": Button
  }
})
export default class CommentInput extends Vue {
  // 输入框信息
  private input_data: string = "";
  private emojis: Array<string> = [
    "🐷",
    "😄",
    "😂",
    "😭",
    "😊",
    "😍",
    "😏",
    "😆",
    "👿",
    "😃",
    "😏",
    "😘",
    "😚",
    "😳",
    "😌",
    "😆",
    "😁",
    "👍",
    "😜",
    "😝",
    "😀",
    "😗",
    "😙",
    "😛",
    "😴",
    "😟",
    "😦",
    "😧",
    "😮",
    "😬",
    "😕",
    "😯",
    "😑",
    "😒",
    "😅",
    "😓",
    "😥",
    "😩",
    "😔",
    "😞",
    "😖",
    "😣",
    "💩",
    "😡",
    "🔥",
    "👎",
    "✋",
    "👏",
    "🤘",
    "🙋",
    "👸",
    "🙈",
    "🙉",
    "🙊",
    "👀",
    "🍔",
    "♿️",
    "🐗",
    "🐷",
    "🐶",
    "🐵",
    "🐢",
    "🐝",
    "🐔",
    "🐛",
    "🖕"
  ];
  // 控制按钮显示隐藏
  private btnShow: boolean = false;
  /**
   * 添加emoji
   */
  private handleEmojiPut(value: string) {
    this.input_data += value;
  }
  /**
   * 发布评论  将需要返回的参数赋值给另一个字段 然后清空原字段
   */
  @Emit("release")
  handleCommentRelease() {
    const content = this.input_data.replace("\n", "");
    this.input_data = "";
    return content;
  }
  // 取消
  @Emit("inputCancel")
  private handleInputCancel() {}
  // 输入框聚焦离焦
  private handleInputFocusBlur() {
    this.btnShow = true;
  }
  created() {
    const that = this;
    if (this.$route.path.includes("article")) {
      document.onkeydown = function(e) {
        var keyCode = e.keyCode || e.which || e.charCode;
        var ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && keyCode == 13 && that.btnShow) {
          that.handleCommentRelease();
        }
      };
    }
  }
}
</script>
<style lang="less" scoped>
.first_comment {
  margin-bottom: 10px;
}
.icon-smile {
  font-size: 18px;
  cursor: pointer;
}
.emoji {
  cursor: pointer;
  position: relative;
  .emoji-content {
    display: none;
    width: 363px;
    height: 170px;
    background: #fff;
    border: 1px solid #eee;
    position: absolute;
    top: 25px;
    left: -5px;
    padding: 5px;
    z-index: 999;
    span {
      display: inline-block;
      padding: 3px 5px;
    }
    span:hover {
      background: #eee;
    }
  }
}
.emoji:hover {
  .emoji-content {
    display: block;
  }
}
@media screen and (max-width: 500px){
  .btn{
    padding: 0;
  }
}
</style>