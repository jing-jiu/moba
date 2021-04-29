<template>
  <el-container style="height: 100vh">
    <el-aside>
      <el-menu router unique-opened  :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">物品管理</template>
            <el-menu-item index="/items/create">新增物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄管理</template>
            <el-menu-item index="/heroes/create">新增英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">  
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template> 
          <el-menu-item-group>
            <template slot="title">文章管理</template>
            <el-menu-item index="/articles/create">新增文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">广告管理</template>
            <el-menu-item index="/ads/create">新增广告</el-menu-item>
            <el-menu-item index="/ads/list">广告列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">视频管理</template>
            <el-menu-item index="/videos/create">新增视频</el-menu-item>
            <el-menu-item index="/videos/list">视频列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>   
        <el-submenu index="3">   
          <template slot="title">
            <i class="el-icon-message"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员设置</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>    
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span @click="logOut" class="logOut">注销登录</span>
        <span>admin</span>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: #8495ac;
  color: #fff;
  line-height: 60px;
}
.logOut{
  cursor: pointer;
  margin: 0 10px;
}
.el-main{
  background-color: #fff;
}
.el-aside{
  background-color: white;
}
</style>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    logOut(){
      this.$router.push('/login')
      this.$message({
          type:'success',
          message:"注销成功"
      })
      sessionStorage.clear()
    }
  },
};
</script>