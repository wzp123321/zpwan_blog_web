<template>
  <b-container :class="[{'ceil': isCeil}, 'header-wrapper']" :style="`left:${positionLeft}px`">
    <b-row>
      <b-col xl="3" md="3" cols="11" offset-xl="0" offset-md="0" offset="0" class="info">
        <h1 @click="()=>{$router.push('/')}" class="blog-title">万直鹏的博客</h1>
        <p>仰天大笑出门去，我辈岂是蓬蒿人</p>
      </b-col>
      <b-col
        xl="6"
        offset-xl="3"
        md="9"
        offset-md="0"
        cols="12"
        offset="0"
        class="menu-wrapper flex-row"
      >
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          @select="select"
          active-text-color="#31c27c"
          :default-active="activeIndex"
        >
          <el-menu-item index="1" @click="()=>{$router.push('/')}">首页</el-menu-item>
          <el-menu-item
            index="2"
            @click="()=>{$router.push('/leave_message')}"
            class="leave-message-item"
          >留言板</el-menu-item>
          <el-menu-item
            index="3"
            @click="()=>{$router.push('/picture')}"
            class="leave-message-item"
          >照片墙</el-menu-item>
          <template v-for="(item,index) in menus">
            <el-submenu :index="index+4+''" :key="'menu_'+index">
              <template slot="title">{{item.value}}</template>
              <el-menu-item
                v-for="(childItem,idx) in item.children"
                :key="'child_'+idx"
                :index="index+2+'-'+idx"
                @click="()=>{$router.push('/type/'+childItem.id)}"
              >{{childItem.value}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        <div class="search-icon" @click="()=>{$router.push('/search')}">
          <i class="iconfont icon-sousuo"></i>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";

@Component({
  name: "HeaderBox",
})
export default class HeaderBox extends Vue {
  @Prop({ default: false })
  private isCeil!: boolean;
  @Prop({ default: 0 })
  private positionLeft!: number;
  // 目录数组
  private menus: Array<DashoboardModule.MenuInfo> = [];
  // menu--active
  private activeIndex: string = "";
  /**
   * menu select事件
   */
  private select(index: string, indexPath: Array<string>) {
    this.activeIndex = index;
  }

  /**
   * 封装目录数据
   */
  private async perceCatalogData() {
    const res: ApiResponse<ListResponse<
      Array<DashoboardModule.CatalogInfo>
    >> = await HttpRequest.CatalogModule.getCatalogList({ type: 1 });

    if (res && res.data) {
      res.data.data.forEach(
        async (item: DashoboardModule.CatalogInfo, index: number) => {
          const { id, code, value } = item;
          this.menus.push({
            id,
            code,
            value,
            children: [],
          });
          const response: ApiResponse<ListResponse<
            Array<DashoboardModule.CatalogInfo>
          >> = await HttpRequest.CatalogModule.getCatalogList({ pId: id });
          if (response && response.data) {
            let childmenus: Array<DashoboardModule.MenuInfo> = [];
            response.data.data.forEach(
              (childItem: DashoboardModule.CatalogInfo, idx: number) => {
                const { id, code, value } = childItem;
                childmenus.push({
                  id,
                  code,
                  value,
                  children: [],
                });
              }
            );
            this.menus[index].children = childmenus;
          }
        }
      );
    }
  }
  async created() {
    this.$nextTick(() => {
      this.perceCatalogData();
    });
  }
}
</script>
<style lang="less" scoped>
.header-wrapper {
  z-index: 999;
  padding: 0 10px;
  background: #fff;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5px !important;
    h1,
    p {
      margin: 0;
    }
    .blog-title {
      font-size: 20px;
      color: #31c27c;
      animation: titleHover 300ms linear forwards;
    }
    p {
      font-size: 13px;
    }
  }
  .menu-wrapper {
    .leave-message-item {
      display: none;
    }
    .search-icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      cursor: pointer;
      .iconfont {
        padding: 5px 10px;
        background: #31c27c;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
      }
    }
  }
}
.ceil {
  position: fixed;
  top: 0;
}

@keyframes titleHover {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-100px, 0, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(-100px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

@media screen and (max-width: 768px) {
  .header-wrapper {
    .info {
      text-align: center;
      p {
        font-size: 10px !important;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .header-wrapper {
    .info {
      text-align: left;
    }
  }
  .menu-wrapper {
    .leave-message-item {
      display: inline-block !important;
    }
    .search-icon {
      margin-left: 5px;
      .iconfont {
        padding: 2px !important;
        background: #fff !important;
        color: #333 !important;
        font-size: 12px !important;
      }
    }
  }
}
</style>
<style>
@media screen and (min-width: 1140px) {
  .el-menu--horizontal > .el-menu-item {
    height: 61px;
  }
  .el-submenu__title,
  .el-menu-item {
    padding: 0 12px;
  }
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}

@media screen and (max-width: 768px) {
  .el-submenu__title,
  .el-menu-item {
    padding: 0 12px;
  }
}

@media screen and (max-width: 576px) {
  .el-submenu__title {
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-menu--collapse .el-menu .el-submenu,
  .el-menu--popup {
    min-width: 100px;
  }
  .el-submenu__title,
  .el-menu-item {
    padding: 0 1px;
    font-size: 10px;
  }
  .el-menu--horizontal,
  .el-menu--horizontal > .el-menu-item,
  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 31px;
    line-height: 31px;
  }
}
</style>