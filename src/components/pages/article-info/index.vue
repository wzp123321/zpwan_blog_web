<template>
  <div class="article-wrapper flex-row">
    <div class="article-info">
      <!-- 1.修改文章字段 content：改为md html分别代表代码 以及渲染之后的  以便前后台用 -->
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
        <div class="title">全部评论</div>
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
                <span>{{item.author.name}}</span>
              </div>
            </div>
            <p>{{item.content}}</p>
            <p>
              点赞 --
              <Button
                @click="()=>{ floor =index ;id= item.id}"
                style="background:#67c33d;border-radius:15px;border:0;color:#fff"
                :ghost="true"
              >回复</Button>
            </p>
            <div>
              <CommentInput v-if="floor===index && id === item.id" @release="releaseComment"></CommentInput>
            </div>
            <div style="margin-left:30px">
              <div v-for="(childItem,idx) in item.children" :key="idx">
                <div class="frsp">
                  <div>
                    <img
                      :src="childItem.author.avatar"
                      style="wdith:30px;height:30px;border-radius:50px;display:inline"
                      alt
                    />
                    <span>{{childItem.author.name}}</span>
                  </div>
                  <!-- 点击这里的评论出现@这个评论的楼主 -->
                </div>
                <p>
                  回复
                  <span style="color:#06a5ff">{{childItem.reply_owner.name}}</span>
                  : {{childItem.content}}
                </p>
                <p>
                  点赞 --
                  <span @click="()=>{ floor =index ;id= childItem.id}">回复</span>
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
    <div class="right-module">1111</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { Divider } from "element-ui";
import { formatDate } from "@/assets/js/index";
import CommentInput from "@/components/CommentInput.vue";
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
    CommentInput
  }
})
export default class ArticleInfoModule extends Vue {
  // 标识当前评论的大楼层
  private floor: number = 1;
  // 当前需要评论的评论id
  private id: string = "";
  // 评论的作者信息
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
  private comments: Array<ArticleModule.CommentInfo> = [
    {
      id: "1111111111111",
      content: "测试一下啊",
      author: {
        name: "张三",
        avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
      },
      ups: [],
      downs: [],
      parent_id: "",
      is_root: true,
      reply_owner: {},
      children: [
        {
          id: "2222222222222",
          content: "测试一下啊qqewqe",
          author: {
            name: "张三111",
            avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
          },
          ups: [],
          downs: [],
          parent_id: "1111111111111",
          is_root: false,
          reply_owner: {
            name: "张三",
            avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
          }
        },
        {
          id: "44444444444",
          content: "测试一下啊22222222222",
          author: {
            name: "张三5555",
            avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
          },
          ups: [],
          downs: [],
          parent_id: "1111111111111",
          is_root: false,
          reply_owner: {
            name: "张三111",
            avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
          }
        }
      ]
    },
    {
      id: "3333333333333",
      content: "测试一下啊",
      author: {
        name: "张三",
        avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
      },
      ups: [],
      downs: [],
      parent_id: "",
      is_root: true,
      reply_owner: {}
    },
    {
      id: "55555555555",
      content: "测试一下啊",
      author: {
        name: "张三",
        avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
      },
      ups: [],
      downs: [],
      parent_id: "",
      is_root: true,
      reply_owner: {}
    }
  ];
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
  created() {
    this.$nextTick(() => {
      this.getArticleInfoById();
    });
  }
}
</script>
<style lang="less" scoped>
.article-wrapper {
  .article-info {
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
    border-radius: 4px;
    width: 300px;
    background: #fff;
    margin-left: 20px;
  }
}
</style>