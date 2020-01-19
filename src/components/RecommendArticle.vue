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
      <span v-for="(item,index) in articles" :key="index">
        <i :class="['iconfont',index===2? 'icon-icon-test':'icon-'+index]"></i>
        {{item.title}}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Tabs, TabPane } from "element-ui";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "RecommendArticle",
  components: {
    "el-tabs": Tabs,
    "el-tab-pane": TabPane
  }
})
export default class RecommendArticle extends Vue {
  private activeName: string = "first";

  private articles: Array<ArticleModule.ArticleInfo> = [];

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
  /**
   * tab 切换
   */
  private chooseTab(value: string) {
    this.articles = [];
    this.activeName = value;
    if (value === "first") {
      this.getArticleList({ isRecommend: 1, limit: 10 });
    } else if (value === "second") {
      this.getArticleList({
        limit: 10
      });
    } else {
      this.getHotArticle();
    }
  }
  /**
   * 请求推荐&&近期文章
   */
  private async getArticleList(params: { [key: string]: any }) {
    const res: ApiResponse<ListResponse<
      Array<ArticleModule.ArticleInfo>
    >> = await HttpRequest.ArticleModule.getArticleList(params);
    if (res && res.data) {
      const datas = res.data.data;
      this.articles = datas;
    }
  }
  /**
   * 请求热门文章
   */
  private async getHotArticle() {}

  created() {
    this.getArticleList({
      isRecommend: 1,
      limit: 10
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
      padding: 10px 21px;
    }
    .active {
      transition: all 200ms ease-in-out;
      color: #31c27c;
      border-bottom: 1px solid #31c27c;
    }
  }
  .content {
    height: 360px;
    span {
      display: block;
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
    span:nth-child(1) {
      .iconfont {
        color: red;
      }
    }
    span:nth-child(2) {
      .iconfont {
        color: #06a5ffed;
      }
    }
    span:nth-child(3) {
      .iconfont {
        color: #31c27c;
      }
    }
    span:hover {
      opacity: 0.7;
    }
  }
}
</style>