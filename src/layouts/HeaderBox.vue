<template>
  <div :class="[{'ceil': isCeil}, 'header-wrapper']">
    <div class="boxW frspace">
      <div class="info">
        <h1>万直鹏的博客</h1>
        <p>仰天大笑出门去，我辈岂是蓬蒿人</p>
      </div>
      <div class="menu flex-row">
        <Menu
          class="el-menu-demo"
          mode="horizontal"
          @select="select"
          active-text-color="#31c27c"
          :default-active="activeIndex"
        >
          <MenuItem index="1" @click="()=>{$router.push('/')}">首页</MenuItem>
          <template v-for="(item,index) in menus">
            <Submenu :index="index+2+''" :key="'menu_'+index">
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
      </div>
    </div>
  </div>
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
  height: 62px;
  width: 100%;
  background: #fff;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  .menu {
    .search-icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20px;
      cursor: pointer;
      .iconfont {
        padding: 10px;
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
      p {
        font-size: 10px !important;
      }
    }
  }
}
</style>