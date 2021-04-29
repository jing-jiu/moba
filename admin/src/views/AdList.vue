<template>
  <div class="about">
    <h1>广告列表</h1>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <el-table-column prop="name" label="广告名称">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row)" type="warning" size="small"
            >删除</el-button>
          <el-button type="primary" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      let { data } = await this.$http.get("/rest/ads");
      this.items = data;
    },
    remove(row){
      this.$confirm(`此操作将删除广告${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$http.delete(`/rest/ads/${row._id}`)
          console.log(data);
          if(data.state === 'ok'){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetch()
          }
        });
    }
  },
};
</script>