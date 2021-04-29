<template>
  <div class="article px-2" v-if="header">
    <div class="d-flex ai-center pb-3 header">
      <div class="back" @click="$router.go(-1)"></div>
      <div class="flex-1 mx-2 text-title text-hidden">
        {{ header.title }}
      </div>
      <div class="text-time fs-xs">{{ header.createdAt | date }}</div>
    </div>
    <div v-html="header.body" class="w-100 body my-3"></div>
  </div>
</template>
<style lang="scss">
.article{
  width: 100%;
  .header{
    border-bottom: 1px solid #d4d4d5;
  }
  .body{
    img{
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}

</style>
<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("YYYY/MM");
    },
  },
  props: {
    id: { required: true },
  },
  data() {
    return {
      header: null,
    };
  },
  created() {
    this.feachArticle();
  },
  methods: {
    async feachArticle() {
      let { data } = await this.$http.get(`/articles/${this.id}`);
      this.header = data.id;
    },
  },
};
</script>
