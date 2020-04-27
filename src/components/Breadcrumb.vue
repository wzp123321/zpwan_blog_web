<template>
  <b-container class="breadcrumb-wrapper">
    <b-row>
      <b-col>
        <el-breadcrumb separator="/" style="margin-left:10px">
          <el-breadcrumb-item v-for="(routeItem,index) in routers" :key="'route_'+index">
            <router-link :to="routeItem.path">{{ routeItem.meta.name }}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Breadcrumb, BreadcrumbItem } from "element-ui";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "BreadcrumbModule",
  components: {
    "el-breadcrumb": Breadcrumb,
    "el-breadcrumb-item": BreadcrumbItem
  }
})
export default class BreadcrumbModule extends Vue {
  private routers: Array<{ [key: string]: any }> = [];
  /**
   * 生成面包屑
   */
  private async handleBreabcrumb() {
    this.routers = this.$route.matched.filter(item => item.meta.name);
    // 修改首页path
    if (this.routers[0].path === "") {
      this.routers[0].path = "/";
    }
    // 修改目录的meta -name
    if (this.routers[1].path.includes("/type")) {
      this.routers[1].path = this.$route.path;
      const id = this.$route.params.type;
      const res: ApiResponse<any> = await HttpRequest.CatalogModule.getCatalogInfoById(
        { id }
      );
      if (res && res.data) {
        this.routers[1].meta.name = res.data.value;
      }
    }
    // 详情页
    if (this.routers[1].path.includes("/article")) {
      this.routers[1].path = this.$route.path;
    }
  }

  created() {
    this.handleBreabcrumb();
  }
  /**
   * 监听路有变化
   */
  @Watch("$route")
  handleRouteChange(newVal: RouteInfo, oldVal: RouteInfo) {
    this.handleBreabcrumb();
  }
}
</script>
<style lang="less" scoped>
.breadcrumb-wrapper {
  margin-top: 10px;
  padding: 10px 0;
  border-radius: 3px;
  background: #fff;
}
</style>