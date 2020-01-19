<template>
  <div class="article-wrapper frspace">
    <div class="article-info">
      <!-- 实现分享文章 -->
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
          <i class="iconfont icon-dianzan"></i>
          <span>点个赞呗</span>
        </div>
        <div class="catalog">
          <i class="iconfont icon-wenjianjia"></i>
          {{
          articleInfo.second_catalogName
          }}
        </div>
      </div>
      <!-- 评论模块 -->
      <div class="comment-wrapper">
        <div class="title">
          全部评论
          <span style="font-size:12px;">共{{articleInfo.comment_count}}条</span>
        </div>
        <div v-if="JSON.stringify(comments) === '[]'" class="no-comment">暂无评论，期待您的优秀评论</div>
        <!--有评论 -->
        <div v-else class="comment-data">
          <CommentInput @release="releaseComment"></CommentInput>
          <div v-for="(item,index) in comments" :key="index">
            <div class="frsp">
              <div>
                <img
                  :src="item.author.avatar"
                  style="wdith:30px;height:30px;border-radius:50px;display:inline"
                  alt
                />
                <span v-if="item.author">{{item.author.name}}</span>
              </div>
            </div>
            <p>{{item.content}}</p>
            <p>
              <i class="iconfont icon-dianzan">点赞</i>
              --
              <i
                class="iconfont icon-pinglun"
                @click="()=>{ floor =index ;id= item.id}"
              >回复</i>
            </p>
            <div>
              <CommentInput v-if="floor===index && id === item.id" @release="releaseComment"></CommentInput>
            </div>
            <div style="margin-left:30px">
              <div v-for="(childItem,idx) in item.children" :key="idx">
                <div class="frsp">
                  <div v-if="childItem.author">
                    <img
                      :src="childItem.author.avatar"
                      style="wdith:30px;height:30px;border-radius:50px;display:inline"
                      alt
                    />
                    <span>{{childItem.author.name}}</span>
                  </div>
                  <!-- 点击这里的评论出现@这个评论的楼主 -->
                </div>
                <p v-if="childItem.reply_owner">
                  回复
                  <span style="color:#06a5ff">{{childItem.reply_owner.name}}</span>
                  : {{childItem.content}}
                </p>
                <p>
                  <i class="iconfont icon-dianzan"></i> 点赞 --
                  <span @click="()=>{ floor =index ;id= childItem.id}">
                    <i class="iconfont icon-pinglun"></i> 回复
                  </span>
                </p>
                <div>
                  <CommentInput
                    v-if="floor===index && id === childItem.id"
                    @release="releaseComment"
                  ></CommentInput>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-module">
      <!-- 感悟模块 -->
      <div class="article-quotes">
        <div class="title">
          <i class="iconfont icon-laba"></i>
          人生感悟
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
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { Divider } from "element-ui";
import { formatDate } from "@/assets/js/index";
import CommentInput from "@/components/CommentInput.vue";
import RecommendArticle from "@/components/RecommendArticle.vue";
import "mavon-editor/dist/css/index.css";
import "mavon-editor/dist/highlightjs/highlight.min.js";
import "mavon-editor/dist/katex/katex";
import "mavon-editor/dist/highlightjs/languages/javascript.min.js";
import "mavon-editor/dist/highlightjs/languages/java.min.js";
import "highlight.js/lib/highlight.js";

@Component({
  name: "ArticleInfoModule",
  components: {
    "el-divider": Divider,
    CommentInput,
    RecommendArticle
  }
})
export default class ArticleInfoModule extends Vue {
  // 标识当前评论的大楼层
  private floor: number = 1;
  // 当前需要评论的评论id
  private id: string = "";
  // 评论的作者信息---即登录的用户
  private author: { [key: string]: any } = {
    id: "test_ddrrfaaa",
    name: "test评论",
    avatar_url: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg",
    location: "江苏南京"
  };
  // 被评论的作者信息
  private reply_userInfo: { [key: string]: any } = {};
  // 文章id
  private article_id: string = "f7c8c0f9-2d51-4915-b690-7bfd460beca2";
  // 评论的父级id
  private parent_id: string = "783c5a44-6747-4ff8-babf-cddc11231b91";
  // 文章详情
  private articleInfo: ArticleModule.ArticleInfo = {};
  // 评论数组
  private comments: Array<ArticleModule.CommentInfo> = [];
  /**
   * 格式化时间
   */
  private formatDate(time: number) {
    return formatDate(time);
  }
  /**
   * 评论输入回调
   */
  private async releaseComment(content: string) {
    if (content.replace(/\s+/g, "") === "") {
      this.$message.error("评论不能为空！");
      return;
    }
    const { author, article_id, parent_id } = this;
    const res: any = await HttpRequest.CommentModule.getCommentCreate({
      article_id,
      author: JSON.stringify(this.author),
      content,
      parent_id,
      is_root: parent_id === "",
      reply_userInfo: JSON.stringify({
        user_id: "22222323",
        name: "万直鹏",
        avatar_url:
          "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg",
        location: "location"
      })
    });
    if (res && res.data) {
      this.$message.success("评论成功");
    }
  }
  /**
   * 请求详情
   */
  private async getArticleInfoById() {
    const id = this.$route.params.id;
    const res: ApiResponse<ArticleModule.ArticleInfo> = await HttpRequest.ArticleModule.getArticleInfoById(
      { id }
    );

    if (res && res.data) {
      const info = res.data;
      this.articleInfo = info;
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
  created() {
    this.$nextTick(() => {
      this.getArticleInfoById();
      this.getArticleCommentList();
    });
  }
}
</script>
<style lang="less" scoped>
.article-wrapper {
  .article-info {
    flex: 1;
    padding: 10px;
    background: #fff;
    .article-header {
      .count-info {
        .tag {
          display: inline-block;
          padding: 3px 7px;
          border-radius: 5px;
          color: #fff;
          background: #31c27c;
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
        padding-top: 10px;
        font-size: 20px;
      }
      p {
        background: #f1f1f1;
        padding: 1px 3px;
        border-left: 3px solid #6f6f6f;
      }
    }
    .ups {
      padding: 5px 10px;
      .click-like {
        .icon-dianzan {
          cursor: pointer;
          padding: 8px;
          font-size: 18px;
          color: #ec7259;
          border-radius: 50px;
          border: 1px solid #eee;
        }
        span {
          font-size: 12px;
        }
      }
      .catalog {
        font-size: 14px;
        .icon-wenjianjia {
          padding: 8px;
          font-size: 18px;
          border-radius: 50px;
          border: 1px solid #eee;
        }
      }
    }
    .comment-wrapper {
      margin-top: 20px;
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
    }
  }
  .right-module {
    width: 300px;
    margin-left: 20px;
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
</style>