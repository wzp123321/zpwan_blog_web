<template>
  <div class="type-article frspace">
    <div class="article-data">
      <ArticleItem v-for="(item,index) in articles" :key="index" :articleInfo="item"></ArticleItem>
      <div style="text-align:center">
        <Pagination
          v-if="JSON.stringify(articles) !=='[]'"
          layout="prev, pager, next"
          :total="pagination.total"
          :current-page="pagination.current"
          @change="handlePaginationChange"
        ></Pagination>
      </div>
    </div>
    <div class="right-module">
      <RecommendArticle></RecommendArticle>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { Pagination } from "element-ui";
import { Route } from "vue-router";
import ArticleItem from "@/components/ArticleItem.vue";
import RecommendArticle from "@/components/RecommendArticle.vue";
@Component({
  name: "TypeModule",
  components: {
    ArticleItem,
    Pagination,
    RecommendArticle
  }
})
export default class TypeModule extends Vue {
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
      this.articles = datas;
      this.pagination.total = total;
    }
  }
  /**
   * 分页
   */
  private handlePaginationChange(value: number) {
    this.pagination.current = value;
    this.getArticleList();
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
  position: relative;
  .article-data {
    flex: 1;
  }
  .right-module {
    width: 300px;
    margin-left: 20px;
  }
}
</style>