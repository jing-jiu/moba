<template>
  <div>
    <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex ai-center pb-2x">
        <i :class="icon"></i>
        <div class="flex-1 px-2 fs-xl"> {{ title }} </div>
        <i class="sprite sprite-menu"></i>
      </div>
      <div class="card-body pt-1">
          <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../css/global';

.card{
  border-bottom: 1px solid $border-color;
  .card-header{
      border-bottom: 1px solid $border-color;
  }
}
</style>

<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
    }
}
</script>