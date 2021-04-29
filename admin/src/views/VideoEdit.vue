<template>
  <div class="Item">
    <h1>{{ id ? "编辑" : "新建" }}视频</h1>
    <el-form label-width="100px" @submit.native.prevent="save" label-position="left">
      <el-form-item label="视频分类">
        <el-select v-model="model.categories" placeholder="请选择视频分类" multiple>
          <el-option
            v-for="item in this.categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接">
        <el-input v-model="model.url"></el-input>
      </el-form-item>
      <el-form-item label="图片" style="margin-top:1rem;">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="res => $set(model,'image',res.url)"
          :before-upload="before"
          :headers="getAuthor()">
            <img v-if="model.image" :src="model.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{ button }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.el-form {
  width: 900px;
  margin: 0 auto;
}
h1 {
  display: inline-block;
  transform: translateX(20%);
}
.el-button {
  margin: 0 auto;
}
.avatar{
  width: 178px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  transform: translateX(10%);
  border: 1px dashed rgb(158, 156, 156);
  margin-bottom: 30px;
  text-align: center;
}
.avatar-uploader-icon:hover{
  border: 1px dashed rgb(1, 183, 255);
}
</style>
<script>
export default {
  data() {
    return {
      model: {
      },
      title: "新增视频",
      button: "保存",
      categories:[],
    };
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories()
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(
          `/rest/videos/${this.id}`,
          this.model
        );
      } else {
        await this.$http.post("/rest/videos", this.model);
      }
      this.$router.push("/videos/list");
      this.$message({
        type: "success",
        message: `${this.button}成功`,
      });
    },
    async fetch() {
      let { data } = await this.$http.get(`/rest/videos/${this.id}`);
      this.model = data;
      this.button = "修改";
    },
    before() {
    },
    async fetchCategories() {
      let { data } = await this.$http.get(`/rest/categories`);
      this.categories = data;
    },
  },
};
</script>