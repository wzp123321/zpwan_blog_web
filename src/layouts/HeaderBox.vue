<template>
  <b-container :class="[{'ceil': isCeil}, 'header-wrapper']" :style="`left:${positionLeft}px`">
    <b-row>
      <b-col xl="3" md="3" cols="11" offset-xl="0" offset-md="0" offset="0" class="info">
        <h1 @click="()=>{$router.push('/')}">万直鹏的博客</h1>
        <p>仰天大笑出门去，我辈岂是蓬蒿人</p>
      </b-col>
      <b-col
        xl="6"
        offset-xl="3"
        md="9"
        offset-md="0"
        cols="11"
        offset="0"
        class="menu-wrapper flex-row"
      >
        <Menu
          class="el-menu-demo"
          mode="horizontal"
          @select="select"
          active-text-color="#31c27c"
          :default-active="activeIndex"
        >
          <MenuItem index="1" @click="()=>{$router.push('/')}">首页</MenuItem>
          <MenuItem
            index="2"
            @click="()=>{$router.push('/leave_message')}"
            class="leave-message-item"
          >留言板</MenuItem>
          <template v-for="(item,index) in menus">
            <Submenu :index="index+3+''" :key="'menu_'+index">
              <template slot="title">{{item.value}}</template>
              <MenuItem
                v-for="(childItem,idx) in item.children"
                :key="'child_'+idx"
                :index="index+2+'-'+idx"
                @click="()=>{$router.push('/type/'+childItem.id)}"
              >{{childItem.value}}</MenuItem>
            </Submenu>
          </template>
        </Menu>
        <div class="search-icon" @click="()=>{$router.push('/search')}">
          <i class="iconfont icon-sousuo"></i>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Menu, MenuItem, Submenu } from "element-ui";
import HttpRequest from "@/assets/api/modules/index";

@Component({
  name: "HeaderBox",
  components: {
    Menu,
    MenuItem,
    Submenu
  }
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
            children: []
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
                  children: []
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
    h1 {
      font-size: 20px;
      color: #31c27c;
    }
    h1:hover {
      animation: titleHover 200ms linear infinite forwards;
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
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0);
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
    padding: 0 3px;
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