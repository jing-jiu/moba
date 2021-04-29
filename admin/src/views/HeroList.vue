<template>
  <div class="about">
    <h1>英雄列表</h1>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <!-- <el-table-column prop="parent.name" label="父级分类">
      </el-table-column> -->
      <el-table-column prop="name" label="英雄名称">
      </el-table-column>
      <el-table-column prop="title" label="英雄称号">
      </el-table-column>
      <!-- <el-table-column prop="categories" label="英雄分类">
      </el-table-column>
      <el-table-column prop="item1" label="顺风出装">
      </el-table-column>
      <el-table-column prop="item2" label="逆风出装">
      </el-table-column> -->
      <el-table-column prop="avatar" label="英雄图标" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width:5em">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row)" type="warning" size="small"
            >删除</el-button>
          <el-button type="primary" size="small" @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
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
      let { data } = await this.$http.get("/rest/heroes",{params:{size:15}});
      this.items = data;
    },
    remove(row){
      this.$confirm(`此操作将删除英雄${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$http.delete(`/rest/heroes/${row._id}`)
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