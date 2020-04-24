<template>
  <b-container class="dashoboard-wrapper">
    <!-- 通知模块 -->
    <b-row>
      <b-col>
        <el-carousel
          width="100%"
          height="30px"
          direction="vertical"
          :autoplay="true"
          :loop="true"
          @change="handleCarouselChange"
        >
          <el-carousel-item
            v-for="(item,index) in notices"
            :key="index"
            class="notice-carousel-item"
          >
            <i
              :style="{color:noticeInfo.isEmergency===1 ? '#ec3d06':'#f5db4b'}"
              class="iconfont icon-laba"
            ></i>
            <span>{{noticeInfo.content}}</span>
          </el-carousel-item>
        </el-carousel>
      </b-col>
    </b-row>
    <!-- content模块 -->
    <b-row class="content-wrapper">
      <!-- 文章模块 -->
      <b-col xl="8" md="12" cols="12" class="article-wrapper">
        <!-- banner模块 -->
        <el-carousel :interval="400000" height="240px" class="carousel">
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
          v-if="pagination.total>10"
          style="text-align:center;margin:10px 0"
          layout="prev, pager, next"
          :total="pagination.total"
          :current-page="pagination.page"
        ></el-pagination>
      </b-col>
      <!-- 标签信息模块 -->
      <b-col xl="4" md="12" cols="12" class="other-wrapper">
        <!-- 标签 -->
        <div class="tag-wrapper">
          <div class="title">
            <i class="iconfont icon-tag"></i>全部标签
          </div>
          <div class="content">
            <tag-cloud
              :data="tags"
              :config="{rotateAngleXbase:400,rotateAngleYbase:400,hover:false}"
            ></tag-cloud>
          </div>
        </div>
        <!-- 文章列表 -->
        <RecommendArticle></RecommendArticle>
      </b-col>
    </b-row>
  </b-container>
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
        this.tags = [...this.tags, ...this.getTagChange(datas)];
        if (res.data.total > this.tags.length) {
          queryAll(page + 1);
        }
      }
    };
    queryAll(page);
  }
  // tag转参数格式
  getTagChange(data: Array<{ [key: string]: any }>) {
    let newData: Array<{ [key: string]: any }> = [];
    data.forEach((item: { [key: string]: any }) => {
      newData.push({
        id: item.id,
        name: item.value
      });
    });
    return newData;
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
      margin: 0 10px;
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
@media screen and (max-width: 500px) {
  .other-wrapper {
    margin-top: 10px;
    margin-left: 0px !important;
    .tag-wrapper {
      .content {
        padding: 0 !important;
      }
      .tag-cloud{
        width: 100% !important;
      }
    }
  }
}
</style>