<template>
  <M-card :icon="icon" :title="title">
    <slot name="banner"></slot>
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{ active: active === i }"
        v-for="(category, i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)">
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper
        ref="list"
        :options="{ autoHeight: true }"
        @slide-change="() => (active = $refs.list.swiper.realIndex)">
        <swiper-slide v-for="(category, index) in categories" :key="index">
          <slot name="items" :category="category" :index="index"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </M-card>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>