<template>
  <div class="Main">
     <div class="topbar bg-black d-flex ai-center px-3 py-1">
       <img src="../assets/logo_game.png" height="30">
       <div class="px-2 flex-1">
         <div class="text-white">王者荣耀</div>
         <div class="text-dark-2 fs-xss">团队成就更多</div>
       </div>
       <button type="button" class="btn bg-primary">立即下载</button>
     </div>
     <div class="bg-primary py-2x">
       <div class="nav nav-inverse jc-around">
         <div class="nav-item active">
           <router-link tag="div" to="/">首页</router-link>
         </div>
         <div class="nav-item">
           <router-link tag="div" to="/gonglue">攻略中心</router-link>
         </div>
         <div class="nav-item">
           <router-link tag="div" to="/saishi">赛事中心</router-link>
         </div>
         <div class="nav-item">
           <router-link tag="div" to="/newgame">IP新游</router-link>
         </div>
       </div>
     </div>
     <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.topbar{
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>

<script>
export default {
  
}
</script>