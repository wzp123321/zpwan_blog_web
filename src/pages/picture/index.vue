<template>
  <!-- https://liuxiaodeng.github.io/handle/image-layout.html -->
  <div>
    <b-container class="picture-wrapper">
      <b-row class="picture-header">
        <b-col class="frspace" style="margin:0.2rem 1rem">
          <el-button type="primary" @click="handleUserUploadOpen">我要上传</el-button>
          <div class="date-switch" v-if="dataList.length>0">
            按日期展示
            <el-switch v-model="isShowByDate" @change="handleSwitchChange"></el-switch>
          </div>
        </b-col>
      </b-row>
      <el-divider></el-divider>
      <div class="picture-list" v-if="JSON.stringify(dataList) ==='{}'">
        <div class="show-date" v-if="isShowByDate">
          <div v-for="(value,key,index) in dataList" :key="index">
            <el-divider class="date">{{key}}</el-divider>
            <div class="img-list">
              <img v-for="(item,imgIndex) in value" :key="imgIndex" :src="item" alt />
            </div>
          </div>
        </div>
        <div class="v-waterfall-content" v-else>
          <div v-for="(item,index) in pictureList" :key="index" class="v-waterfall-item">
            <img :src="item.picture_url" alt />
          </div>
        </div>
      </div>
      <div v-else class="no-data">
        <img src="../../assets/imgs/no-article.png" alt />
        <p>暂时还没有图片哦，期待你的上传！</p>
      </div>
    </b-container>
    <el-dialog
      :width="dislogWidth"
      title="图片上传"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-upload
        class="upload-demo"
        :limit="6"
        :multiple="true"
        :action="action"
        :on-remove="handleRemove"
        :on-success="handleUploadSuccess"
        :on-change="handleFileChange"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-button
        type="primary"
        v-show="urls.length!==0"
        class="submitbtn"
        @click="handlePictureBathUpload"
      >提交</el-button>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { compressImage } from "@/utils/compress";
const env = process.env.NODE_ENV;
@Component({
  name: "PictureModule",
})
export default class PictureModule extends Vue {
  private action: string = ""; // 图片上传路径
  private dislogWidth: string = "30%"; // 对话框宽度
  private isShowByDate: boolean = false; // 是否按照日期分组
  private dialogVisible: boolean = false; // 打开对话框开关
  private urls: string[] = []; // 上传的图片路径拼接字符串
  private fileList: any = []; // 图片文件数组
  private pictureList: PictureInfo[] = []; // 图片数组
  private dataList: { [init_date: string]: string[] } = {}; // 封装后的数据
  private startDate: number = new Date("2020-05-01").getTime(); //初始时间戳 目前是按照五一算的
  private endDate: number = new Date().getTime(); //结束时间戳
  private pagination: PaginationInfo = {
    page: 1,
    total: 0,
  }; //分页
  // 开关
  private handleSwitchChange(value: boolean) {
    this.isShowByDate = value;
  }
  // 打开对话框
  private handleUserUploadOpen() {
    this.dialogVisible = true;
  }
  // 关闭对话框
  private handleClose() {
    this.dialogVisible = false;
  }

  // 选择图片回调
  private handleFileChange(file: File, fileList: any) {
    let newFileList = fileList;
    newFileList.forEach(async (item: any, index: number) => {
      if (item.size > 1 * 1024 * 1024) {
        let newFile = await compressImage(item);
        newFileList[index] = newFile;
      }
    });
    this.fileList = newFileList;
  }

  // 移除上传的图片
  private handleRemove(file: any, fileList: any) {
    this.urls = this.urls.filter((item) => {
      return item !== file.response.data.url;
    });
  }

  // 上传成功回调
  private handleUploadSuccess(response: any, file: File, fileList: File[]) {
    this.urls.push(response.data.url);
  }

