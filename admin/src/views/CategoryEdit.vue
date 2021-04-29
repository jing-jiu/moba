<template>
  <div class="Category">
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="父级分类">
        <el-select v-model="model.parent" placeholder="请选择父级分类">
          <el-option
            v-for="item in this.parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
.el-button{
  transform: translateX(-50%);
}
</style>
<script>
export default {
  data() {
    return {
      model: {},
      title: "新建分类",
      button: "保存",
      parents: [],
    };
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      if (this.id) {
        let { data } = await this.$http.put(
          `/rest/categories/${this.id}`,
          this.model
        );
        console.log(data);
      } else {
        let { data } = await this.$http.post("/rest/categories", this.model);
        console.log(data);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: `${this.button}成功`,
      });
    },
    async fetch() {
      let { data } = await this.$http.get(`/rest/categories/${this.id}`);
      this.model = data;
      this.button = "修改";
    },
    async fetchParents() {
      let { data } = await this.$http.get(`/rest/categories`);
      this.parents = data;
      this.button = "添加子分类";
    },
  },
};
</script>