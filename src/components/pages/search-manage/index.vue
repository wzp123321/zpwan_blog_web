<template>
  <div class="search-wrapper">
    <div class="search-input flex-row">
      <el-input v-model="key" placeholder="请输入内容"></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="height:40px;padding:12px 10px;margin-left:15px"
        @click="handleSearchByKey"
      >搜索</el-button>
    </div>
    <div class="search-content frspace" v-if="JSON.stringify(articles)!=='[]'">
      <div class="article-list">
        <ArticleItem v-for="(item,index) in articles" :key="index" :articleInfo="item"></ArticleItem>
      </div>
      <div class="tags">
        <RecommendArticle></RecommendArticle>
      </div>
    </div>
    <div
      class="search-content frspace"
      v-if="JSON.stringify(articles)==='[]' && JSON.stringify(intro_articles)!=='[]'"
    >
      <div class="article-list">
        <p>
          未能找到如下有关"+
          <span class="em">{{this.key}}</span>+"，为您智能推荐以下课程
        </p>
        <ArticleItem v-for="(item,index) in intro_articles" :key="index" :articleInfo="item"></ArticleItem>
      </div>
      <div class="tags">
        <RecommendArticle></RecommendArticle>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Input, Button } from "element-ui";
import RecommendArticle from "@/components/RecommendArticle.vue";
import HttpRequest from "@/assets/api/modules/index";
import ArticleItem from "@/components/ArticleItem.vue";
@Component({
  name: "SearchModule",
  components: {
    "el-input": Input,
    "el-button": Button,
    ArticleItem,
    RecommendArticle
  }
})
export default class SearchModule extends Vue {
  private key: string = "";
  private articles: Array<ArticleModule.ArticleInfo> = [];
  private intro_articles: Array<ArticleModule.ArticleInfo> = [];
  private total: number = 0;
  private page: number = 1;
  /**
   * 搜索事件
   */
  private async handleSearchByKey() {
    const res: ApiResponse<ListResponse<
      Array<ArticleModule.ArticleInfo>
    >> = await HttpRequest.ArticleModule.getArticleSearchByKey({
      key: this.key
    });

    if (res && res.data) {
      const total = res.data.total;
      const articles = res.data.data;
      this.total = total;
      this.articles = articles;
      this.handleSearchListFilter();
      if (JSON.stringify(res.data.data) === "[]") {
        const newres = await HttpRequest.ArticleModule.getArticleList({
          page: 1
        });
        if (newres && newres.data) {
          const datas = newres.data.data;
          this.intro_articles = datas;
        }
      }
    }
  }
  /**
   * 替换关键字
   */
  private handleSearchListFilter() {
    this.articles.forEach((item: ArticleModule.ArticleInfo, index: number) => {
      item.title = item.title.replace(
        new RegExp(this.key, "g"),
        `<span class='em'>${this.key}</span>`
      );
      item.description = item.description.replace(
        new RegExp(this.key, "g"),
        `<span class='em'>${this.key}</span>`
      );
    });
  }
}
</script>
<style lang="less" scoped>
.search-wrapper {
  position: relative;
  .search-input {
    position: absolute;
    z-index: 999;
    top: 0%;
    width: 50%;
    left: 21%;
    background: #fff;
    padding: 20px 50px;
    border-radius: 4px;
  }
  .search-content {
    position: relative;
    padding-top: 90px;
    .article-list {
      width: 72%;
      padding: 0 1%;
    }
    .tags {
      width: 300px;
      margin-left: 20px;
    }
  }
}
</style>