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
        <el-carousel :interval="4000" height="300px" class="carousel">
          <el-carousel-item v-for="(item,index) in banners" :key="'banner_'+index">
            <img
              :src="item.imgUrl"
              style="width:100%;height:300px;background:#eee"
              @click="()=>{$router.push(item.url)}"
              alt
            />
            <div class="title">{{item.title}}</div>
          </el-carousel-item>
        </el-carousel>
        <!-- 文章列表 -->
        <zp-article-item v-for="(item,index) in articles" :key="index" :articleInfo="item"></zp-article-item>
        <el-button
          v-if="pagination.total>10 && this.pagination.total!==articles.length"
          :loading="loading"
          @click="loadMore"
          class="load-more"
          type="primary"
        >阅读更多</el-button>
        <div
          class="load-more-mobile"
          v-if="pagination.total>10 && this.pagination.total!==articles.length "
          @click="loadMore"
        >
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
        <zp-recommend-article></zp-recommend-article>
        <!-- 我的公众号 -->
        <div class="my-weixin-content">
          <img v-viewer src="../../assets/imgs/wodegongzhong.jpg" alt class="my-weixin-code" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "DashboardModule",
})
export default class DashboardModule extends Vue {
  private loading: boolean = false;
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
    limit: 10,
    total: 10,
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
    let datas: { [key: string]: any }[] = [];
    const queryAll = async (page: number) => {
      const res: ApiResponse<ListResponse<
        Array<{ [key: string]: any }>
      >> = await HttpRequest.BannerModule.getTagsList({
        page,
      });
      if (res && res.data) {
        datas = [...datas, ...this.getTagChange(res.data.data)];
        if (res.data.total > datas.length) {
          queryAll(page + 1);
        } else {
          this.tags = datas;
        }
      }
    };
    queryAll(page);
  }
  // tag转参数格式
  private getTagChange(data: Array<{ [key: string]: any }>) {
    let datas = data;
    let newData: Array<{ [key: string]: any }> = [];
    datas.forEach((item: { [key: string]: any }) => {
      newData.push({
        id: item.id,
        name: item.value,
      });
    });
    return newData;
  }
  /**
   * 请求文章列表
   */
  private async getArticleList() {
    const { page, limit } = this.pagination;
    const res: ApiResponse<ListResponse<
      Array<ArticleModule.ArticleInfo>
    >> = await HttpRequest.ArticleModule.getArticleList({ page, limit });
    if (res && res.data) {
      const datas = res.data.data;
      const total = res.data.total;
      this.articles = [...this.articles, ...datas];
      this.pagination.total = total;
      this.loading = false;
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
  // 文章分页
  private loadMore() {
    this.$debounce(() => {
      if (this.articles.length < this.pagination.total) {
        this.loading = true;
        this.pagination.page += 1;
        setTimeout(() => {
          this.getArticleList();
        }, 800);
      }
    });
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
          font-size: 16px;
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

      .my-weixin-content {
        padding-bottom: 15px;
        background-color: white;
        img {
          width: 240px;
          height: 240px;
        }
      }
    }
    .load-more {
      width: 100%;
      border-radius: 30px;
      margin-top: 20px;
    }
    .load-more-mobile {
      display: none;
    }
  }
}
@media screen and (max-width: 500px) {
  .load-more {
    display: none;
  }
  .load-more-mobile {
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
  .other-wrapper {
    margin-top: 10px;
    margin-left: 0px !important;
    .tag-wrapper {
      .content {
        padding: 0 !important;
      }
      .tag-cloud {
        width: 100% !important;
      }
    }
    .my-weixin-content {
      img {
        width: 120px !important;
        height: 120px !important;
      }
    }
  }
}
</style>