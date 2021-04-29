<template>
  <div class="Item">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <!-- <el-form-item label="父级分类">
        <el-select v-model="model.parent" placeholder="请选择父级分类">
          <el-option
            v-for="item in this.parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL + '/upload'"
        :show-file-list="false"
        :on-success="success"
        :before-upload="before"
        :headers="getAuthor()"
        >
        <img v-if="model.icon" :src="model.icon" class="avatar"/>
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
export default {
  data() {
    return {
      model: {},
      title: "新增物品",
      button: "保存",
    };
  },
  created() {
    this.id && this.fetch();
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      if (this.id) {
        let { data } = await this.$http.put(
          `/rest/items/${this.id}`,
          this.model
        );
        console.log(data);
      } else {
        let { data } = await this.$http.post("/rest/items", this.model);
        console.log(data);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: `${this.button}成功`,
      });
    },
    async fetch() {
      let { data } = await this.$http.get(`/rest/items/${this.id}`);
      this.model = data;
      this.button = "修改";
    },
    success(res) {
      this.$nextTick(()=>{
        this.$set(this.model,'icon',res.url)
      })
    },
    before() {
    },
  },
};
</script>