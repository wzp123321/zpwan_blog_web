<template>
  <div class="article-item">
    <div class="flex-row">
      <span v-if="articleInfo.isTop===1" class="top">置顶</span>
      <div class="img-div">
        <img :src="articleInfo.imgUrl" alt @click="()=>{$router.push('/article/'+articleInfo.id)}" />
      </div>
      <div class="info">
        <div class="header frspace">
          <h1 @click="()=>{$router.push('/article/'+articleInfo.id)}" v-html="articleInfo.title"></h1>
        </div>
        <p v-html="articleInfo.description"></p>
        <span class="mobile-time">
          <i class="iconfont icon-rili"></i>
          {{formatDate(articleInfo.create_time)}}
        </span>
        <div class="frspace">
          <div class="count">
            <span class="pc-time">
              <i class="iconfont icon-rili"></i>
              {{formatDate(articleInfo.create_time)}}
            </span>
            <span>
              <i class="iconfont icon-liulan"></i>
              浏览
              {{articleInfo.visit_count}}
            </span>
            <span>
              <i class="iconfont icon-xiai"></i>
              点赞
              {{articleInfo.like_count}}
            </span>
            <span>
              <i class="iconfont icon-pinglun"></i>
              评论
              {{articleInfo.comment_count}}
            </span>
          </div>
          <div class="read" @click="()=>{$router.push('/article/'+articleInfo.id)}">
            <el-tooltip effect="dark" content="前往查看文章详情" placement="top-end">
              <span>阅读全文</span>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { formatDate } from "@/assets/js/index";
import { Tooltip } from "element-ui";
@Component({
  name: "ArticleItem",
  components: {
    "el-tooltip": Tooltip
  }
})
export default class ArticleItem extends Vue {
  // 文章详情
  @Prop()
  private articleInfo!: ArticleModule.ArticleInfo;

  private formatDate(time: number) {
    return formatDate(time);
  }
}
</script>
<style lang="less" scoped>
.article-item {
  position: relative;
  bottom: 0;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  margin-top: 10px;
  .top {
    position: absolute;
    top: 11px;
    left: 9px;
    display: inline-block;
    padding: 5px;
    font-size: 12px;
    color: #fff;
    border-radius: 5px;
    background: #ea3737;
  }
  .img-div {
    background-image: url(../assets/imgs/img-error.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-width: 120px;
    min-height: 120px;
    max-width: 120px;
    max-height: 120px;
    border-radius: 3px;
    border: 1px solid #f1efef;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    width: 100%;
    padding: 0 10px;
    .header {
      h1 {
        margin: -3px 0 10px 0;
        font-weight: 500;
        font-size: 18px;
        color: #555555;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 450px;
      }
      h1:hover {
        cursor: pointer;
        color: #424141;
      }
    }
    p {
      margin: 0;
      height: 50px;
      font-size: 12px;
      background: #f1f1f1;
      padding: 5px;
      margin-bottom: 10px;
      border-radius: 4px;
    }
    .count {
      span {
        font-size: 12px;
        display: inline-block;
        padding: 0 8px;
        color: #6d6d6d;
      }
      span:last-child {
        color: #31c27c;
      }
    }
    .read {
      padding: 0 10px;
      background: #31c27c;
      color: #fff;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      line-height: 20px;
    }
    .read:hover {
      opacity: 0.9;
    }
  }
}
.mobile-time {
  display: none;
}
.article-item:hover {
  cursor: pointer;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
  transform: translateX(4px);
  transform: 200ms;
}

@media screen and (max-width: 768px) {
  .info {
    p {
      height: 33px !important;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .mobile-time {
    display: inline;
  }
  .pc-time {
    display: none !important;
  }
}
@media screen and (max-width: 500px) {
  .article-item {
    padding: 2px;
    margin-top: 5px;
    .top {
      top: 11px;
      left: 9px;
      padding: 5px;
      font-size: 10px;
    }
    .img-div {
      min-width: 80px;
      min-height: 80px;
      max-width: 80px;
      max-height: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      padding: 0 5px;
      .header {
        h1 {
          margin: 5px 2px;
          font-weight: blod;
          font-size: 13px;
          width: 150px;
        }
      }
      p {
        display: none;
      }
      .mobile-time {
        display: none;
      }
      .count {
        margin-top: 31px;
        span {
          font-size: 10px;
          padding: 0 4px;
          .iconfont {
            position: relative;
            top: 0;
            font-size: 12px;
          }
        }
      }
      .read {
        display: none;
      }
    }
  }
  @keyframes item_show {
    0% {
      transform: scaley(0px);
    }
    50% {
      transform: scaleY(3px);
    }
    100% {
      transform: scaleY(0);
    }
  }
}
</style>