  // 请求图片列表
  private async getPictureList(
    page: number,
    startDate: number,
    endDate: number
  ) {
    const res: ApiResponse<ListResponse<
      PictureInfo[]
    >> = await HttpRequest.PictureModule.getPictureList({
      startDate,
      endDate,
      page,
      limit: 10,
    });

    if (res && res.data) {
      const total = res.data.total;
      const list = res.data.data;
      this.pagination.total = total;
      this.pictureList = [...this.pictureList, ...list];
      this.dataList = this.getDataListCalculate(this.pictureList);
      // 如果下一页还有数据----拿到本次请求最后一条数据的时间 将时间戳置为当前的0时0分0秒 再次请求数据页码加1
      if (res.data.hasNext) {
        const timestamp =
          this.pictureList[this.pictureList.length - 1].create_time || 0;
        let date = new Date(timestamp).setHours(0, 0, 0, 0);
        this.getPictureList(this.pagination.page + 1, date, this.endDate);
      }
    }
  }
  /**
   * 封装数据
   * 按照日期进行分组
   */
  getDataListCalculate(list: PictureInfo[]) {
    let newData: { [init_date: string]: string[] } = {};
    list.forEach((item) => {
      newData[item.init_date] = [
        ...(newData[item.init_date] || []),
        ...[item.picture_url],
      ];
    });
    return newData;
  }
  // 新增图片
  private async handlePictureBathUpload() {
    const { startDate } = this;
    const urls = this.urls.join(",");
    const res: ApiResponse<boolean> = await HttpRequest.PictureModule.getPictureBathCreate(
      { urls }
    );
    if (res && res.data) {
      this.$message.success("新增成功");
      this.dialogVisible = false;
      this.getPictureList(
        this.pagination.page,
        startDate,
        new Date().getTime()
      );
    }
  }

  mounted() {
    this.action =
      env === "production"
        ? "https://server.zpwan-yz.com/blogManage/filemodule/web/upload"
        : "http://localhost:9898/blogManage/filemodule/web/upload";
    this.dislogWidth =
      document.documentElement.clientWidth > 500 ? "30%" : "80%";
    this.$nextTick(() => {
      const { startDate, endDate } = this;
      this.getPictureList(this.pagination.page, startDate, endDate);
    });
  }

  @Watch("dialogVisible")
  private handleModalClose(newVal: boolean, oldVal: boolean) {
    if (!newVal) {
      this.urls = [];
      this.fileList = [];
      this.dataList = {};
      this.pictureList = [];
    }
  }
}
</script>
<style lang="less" scoped>
.picture-wrapper {
  position: relative;
  width: 100%;
  background: #fff;
  padding-bottom: 3.3rem;

  .picture-header {
    padding-top: 0.875rem;
    .el-button {
      height: 1.575rem;
      line-height: 0.575rem;
      font-size: 0.675rem;
      padding: 0.3125rem 0.625rem;
    }
    .date-switch {
      font-size: 0.9125rem;
      line-height: 2.5rem;
      .el-switch {
        position: relative;
        top: -1px;
      }
    }
  }

  ::v-deep .el-divider--horizontal {
    margin: 14px 0;
  }

  .picture-list {
    position: relative;
    padding: 0 1rem;
    .show-date {
      margin-bottom: 1.25rem;
      .date {
        text-align: center;
        font-family: monospace;
        font-size: 1.25rem;
        color: #333;
      }
      .img-list {
        column-count: 5;
        column-gap: 0.625rem;
      }
    }
    // 不按日期展示
    .v-waterfall-content {
      column-count: 5;
      column-gap: 0.625rem;
    }
    // 图片
    img {
      cursor: pointer;
      margin-bottom: 0.625rem;
      display: block;
      width: 100%;
      border-radius: 4px;
    }
    img:hover {
      transform: scale(1.05);
      transition: 500ms all;
    }
  }
  .no-data {
    width: 100%;
    text-align: center;
    padding-bottom: 3.125rem;
    font-size: 0.8rem;
    img {
      width: 15.5rem;
      height: 15.5rem;
      margin: 0 auto;
    }
  }
}
.submitbtn {
  width: 100%;
  margin-top: 0.625rem;
  text-align: center;
}

@media screen and (max-width: 500px) {
  // 不按日期展示
  .v-waterfall-content {
    column-count: 2 !important;
    column-gap: 0.875rem !important;
  }
  .el-button {
    height: 4.875rem !important;
    line-height: 1.875rem !important;
    font-size: 0.875rem !important;
    padding: 0.9375rem !important;
  }
  .el-switch {
    width: 30px !important;
    height: 15px !important;
    line-height: 15px !important;
  }
  .el-switch__core {
    height: 14px !important;
  }
  .el-switch__core::after {
    width: 10px !important;
    height: 10px !important;
  }
}
</style>