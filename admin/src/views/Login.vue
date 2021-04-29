<template>
  <div class="container">
    <el-card header="登录" class="login">
      <el-form  label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style>
body{
  background-color: #2b4b6b;
}
.login{
  width: 500px;
  margin: 10rem auto;
}
</style>
<script>
export default {
  data() {
    return {
      model:{}
    }
  },
  methods: {
    async login(){
      let {data} = await this.$http.post('/login',this.model)
      sessionStorage.token = data
      this.$message({
        type:'success',
        message:'登陆成功'
      })
      this.$router.push('/')
    }
  },
}
</script>