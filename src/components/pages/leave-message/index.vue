<template>
  <b-container>
    <div class="leave-title">
      <b-row>
        <b-col>
          <h1>欢迎留言</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>有啥想对博主说的，尽管留言吧！</p>
          <p>各位在留言的时候请注意文明用语哦</p>
        </b-col>
      </b-row>
    </div>
    <div class="leave-input">
      <CommentInput :placeholder="placeholder" @release="releaseComment" @inputCancel="()=>{}"></CommentInput>
    </div>
    <div class="leave-message-list">
      <div class="leave-message-header">
        <i class="iconfont icon-iconsmile"></i>
        <Divider direction="vertical"></Divider>
        <span>{{pagination.total}}</span>条留言
      </div>
      <LeaveMessageItem v-for="(item,index) in leavemessages" :key="index" :LeaveMessageInfo="item"></LeaveMessageItem>
      <Button
        class="load-more"
        :loading="loading"
        @click="loadMoreData"
        v-if=" pagination.total>10 && pagination.total !==leavemessages.length"
      >加载更多>>></Button>
    </div>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CommentInput from "@/components/CommentInput.vue";
import HttpRequest from "@/assets/api/modules/index";
import { Divider, Message, Button } from "element-ui";
import LeaveMessageItem from "@/components/LeaveMessageItem.vue";

Vue.prototype.$message = Message;

@Component({
  name: "LeaveMessageModule",
  components: {
    Divider,
    Button,
    CommentInput,
    LeaveMessageItem
  }
})
export default class LeaveMessageModule extends Vue {
  private loading: boolean = false;

  private placeholder: string = "请输入您的留言吧";

  private leavemessages: Array<LeaveMessageInfo> = [];

  // 留言作者
  private author: DashoboardModule.UserInfo = {};

  // 分页
  private pagination: PaginationInfo = {
    page: 1,
    total: 0,
    limit: 100
  };
  // 登录回调
  private handleUserInfoGet() {
    this.author = {
      user_id: localStorage.getItem("blog_user_id") || "",
      name: localStorage.getItem("blog_name") || "",
      avatar_url: localStorage.getItem("blog_avatar_url") || "",
      location: localStorage.getItem("blog_location") || ""
    };
  }
  // 留言
  private async releaseComment(content: string) {
    if (
      !localStorage.getItem("blog_user_id") ||
      !localStorage.getItem("blog_name") ||
      !localStorage.getItem("blog_avatar_url") ||
      !localStorage.getItem("blog_location")
    ) {
      window.eventBus.$emit("blogEventHandle", {
        type: "user-login-show",
        data: true
      });
      return;
    }
    this.handleUserInfoGet();
    const { author } = this;
    const res: ApiResponse<boolean> = await HttpRequest.CommentModule.getLeaveMessageCreate(
      { author: JSON.stringify(author), content }
    );

    if (res && res.data) {
      this.$message.success("留言成功!后台会尽快审核");
    }
  }

  // 请求列表
  private async getLeaveMessageList() {
    const { page } = this.pagination;
    const res: ApiResponse<ListResponse<
      LeaveMessageInfo[]
    >> = await HttpRequest.CommentModule.getLeaveMessageList({
      page,
      is_shelves: 1
    });
    if (res && res.data) {
      const total: number = res.data.total;
      const list: Array<LeaveMessageInfo> = res.data.data;

      this.pagination.total = total;
      this.leavemessages = [...this.leavemessages, ...list];
      this.loading = false;
    }
  }

  // 加载更多
  private loadMoreData() {
    this.loading = true;
    const { total } = this.pagination;
    const { leavemessages } = this;
    if (total > leavemessages.length) {
      this.pagination.page += 1;
      this.getLeaveMessageList();
    }
  }

  mounted() {
    this.author = {
      user_id: localStorage.getItem("blog_user_id") || "",
      name: localStorage.getItem("blog_name") || "",
      avatar_url: localStorage.getItem("blog_avatar_url") || "",
      location: localStorage.getItem("blog_location") || ""
    };
    this.$nextTick(() => {
      this.getLeaveMessageList();
    });
  }
}
</script>
<style lang="less" scoped>
.leave-title {
  padding: 15px;
  background: #fff;
  border-radius: 5px;
  h1 {
    font-size: 28px;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
}
.leave-input {
  padding: 15px 0;
}
.leave-message-list {
  background: #fff;
  padding-bottom: 5px;
  .leave-message-header {
    border-bottom: 1px solid #eee;
    margin: 0 10px;
    padding: 5px;
  }
  .load-more {
    width: 100%;
    margin-top: 15px;
  }
}
</style>