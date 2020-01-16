<template>
  <div class="dashoboard-wrapper">
    <!-- 通知模块 -->
    <div class="notice-wrapper">ddddddddddd</div>
    <!-- content模块 -->
    <div class="content-wrapper frspace">
      <!-- 文章模块 -->
      <div class="article-wrapper">
        <!-- banner -->
        <el-carousel :interval="4000" type="card" height="300px" class="carousel">
          <el-carousel-item v-for="(item,index) in banners" :key="'banner_'+index">
            <img :src="item.imgUrl" alt style="width:100%;height:auto" />
            <div class="title">{{item.title}}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 标签信息模块 -->
      <div class="tag-wrapper"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { Carousel, CarouselItem } from "element-ui";
@Component({
  name: "DashboardModule",
  components: {
    "el-carousel": Carousel,
    "el-carousel-item": CarouselItem
  }
})
export default class DashboardModule extends Vue {
  private banners: Array<DashoboardModule.BannerInfo> = [];

  /**
   * 请求banner列表
   */
  private async getBannerList() {
    const res: ApiResponse<ListResponse<
      Array<DashoboardModule.BannerInfo>
    >> = await HttpRequest.BannerModule.getBannerList({});
    if (res && res.data) {
      const banners = res.data.data;
      this.banners = banners;
    }
  }

  created() {
    this.getBannerList();
  }
}
</script>
<style lang="less" scoped>
.dashoboard-wrapper {
  position: relative;
  .notice-wrapper {
    width: 100%;
    height: 32px;
    border-radius: 5px;
    background: #fff;
  }
  .content-wrapper {
    margin-top: 10px;
    .article-wrapper {
      padding: 0 10px;
      flex: 1;
      background: #fff;
      .carousel {
        position: relative;
        img{
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
      width: 200px;
      margin-left: 20px;
      background: #fff;
    }
  }
}
</style>