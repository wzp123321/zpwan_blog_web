<template>
  <div class="dashoboard-wrapper">
    <!-- 用户信息模块 -->
    <div class="userinfo-wrapper">userinfo</div>
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
              @click="()=>{$router.push('/article/'+item.id)}"
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
      <div class="tag-wrapper">
        3.新增名言表
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { Carousel, CarouselItem, Pagination } from "element-ui";
import ArticleItem from "@/components/ArticleItem.vue";
@Component({
  name: "DashboardModule",
  components: {
    "el-carousel": Carousel,
    "el-carousel-item": CarouselItem,
    "el-pagination": Pagination,
    ArticleItem
  }
})
export default class DashboardModule extends Vue {
  // banner列表
  private banners: Array<DashoboardModule.BannerInfo> = [];
  // 文章列表
  private articles: Array<ArticleInfo> = [];
  // 分页
  private pagination: { [key: string]: any } = {
    page: 1,
    total: 10
  };
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
   * 请求文章列表
   */
  private async getArticleList() {
    const res: ApiResponse<ListResponse<
      Array<ArticleInfo>
    >> = await HttpRequest.ArticleModule.getArticleList({});
    if (res && res.data) {
      const datas = res.data.data;
      const total = res.data.total;
      this.articles = datas;
      this.pagination.total = total;
    }
  }
  created() {
    this.$nextTick(() => {
      this.getBannerList();
      this.getArticleList();
    });
  }
}
</script>
<style lang="less" scoped>
.dashoboard-wrapper {
  position: relative;
  .userinfo-wrapper {
    width: 100%;
    height: 32px;
    border-radius: 5px;
    background: #fff;
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
    .tag-wrapper {
      width: 300px;
      height: auto;
      margin-left: 20px;
    }
  }
}
</style>