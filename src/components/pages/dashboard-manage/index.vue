<template>
  <div class="dashoboard-wrapper">
    <!-- 用户信息模块 -->
    <el-carousel
      height="30px"
      direction="vertical"
      :autoplay="true"
      :loop="true"
      @change="handleCarouselChange"
    >
      <el-carousel-item v-for="(item,index) in notices" :key="index" class="notice-carousel-item">
        <i
          :style="{color:noticeInfo.isEmergency===1 ? '#ec3d06':'#f5db4b'}"
          class="iconfont icon-laba"
        ></i>
        <span>{{noticeInfo.content}}</span>
      </el-carousel-item>
    </el-carousel>
    <!-- content模块 -->
    <div class="content-wrapper frspace">
      <!-- 文章模块 -->
      <div class="article-wrapper">
        <!-- banner模块 -->
        <el-carousel :interval="4000" type="card" height="240px" class="carousel">
          <el-carousel-item v-for="(item,index) in banners" :key="'banner_'+index">
            <img
              :src="item.imgUrl"
              style="width:100%;height:240px"
              @click="()=>{$router.push(item.url)}"
              alt
            />
            <div class="title">{{item.title}}</div>
          </el-carousel-item>
        </el-carousel>
        <!-- 文章列表 -->
        <ArticleItem v-for="(item,index) in articles" :key="index" :articleInfo="item"></ArticleItem>
        <el-pagination
          style="text-align:center;margin-top:10px"
          layout="prev, pager, next"
          :total="pagination.total"
          :current-page="pagination.page"
        ></el-pagination>
      </div>
      <!-- 标签信息模块 -->
      <div class="other-wrapper">
        <!-- 标语 -->

        <!-- 标签 -->
        <div class="tag-wrapper">
          <div class="title">
            <i class="iconfont icon-tag"></i>全部标签
          </div>
          <div class="content">
            <span v-for="(item,index) in tags" :key="index">{{item.value}}</span>
          </div>
        </div>
        <!-- 文章列表 -->
        <RecommendArticle></RecommendArticle>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { Carousel, CarouselItem, Pagination } from "element-ui";
import ArticleItem from "@/components/ArticleItem.vue";
import RecommendArticle from "@/components/RecommendArticle.vue";
@Component({
  name: "DashboardModule",
  components: {
    "el-carousel": Carousel,
    "el-carousel-item": CarouselItem,
    "el-pagination": Pagination,
    ArticleItem,
    RecommendArticle
  }
})
export default class DashboardModule extends Vue {
  // banner列表
  private banners: Array<DashoboardModule.BannerInfo> = [];
  // notice 列表
  private notices: Array<NoticeInfo> = [];
  // 当前通知详情
  private noticeInfo: NoticeInfo = {};
  // article 列表
  private articles: Array<ArticleModule.ArticleInfo> = [];
  // 分页
  private pagination: { [key: string]: any } = {
    page: 1,
    total: 10
  };
  private tags: Array<{ [key: string]: any }> = [];
  /**
   * 请求banner列表
   */
  private async getBannerList() {
    const res: ApiResponse<ListResponse<
      Array<DashoboardModule.BannerInfo>
    >> = await HttpRequest.BannerModule.getBannerList({ isShelves: 1 });
    if (res && res.data) {
      const banners = res.data.data;
      this.banners = banners;
    }
  }
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
    const res: ApiResponse<ListResponse<
      Array<ArticleModule.ArticleInfo>
    >> = await HttpRequest.ArticleModule.getArticleList({ limit: 5 });
    if (res && res.data) {
      const datas = res.data.data;
      const total = res.data.total;
      this.articles = datas;
      this.pagination.total = total;
    }
  }
  /**
   * 请求通知列表
   */
  private async getNoticeList() {
    const res: ApiResponse<any> = await HttpRequest.BannerModule.getNoticeList(
      {}
    );

    if (res && res.data) {
      this.notices = res.data.data;
      this.noticeInfo = this.notices[0];
    }
  }
  // 轮播
  private handleCarouselChange(index: number) {
    this.noticeInfo = this.notices[index];
  }
  created() {
    this.$nextTick(() => {
      this.getBannerList();
      this.getArticleList();
      this.getTagList();
      this.getNoticeList();
    });
  }
}
</script>
<style lang="less" scoped>
.dashoboard-wrapper {
  position: relative;
  .notice-carousel-item {
    padding-top: 4px;
    font-size: 14px;
    background: #fff;
    .iconfont {
      font-size: 14px;
      display: inline-block;
      margin: 0  10px;
    }
  }
  .content-wrapper {
    margin-top: 10px;
    .article-wrapper {
      flex: 1;
      .carousel {
        background: #fff;
        position: relative;
        img {
          border-radius: 5px;
        }
        .title {
          position: absolute;
          left: 0;
          top: 0;
          padding: 5px 15px;
          background: #31c27c;
          color: #fff;
        }
      }
    }
    .other-wrapper {
      width: 300px;
      margin-left: 10px;
      .tag-wrapper {
        background: #fff;
        .title {
          border-bottom: 1px solid #eee;
          font-size: 16px;
          padding: 5px 10px;
          .iconfont {
            color: #31c27c;
            border-right: 1px solid #eee;
            padding-right: 4px;
          }
        }
        .content {
          padding: 5px;
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
}
@media screen and (max-width: 768px) {
  .carousel {
    display: none;
  }
}
</style>