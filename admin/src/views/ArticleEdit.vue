<template>
  <div class="Item">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="文章分类">
        <el-select v-model="model.categories" placeholder="请选择文章分类" multiple>
          <el-option
            v-for="item in this.categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章正文">
        <vue-editor id="editor" v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"> </vue-editor>
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
  transform: translateX(-55%);
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
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      title: "新增文章",
      button: "保存",
      categories:[]
    };
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      if (this.id) {
        let { data } = await this.$http.put(
          `/rest/articles/${this.id}`,
          this.model
        );
        console.log(data);
      } else {
        let { data } = await this.$http.post("/rest/articles", this.model);
        console.log(data);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: `${this.button}成功`,
      });
    },
    async fetch() {
      let { data } = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = data;
      this.button = "修改";
    },
    async fetchCategories() {
      let { data } = await this.$http.get(`/rest/categories`);
      this.categories = data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      let {data} = await this.$http.post('/upload',formData)
      Editor.insertEmbed(cursorLocation, "image", data.url);
      resetUploader();
    }
  },
};
</script>