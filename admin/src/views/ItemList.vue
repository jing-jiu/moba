<template>
  <div class="about">
    <h1>物品列表</h1>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <!-- <el-table-column prop="parent.name" label="父级分类" width="120">
      </el-table-column> -->
      <el-table-column prop="name" label="物品名称" width="120">
      </el-table-column>
      <el-table-column prop="icon" label="物品图标" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="width:5em">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row)" type="warning" size="small"
            >删除</el-button>
          <el-button type="primary" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
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
      let { data } = await this.$http.get("/rest/items");
      this.items = data;
    },
    remove(row){
      this.$confirm(`此操作将删除物品${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$http.delete(`/rest/items/${row._id}`)
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