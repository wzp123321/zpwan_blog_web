<template>
  <div class="user-info" v-if="blog_user_avatar!=='' && blog_user_name!==''">
    <img :src="blog_user_avatar" alt />
    <div>{{blog_user_name}}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "UserInfo"
})
export default class UserInfo extends Vue {
  @Prop({ default: "" })
  private blog_user_avatar!: string;
  @Prop({ default: "" })
  private blog_user_name!: string;
}
</script>
<style lang="less" scoped>
.user-info {
  cursor: pointer;
  position: fixed;
  top: 120px;
  right: 10px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    font-size: 10px;
    font-family: sans-serif;
    color: #fff;
    position: absolute;
    top: 37px;
    right: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.user-info:hover img {
  animation: user_avatar_rorate 1s infinite linear forwards;
}
@keyframes user_avatar_rorate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 500px) {
  .user-info {
    z-index: 999;
    top: 60px;
    right: 5px;
    img {
      width: 42px;
      height: 42px;
    }
    div {
      font-size: 10px;
      top: 26px;
      right: 16px;
    }
  }
}
</style>