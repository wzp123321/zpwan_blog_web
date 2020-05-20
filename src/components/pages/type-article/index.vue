<template>
  <b-container class="type-article">
    <b-row>
      <b-col xl="9" md="12" cols="12" class="article-data">
        <!-- 有数据 -->
        <div v-if="JSON.stringify(articles) !== '[]'">
          <ArticleItem v-for="(item,index) in articles" :key="index" :articleInfo="item"></ArticleItem>
          <div
            class="load-more"
            v-if="JSON.stringify(articles) !=='[]' && pagination.total>10 && pagination.total!==articles.length "
          >
            <el-button :loading="loading" @click="handlePaginationChange" type="primary">阅读更多</el-button>
            <div class="load-more-mobile" @click="handlePaginationChange">
              <span v-if="!loading">
                阅读更多
                <i class="iconfont icon-down"></i>
              </span>
              <div v-else class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-data">
          <img src="../../../assets/imgs/no-article.png" alt />
          <h1>当前模块下暂无文章</h1>
        </div>
      </b-col>
      <b-col xl="3" md="12" cols="12" class="right-module">
        <RecommendArticle></RecommendArticle>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { Button } from "element-ui";
import { Route } from "vue-router";
import ArticleItem from "@/components/ArticleItem.vue";
import RecommendArticle from "@/components/RecommendArticle.vue";
@Component({
  name: "TypeModule",
  components: {
    "el-button": Button,
    ArticleItem,
    RecommendArticle
  }
})
export default class TypeModule extends Vue {
  private loading: boolean = false;
  // 文章列表
  private articles: Array<ArticleModule.ArticleInfo> = [];
  // 分页
  private pagination: { [key: string]: any } = {
    page: 1,
    total: 10
  };
  private tags: Array<{ [key: string]: any }> = [];
  /**
   * 请求tag列表
   */
  private async getTagList() {
    let page: number = 1;
    const queryAll = async (page: number) => {
      const res: ApiResponse<ListResponse<
        Array<{ [key: string]: any }>
      >> = await HttpRequest.BannerModule.getTagsList({
        page
      });
      if (res && res.data) {
        const datas = res.data.data;
        this.tags = [...this.tags, ...datas];
        if (res.data.total > this.tags.length) {
          queryAll(page + 1);
        }
      }
    };
    queryAll(page);
  }
  /**
   * 请求文章列表
   */
  private async getArticleList() {
    const page = this.pagination.current;
    const second_catalogId = this.$route.params.type;
    const res: ApiResponse<ListResponse<
      Array<ArticleModule.ArticleInfo>
    >> = await HttpRequest.ArticleModule.getArticleList({
      page,
      second_catalogId
    });
    if (res && res.data) {
      const datas = res.data.data;
      const total = res.data.total;
      this.articles = [...this.articles, ...datas];
      this.pagination.total = total;
    }
  }
  /**
   * 分页
   */
  private handlePaginationChange() {
    if (this.articles.length < this.pagination.total) {
      this.loading = true;
      this.pagination.current += 1;
      setTimeout(() => {
        this.getArticleList();
      }, 800);
    }
  }
  created() {
    this.$nextTick(() => {
      this.getTagList();
      this.getArticleList();
    });
  }
  @Watch("$route")
  handleRouteChange(newVal: Route, oldVal: Route) {
    this.getTagList();
    this.getArticleList();
  }
}
</script>
<style lang="less" scoped>
.type-article {
  .article-data {
    flex: 1;
    .load-more {
      .el-button {
        width: 100%;
        margin-top: 20px;
        border-radius: 30px;
      }
      .load-more-mobile {
        display: none;
      }
    }
  }
  .no-data {
    text-align: center;
    padding: 60px 0;
    img {
      width: 200px;
      height: 200px;
    }
    h1 {
      font-size: 20px;
      color: #333;
    }
  }
  .right-module {
    margin-left: 20px;
  }
}

@media screen and (max-width: 1100px) {
  .right-module {
    margin-left: 0 !important;
  }
}
@media screen and (max-width: 500px) {
  .article-data {
    flex: 1;
    .load-more {
      .el-button {
        display: none;
      }
      .load-more-mobile {
        display: block !important;
        font-size: 13px;
        background: #fff;
        color: #999;
        padding: 10px 0;
        text-align: center;
        display: block !important;
        .iconfont {
          position: relative;
          top: 2px;
        }
        .loading {
          width: 150px;
          height: 15px;
          margin: 0 auto;
          position: relative;
        }
        .loading span {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: lightgreen;
          -webkit-animation: load 700ms ease-in infinite alternate;
        }
        @-webkit-keyframes load {
          0% {
            opacity: 1;
            -webkit-transform: translate(-35px);
          }
          100% {
            opacity: 0.2;
            -webkit-transform: translate(35px);
          }
        }
        .loading span:nth-child(1) {
          -webkit-animation-delay: 0.13s;
        }
        .loading span:nth-child(2) {
          -webkit-animation-delay: 0.26s;
        }
        .loading span:nth-child(3) {
          -webkit-animation-delay: 0.39s;
        }
        .loading span:nth-child(4) {
          -webkit-animation-delay: 0.52s;
        }
        .loading span:nth-child(5) {
          -webkit-animation-delay: 0.65s;
        }
      }
    }
  }
  .no-data {
    padding: 20px 0 !important;
    img {
      width: 120px !important;
      height: 120px !important;
    }
    h1 {
      font-size: 14px !important;
    }
  }
}
</style>