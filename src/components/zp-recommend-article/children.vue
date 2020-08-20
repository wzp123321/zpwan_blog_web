<template>
  <div class="recommend-article">
    <div class="header">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="chooseTab(item.key)"
        :class="{'active':item.key===activeName}"
      >
        {{
        item.value
        }}
      </span>
    </div>
    <div class="content">
      <div
        v-for="(item,index) in articles"
        :key="index"
        @click="()=>{$router.push('/article/'+item.id)}"
      >
        <i :class="['iconfont',icons[index]]"></i>
        <el-tooltip effect="dark" :content="item.title" placement="top-end">
          <span style="position:relative;bottom:1px">{{item.title}}</span>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { icons } from "@/assets/js/common";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "RecommendArticle",
})
export default class RecommendArticle extends Vue {
  private activeName: string = "first";
  // 推荐文章
  private recommendArticles: Array<ArticleModule.ArticleInfo> = [];
  // 近期文章
  private recentArticles: Array<ArticleModule.ArticleInfo> = [];
  // 热门文章
  private hotArticles: Array<ArticleModule.ArticleInfo> = [];
  private tabs: Array<{ [key: string]: any }> = [
    {
      key: "first",
      value: "推荐文章"
    },
    {
      key: "second",
      value: "近期文章"
    },
    {
      key: "third",
      value: "热门文章"
    }
  ];
  private articles: Array<ArticleModule.ArticleInfo> = [];
  // icons
  private icons: string[] = icons;
  /**
   * tab 切换
   */
  private chooseTab(value: string) {
    this.activeName = value;
    switch (value) {
      case "first":
        this.articles = this.recommendArticles;
        break;
      case "second":
        this.articles = this.recentArticles;
        break;
      case "third":
        this.articles = this.hotArticles;
        break;
    }
  }
  // 初始化文章数组
  private async initData() {
    const arrays: ["recommendArticles", "recentArticles", "hotArticles"] = [
      "recommendArticles",
      "recentArticles",
      "hotArticles"
    ];
    const promiseAll = [
      HttpRequest.ArticleModule.getArticleSearchByKey({
        isRecommend: 1,
        limit: 9
      }),
      HttpRequest.ArticleModule.getArticleSearchByKey({ limit: 9 }),
      HttpRequest.ArticleModule.getHotArticleList({})
    ];

    const resolveAll = await Promise.all(promiseAll);

    if (resolveAll && promiseAll.length > 0) {
      resolveAll.forEach((res, index) => {
        if (res && res.data) {
          const datas = res.data.data;
          this[arrays[index]] = datas;
        }
      });
    }
    this.chooseTab('first')
  }

  created() {
    this.$nextTick(() => {
      this.initData();
    });
  }
}
</script>
<style lang="less" scoped>
.recommend-article {
  margin-top: 10px;
  background: #fff;
  .header {
    font-size: 14px;
    border-bottom: 1px solid #eee;
    span {
      display: inline-block;
      padding: 10px 18px !important;
    }
    .active {
      transition: all 200ms ease-in-out;
      color: #31c27c;
      border-bottom: 1px solid #31c27c;
    }
  }
  .content {
    max-height: 375px;
    overflow: scroll;
    div {
      padding: 8px 10px;
      cursor: pointer;
      font-size: 13px;
      border-bottom: 1px solid #eee;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .iconfont {
        display: inline-block;
        padding: 0 5px;
      }
    }
    div:nth-child(1) {
      .iconfont {
        color: red;
      }
    }
    div:nth-child(2) {
      .iconfont {
        color: #06a5ffed;
      }
    }
    div:nth-child(3) {
      .iconfont {
        color: #31c27c;
      }
    }
    div:hover {
      opacity: 0.7;
    }
  }
}
@media screen and (max-width: 800px) {
  .recommend-article .header span {
    padding: 10px 8px !important;
    font-size: 12px !important;
  }
}
</style>
<style>
.el-tooltip__popper.is-dark {
  background: #31c27c;
}
</style>