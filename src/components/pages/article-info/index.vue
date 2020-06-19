<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <b-container class="article-wrapper">
      <b-row>
        <b-col xl="9" md="9" cols="12" class="article-info">
          <!-- 头部 -->
          <div class="article-header">
            <div class="count-info frspace">
              <span class="tag">原创</span>
              <div class="info">
                <span>
                  <i class="iconfont icon-rili"></i>
                  {{formatDate(articleInfo.create_time)}}
                </span>
                <span>
                  <i class="iconfont icon-liulan"></i>
                  浏览
                  {{articleInfo.visit_count}}
                </span>
                <span>
                  <i class="iconfont icon-xiai"></i>
                  点赞
                  {{articleInfo.like_count}}
                </span>
                <span>
                  <i class="iconfont icon-pinglun"></i>
                  评论
                  {{articleInfo.comment_count}}
                </span>
              </div>
            </div>
            <div class="title">{{articleInfo.title}}</div>
            <p>{{articleInfo.description}}</p>
          </div>
          <!-- 正文 -->
          <div class="markdown-body" v-html="articleInfo.content"></div>
          <!-- 分割线 -->
          <el-divider content-position="center">本文结束,感谢阅读</el-divider>
          <!-- 点赞模块 -->
          <div class="ups frspace">
            <div class="click-like">
              <i
                class="iconfont icon-dianzan"
                :style="{color:isUps?'#ec7259':'#9e9c9c'}"
                @click="getArticleUps"
              ></i>
              <span>点个赞呗</span>
            </div>
            <div class="catalog">
              <i class="iconfont icon-wenjianjia"></i>
              {{
              articleInfo.second_catalogName
              }}
            </div>
          </div>
          <el-divider content-position="center">分享本文</el-divider>
          <div class="share-article">
            <svg class="icon" aria-hidden="true" @click="handleShareByOtherPlateForm('qq')">
              <use xlink:href="#icon-QQ" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="handleShareByOtherPlateForm('qzone')">
              <use xlink:href="#icon-QQkongjian" />
            </svg>
            <svg class="icon" aria-hidden="true" @click="handleShareByOtherPlateForm('sina')">
              <use xlink:href="#icon-weibo" />
            </svg>
            <span class="wx-share-wrapper">
              <svg class="icon weixin-share" aria-hidden="true">
                <use xlink:href="#icon-weixin" />
              </svg>
              <div id="qrcode" class="qrcode" />
            </span>
          </div>
          <!-- 评论模块 -->
          <div class="comment-wrapper">
            <div class="title">
              全部评论
              <span style="font-size:12px;">共{{articleInfo.comment_count}}条</span>
            </div>
            <div v-if="JSON.stringify(comments) === '[]'" class="no-comment">暂无评论，期待您的优秀评论</div>
            <!-- 顶部输入框 -->
            <CommentInput @release="releaseComment"></CommentInput>
            <!--有评论 -->
            <div v-if="JSON.stringify(comments) !== '[]'" class="comment-data">
              <div v-for="(item,index) in comments" :key="index">
                <div class="frsp">
                  <div class="comment-data-item">
                    <img class="user_avatar" v-bind:src="item.author.avatar_url" alt />
                    <span v-if="item.author">{{item.author.name}}</span>
                  </div>
                </div>
                <p class="conment-item-content">{{item.content}}</p>
                <div class="operate-icon">
                  <i class="iconfont icon-dianzan">点赞</i>
                  <i
                    class="iconfont icon-pinglun"
                    @click="()=>handleSecondFloorComment(index,item.id,item.is_root?item.id :item.parent_id,item.author)"
                  >回复</i>
                </div>
                <div class="comment-input-comp">
                  <CommentInput
                    v-if="floor===index && id === item.id"
                    @release="releaseComment"
                    @inputCancel="()=>{id===''}"
                  ></CommentInput>
                </div>
                <div class="comment-item-child">
                  <div v-for="(childItem,idx) in item.children" :key="idx">
                    <div class="frsp">
                      <div v-if="childItem.author">
                        <img v-bind:src="childItem.author.avatar_url" class="user_avatar" alt />
                        <span>{{childItem.author.name}}</span>
                      </div>
                      <!-- 点击这里的评论出现@这个评论的楼主 -->
                    </div>
                    <p class="comment-item-child-reply" v-if="childItem.reply_userInfo">
                      回复
                      <span style="color:#06a5ff">{{childItem.reply_userInfo.name}}</span>
                      : {{childItem.content}}
                    </p>
                    <p class="operate-icon">
                      <i class="iconfont icon-dianzan">点赞</i>
                      <span
                        @click="()=>handleSecondFloorComment(index,childItem.id,childItem.parent_id,childItem.author)"
                      >
                        <i class="iconfont icon-pinglun">回复</i>
                      </span>
                    </p>
                    <div>
                      <CommentInput
                        v-if="floor===index && id === childItem.id"
                        @release="releaseComment"
                        @inputCancel="()=>{id=''}"
                      ></CommentInput>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="3" cols="12" class="right-module">
          <!-- 感悟模块 -->
          <div class="article-quotes">
            <div class="title">
              <i class="iconfont icon-laba"></i>
              每日一句
            </div>
            <p>{{articleInfo.quotes}}</p>
          </div>
          <!-- 展示tag -->
          <div class="tag-module">
            <div class="title">
              <i class="iconfont icon-tag"></i>
              本文标签
            </div>
            <div class="tags" v-if="articleInfo.tags">
              <span v-for="(item,index) in articleInfo.tags.split(',')" :key="index">{{item}}</span>
            </div>
          </div>
          <RecommendArticle></RecommendArticle>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { Divider, Message, Loading } from "element-ui";
