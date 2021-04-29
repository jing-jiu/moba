<template>
  <div class="Item">
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="100px" @submit.native.prevent="save" label-position="left">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})" style="  margin-bottom:2rem;"><i class="el-icon-plus"></i>添加广告</el-button>
          <el-row>
            <el-col v-for="(item, i) in model.items" :key="i">
              <el-form-item label="跳转链接">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top:1rem;">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item,'image',res.url)"
                  :before-upload="before"
                  :headers="getAuthor()"
                  >
                    <img v-if="item.image" :src="item.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                  <el-button type="danger" @click="model.items.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
        items:[]
      },
      title: "新增广告",
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
          `/rest/ads/${this.id}`,
          this.model
        );
        console.log(data);
      } else {
        let { data } = await this.$http.post("/rest/ads", this.model);
        console.log(data);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: `${this.button}成功`,
      });
    },
    async fetch() {
      let { data } = await this.$http.get(`/rest/ads/${this.id}`);
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