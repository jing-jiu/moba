<template>
  <div class="Category">
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" type="password"></el-input>
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
      title: "新建管理员",
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
          `/rest/admin_users/${this.id}`,
          this.model
        );
        console.log(data);
      } else {
        let { data } = await this.$http.post("/rest/admin_users", this.model);
        console.log(data);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: `${this.button}成功`,
      });
    },
    async fetch() {
      let { data } = await this.$http.get(`/rest/admin_users/${this.id}`);
      this.model = data;
      this.button = "修改";
    },
  },
};
</script>