import { formatDate } from "@/utils/index";
import CommentInput from "@/components/CommentInput.vue";
import { Route } from "vue-router";
import RecommendArticle from "@/components/RecommendArticle.vue";
import "mavon-editor/dist/css/index.css";
import "mavon-editor/dist/highlightjs/highlight.min.js";
import "mavon-editor/dist/katex/katex";
import "mavon-editor/dist/highlightjs/languages/javascript.min.js";
import "mavon-editor/dist/highlightjs/languages/java.min.js";
import "highlight.js/lib/highlight.js";
import QRCode from "qrcodejs2";
// 微博App-_key
import { APP_KEY, WEIXIN_SDK, jsApiList } from "@/assets/js/common";
import wx from "weixin-js-sdk";
Vue.prototype.$message = Message;
Vue.use(Loading.directive);

@Component({
  name: "ArticleInfoModule",
  components: {
    "el-divider": Divider,
    CommentInput,
    RecommendArticle
  }
})
export default class ArticleInfoModule extends Vue {
  // 页面加载
  private loading: boolean = false;
  // 用户是否点赞过
  private isUps: boolean = false;
  // 标识当前评论的大楼层
  private floor: number = 1;
  // 当前需要评论的评论id
  private id: string = "";
  // 评论的作者信息---即登录的用户
  private author: DashoboardModule.UserInfo = {
    user_id: localStorage.getItem("blog_user_id") || "",
    name: localStorage.getItem("blog_name") || "",
    avatar_url: localStorage.getItem("blog_avatar_url") || "",
    location: localStorage.getItem("blog_location") || ""
  };
  // 登录回调
  private handleLoginSuccess() {
    this.author = {
      user_id: localStorage.getItem("blog_user_id") || "",
      name: localStorage.getItem("blog_name") || "",
      avatar_url: localStorage.getItem("blog_avatar_url") || "",
      location: localStorage.getItem("blog_location") || ""
    };
  }
  // 被评论的作者信息
  private reply_userInfo: DashoboardModule.UserInfo = {
    user_id: "",
    name: "",
    avatar_url: "",
    location: ""
  };
  // 评论的父级id
  private parent_id: string = "";
  // 文章详情
  private articleInfo: ArticleModule.ArticleInfo = {
    title: "",
    description: ""
  };
  // 评论数组
  private comments: Array<ArticleModule.CommentInfo> = [];
  /**
   * 格式化时间
   */
  private formatDate(time: number) {
    return formatDate(time);
  }
  // 分享
  private handleShareByOtherPlateForm(type: string) {
    let shareUrl: string = "";
    const url = encodeURIComponent(window.location.href);
    const { title, description } = this.articleInfo;
    const imgUrl =
      "http://132.232.66.140:81/CF29D466835022C356A76F846432D832.jpg";
    if (type === "sina") {
      shareUrl = `http://service.weibo.com/share/share.php?url=${url}&sharesource=weibo&title=${title}&pic=${imgUrl}&appkey=${APP_KEY}`;
    } else if (type === "qzone") {
      shareUrl = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&sharesource=qzone&title=${title}&pics=${imgUrl}&summary=${description}`;
    } else if (type === "qq") {
      shareUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${url}&sharesource=qzone&title=${title}&pics=${imgUrl}&summary=${description}&desc=${description}`;
    }
    window.open(shareUrl, "_blank");
  }
  // 微信分享----个人申请的订阅号无法获取分享接口
  private async handleWxShare() {
    const that = this;
    const url = encodeURIComponent(window.location.href.split("#")[0]);
    const res: ApiResponse<{
      [key: string]: any;
    }> = await HttpRequest.ShareModule.getShareConfig({ url });
    if (res && res.data) {
      const { timestamp, nonceStr, signature, appId, shareUrl } = res.data.data;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList
      });
      //处理验证失败的信息
      wx.error(function(res: any) {
        that.$message.error("微信签名失败");
        console.log("微信签名失败");
      });
      wx.ready(() => {
        const { title, description, imgUrl } = that.articleInfo;
        for (let i = 0; i < jsApiList.length; i++) {
          wx[jsApiList[i]]({
            title, // 分享标题
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl // 分享图标
          });
        }
      });
    }
  }
  /**
   * 评论输入回调
   */
  private async releaseComment(content: string) {
    if (!localStorage.getItem("blog_name")) {
      window.eventBus.$emit("blogEventHandle", {
        type: "user-login-show",
        data: true
      });
      return;
    }

    if (content.replace(/\s+/g, "") === "") {
      this.$message.error("评论不能为空！");
      return;
    }
    this.handleUserInfoGet();
    this.loading = true;
    const article_id = this.$route.params.id;
    const { author, parent_id, reply_userInfo } = this;
    const res: any = await HttpRequest.CommentModule.getCommentCreate({
      author: JSON.stringify(author),
      article_id,
      content,
      parent_id,
      is_root: parent_id === "",
      reply_userInfo: JSON.stringify(reply_userInfo)
    });
    if (res && res.data) {
      this.$message.success("评论成功");
      this.id = "";
      this.getArticleInfoById();
      this.getArticleCommentList();
      this.loading = false;
    }
  }
  /**
   * 二楼回复
   */
  private handleSecondFloorComment(
    index: number,
    id: string,
    parent_id: string,
    author: DashoboardModule.UserInfo
  ) {
    this.floor = index;
    this.id = id;
    this.parent_id = parent_id;
    this.reply_userInfo = author;
  }
  /**
   * 请求详情
   */
  private async getArticleInfoById() {
    this.loading = true;
    const id = this.$route.params.id;
    const res: ApiResponse<ArticleModule.ArticleInfo> = await HttpRequest.ArticleModule.getArticleInfoById(
      { id }
    );

    if (res && res.data) {
      const info = res.data;
      this.articleInfo = info;
      this.loading = false;
    }
  }
  /**
   * 请求文章相关评论
   */
  private async getArticleCommentList() {
    const article_id = this.$route.params.id;
    let page: number = 1;
    let newComments: Array<ArticleModule.CommentInfo> = [];
    const queryAll = async (page: number) => {
      const res: ApiResponse<ListResponse<
        Array<ArticleModule.CommentInfo>
      >> = await HttpRequest.CommentModule.getCommentList({
        page,
        article_id
      });

      if (res && res.data) {
        const data = res.data.data;
        newComments = [...newComments, ...data];
        if (res.data.total > newComments.length) {
          queryAll(page + 1);
        }
        //全部请求完成
        if (newComments.length === res.data.total) {
          let formatObj = newComments.reduce((pre: any, cur: any) => {
            return { ...pre, [cur["id"]]: cur };
          }, {});
          /**
           * 组装数据 生成一个树结构
           */
          let formatArray = newComments.reduce((arr: any, cur: any) => {
            // 获取当前元素的pId 如果没有则设为0  如果有则获取其pId
            let parent_id = cur.parent_id ? cur.parent_id : "";
            let parent = formatObj[parent_id];
            // 这里的parent是当前元素的pId   如果不为0 则代表它是某个分支的子集
            if (parent) {
              // 判断当前分支的children数组是否为[] 如果为[]则将当前元素赋值给该数组 如果不为[]则push
              parent.children
                ? parent.children.push(cur)
                : (parent.children = [cur]);
            } else {
              // 这是pId为0的情况
              cur.children = [];
              arr.push(cur);
            }
            return arr;
          }, []);
          this.comments = formatArray;
        }
      }
    };
    queryAll(page);
  }
  /**
   * 文章访问
   */
  private async getArticleVisit() {
    const id = this.$route.params.id;
    const res: ApiResponse<boolean> = await HttpRequest.ArticleModule.getArticleInfoVisit(
      { id }
    );
  }
  // 登录回调
  private handleUserInfoGet() {
    this.author = {
      user_id: localStorage.getItem("blog_user_id") || "",
      name: localStorage.getItem("blog_name") || "",
      avatar_url: localStorage.getItem("blog_avatar_url") || "",
      location: localStorage.getItem("blog_location") || ""
    };
  }
  /**
   * 文章点赞
   */
  private async getArticleUps() {
    if (
      !localStorage.getItem("blog_name") ||
      !localStorage.getItem("blog_user_id")
    ) {
      window.eventBus.$emit("blogEventHandle", {
        type: "user-login-show",
        data: true
      });
      return;
    }
    this.handleUserInfoGet();
    const article_id = this.$route.params.id;
    const user_id = localStorage.getItem("blog_user_id");
    if (!this.isUps) {
      const res: ApiResponse<boolean> = await HttpRequest.ArticleModule.getArticleInfoUps(
        { article_id, user_id }
      );
      if (res && res.data) {
        this.$message.success("点赞成功");
        this.handleUpsCheck();
        this.getArticleInfoById();
      }
    } else {
      const res: ApiResponse<boolean> = await HttpRequest.ArticleModule.getArticleInfoUpsDelete(
        { article_id, user_id }
      );
      if (res && res.data) {
        this.$message.success("已取消点赞");
        this.handleUpsCheck();
        this.getArticleInfoById();
      }
    }
  }
  /**
   * 校验登录用户是否点赞过
   */
  private async handleUpsCheck() {
    const article_id = this.$route.params.id;
    const user_id = localStorage.getItem("blog_user_id");
    const res: ApiResponse<boolean> = await HttpRequest.ArticleModule.getArticleUpsCheck(
      {
        article_id,
        user_id
      }
    );
    this.isUps = res.data;
  }
  // 生成二维码
  private handleQRcodeCreate() {
    var qrcode = new QRCode("qrcode", {
      text: window.location.href,
      width: 108,
      height: 108,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }
  created() {
    this.author = {
      user_id: localStorage.getItem("blog_user_id") || "",
      name: localStorage.getItem("blog_name") || "",
      avatar_url: localStorage.getItem("blog_avatar_url") || "",
      location: localStorage.getItem("blog_location") || ""
    };
    const clientWidth = document.documentElement.clientWidth || 1001;
    this.$nextTick(() => {
      this.getArticleInfoById();
      this.getArticleCommentList();
      this.getArticleVisit();
      // this.handleWxShare(); // 初始化微信分享
      // PC端
      if (clientWidth > 1000) {
        this.handleQRcodeCreate();
      }
      if (
        localStorage.getItem("blog_name") &&
        localStorage.getItem("blog_user_id")
      ) {
        this.handleUpsCheck();
      }
    });
  }
  @Watch("$route")
  handleRouteChange(newVal: Route, oldVal: Route) {
    this.getArticleInfoById();
    this.getArticleCommentList();
    this.getArticleVisit();
    // this.handleWxShare(); // 初始化微信分享
  }
}
</script>
<style lang="less" scoped>
.article-wrapper {
  .article-info {
    flex: 1;
    padding: 20px;
    background: #fff;
    .article-header {
      padding: 0 15px;
      .count-info {
        .tag {
          display: inline-block;
          padding: 1px 7px;
          border-radius: 5px;
          color: #fff;
          background: #31c27c;
          font-size: 14px;
        }
        .info {
          span {
            color: #31c27c;
            font-size: 13px;
            display: inline-block;
            padding: 0 5px;
          }
          span:first-child {
            color: #000;
          }
        }
      }
      .title {
        padding-top: 15px;
        font-size: 28px;
        font-weight: bold;
      }
      p {
        background: #f1f1f1;
        padding: 5px 3px;
        border-left: 3px solid #6f6f6f;
        font-size: 12px;
      }
    }
    .markdown-body {
      padding: 0 15px;
    }
    .ups {
      font-size: 12px;
      padding: 5px 15px;
      .click-like {
        span {
          position: relative;
          bottom: 2px;
          left: 5px;
        }
      }
      .click-like .iconfont,
      .catalog .iconfont {
        cursor: pointer;
        padding: 6px;
        font-size: 16px;
        border-radius: 50px;
        border: 1px solid #eee;
      }
    }
    // 分享
    .share-article {
      position: relative;
      text-align: center;
      svg {
        width: 28px;
        height: 28px;
        margin: 0 8px;
      }
      svg:hover {
        transition: 300ms;
        transform: scale(1.3);
      }
      .wx-share-wrapper {
        position: relative;
        .qrcode {
          display: none;
          position: absolute;
          z-index: 999;
          top: 34px;
          left: 13px;
        }
      }
      .wx-share-wrapper:hover .qrcode {
        display: block;
      }
    }
    //评论
    .comment-wrapper {
      padding: 0 15px;
      margin-top: 20px;
      .user_avatar {
        width: 26px;
        height: 26px;
        border-radius: 50px;
        display: inline-block;
        position: relative;
        bottom: 3px;
        border: 1px solid #eee;
        padding: 3px;
      }
      .comment-data {
        .comment-data-item {
          span {
            margin-left: 5px;
          }
        }
        .conment-item-content {
          margin: 5px 0;
          padding-left: 5px;
          font-size: 12px;
          padding: 5px;
        }
        .comment-item-child {
          margin-left: 30px;
        }
      }
      .title {
        font-size: 18px;
        padding-left: 5px;
        margin-bottom: 10px;
        border-left: 3px solid #eee;
      }
      .no-comment {
        text-align: center;
        padding: 30px 0;
      }
      .operate-icon {
        color: #999;
        border-top: 1px solid #eee;
        .iconfont {
          cursor: pointer;
          display: inline-block;
          font-size: 12px;
          margin-right: 15px;
        }
      }
    }
  }
  .right-module {
    width: 300px;
    .article-quotes,
    .tag-module {
      border-radius: 4px;
      background: #fff;
      width: 100%;
      .title {
        border-bottom: 1px solid #eee;
        font-size: 16px;
        padding-left: 5px;
        .iconfont {
          color: #31c27c;
          border-right: 1px solid #eee;
          padding-right: 4px;
        }
      }
      p {
        padding: 10px 5px;
        height: 60px;
        margin: 0;
      }
    }
    .tag-module {
      margin-top: 10px;
      background: #fff;
      border-radius: 4px;
      .tags {
        padding: 10px 5px;
        span {
          font-size: 12px;
          color: #fff;
          margin: 3px;
          border-radius: 4px;
          background: #31c27c;
          padding: 3px 5px;
          display: inline-block;
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .article-wrapper {
    .article-info {
      padding: 10px;
      .article-header {
        padding: 0 5px;
        .title {
          padding-top: 10px;
          font-size: 24px;
          font-weight: 500;
        }
        .count-info {
          line-height: 24px;
          .tag {
            font-size: 10px;
          }
          .info {
            span {
              font-size: 10px;
              padding: 0 2px;
              .iconfont {
                font-size: 14px;
              }
            }
          }
        }
      }
      .markdown-body {
        padding: 0 2px;
      }
      // 分享
      .share-article {
        text-align: center;
        svg {
          width: 24px;
          height: 24px;
          margin: 0 4px;
        }
        .wx-share-wrapper {
          display: none;
        }
      }
      .comment-wrapper {
        padding: 0 5px;
        margin-top: 10px;
        .user_avatar {
          width: 23px;
          height: 23px;
        }
        .comment-data {
          .comment-data-item {
            span {
              font-size: 14px;
              margin-left: 3px;
            }
          }
          .conment-item-content {
            padding: 0 5px;
          }
          .comment-item-child {
            margin-left: 15px;
            div {
              div,
              .comment-item-child-reply {
                font-size: 14px;
                margin-bottom: 5px;
              }
            }
          }
        }
        .title {
          font-size: 14px;
          padding-left: 2px;
          margin-bottom: 5px;
          border-left: 1px solid #eee;
        }
        .no-comment {
          padding: 15px 0;
        }
        .operate-icon {
          .iconfont {
            margin-right: 5px;
          }
        }
      }
    }
    .right-module {
      margin-left: 0 !important;
    }
  }
}
</style>
<style lang="less">
.markdown-body {
  p {
    img {
      width: 100% !important;
      height: auto !important;
    }
  }
}
</style>