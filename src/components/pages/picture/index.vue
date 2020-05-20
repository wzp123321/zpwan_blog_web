<template>
  <div>
    <b-container class="picture-wrapper">
      <b-row>
        <b-col style="text-align:right;margin:10px">
          <el-button type="primary" @click="handleUserUploadOpen">我要上传</el-button>
        </b-col>
      </b-row>
      <div>111</div>
    </b-container>
    <el-dialog title="图片上传" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-upload
        class="upload-demo"
        :limit="6"
        :multiple="true"
        action="http://localhost:9898/blogManage/filemodule/web/upload"
        :on-remove="handleRemove"
        :on-success="handleUploadSuccess"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-button type="primary" v-show="urls.length!==0" class="submitbtn">提交</el-button>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Upload, Dialog, Button } from "element-ui";
@Component({
  name: "PictureModule",
  components: {
    "el-upload": Upload,
    "el-dialog": Dialog,
    "el-button": Button
  }
})
export default class PictureModule extends Vue {
  private dialogVisible: boolean = false;

  private urls: string[] = [];

  private fileList: any = [];

  private handleUserUploadOpen() {
    this.dialogVisible = true;
  }
  private handleClose() {
    this.dialogVisible = false;
  }

  private handleRemove(file: any, fileList: any) {
    this.urls = this.urls.filter(item => {
      return item !== file.response.data.url;
    });
  }
  private handleUploadSuccess(response: any, file: File, fileList: File[]) {
    this.urls.push(response.data.url);
  }
}
</script>
<style lang="less" scoped>
.picture-wrapper {
  position: relative;
  width: 100%;
  background: #fff;
}
.submitbtn {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
</style>