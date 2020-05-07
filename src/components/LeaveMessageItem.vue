<template>
  <div class="leave-message-wrapper">
    <div class="header flex-row">
      <i v-if="LeaveMessageInfo.is_good===1" class="iconfont icon-jingpin"></i>
      <img :src="LeaveMessageInfo.author.avatar_url" alt />
      <div class="flex-column">
        <div class="leave-item-uname">{{LeaveMessageInfo.author.name}}</div>
        <div class="leave-item-info">
          <i class="iconfont icon-rili"></i>
          <span>{{format(LeaveMessageInfo.create_time)}}</span>
          <i class="iconfont icon-xingzhuanggongnengtubiao-"></i>
          <span>{{LeaveMessageInfo.author.location}}</span>
        </div>
      </div>
    </div>
    <div class="content">{{LeaveMessageInfo.content}}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { formatDate } from "@/utils/index";
@Component({
  name: "LeaveMessageItem"
})
export default class LeaveMessageItem extends Vue {
  @Prop({ default: {} })
  private LeaveMessageInfo!: LeaveMessageInfo;

  private format(time: number) {
    return formatDate(time);
  }
}
</script>
<style lang="less" scoped>
.leave-message-wrapper {
  background: #fff;
  padding: 5px;
  .header {
    position: relative;
    padding: 5px;
    border-bottom: 1px dotted #eee;
    .icon-jingpin {
      display: inline-block;
      color: #FBBF08;
      position: absolute;
      top: -3px;
      left: 6px;
      transform: rotate(-45deg);
    }
    img {
      width: 42px;
      height: 42px;
      border-radius: 30px;
    }
    div {
      .leave-item-uname {
        font-size: 20px;
        line-height: 22px;
        font-weight: bold;
        color: #31c27c;
      }
      .leave-item-info {
        font-size: 13px;
        color: #999;
        .iconfont {
          font-size: 13px;
        }
        span {
          display: inline-block;
          margin-right: 15px;
        }
      }
    }
  }
  .content {
    font-size: 14px;
    color: #666;
    padding: 10px 5px;
    box-shadow: 3px 3px 3px #ebf1ed;
  }
}
</style>