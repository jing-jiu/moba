<template>
  <div>
    <Swiper v-if="list.length > 0" interval="3000">
      <Slide v-for="(item, index) in list" :key="index">
        <img :src="item.url" class="w-100" />
      </Slide>
    </Swiper>
    <div class="nav-icons bg-white mt-3 text-center pt-3">
      <div class="d-flex flex-wrap" v-if="flag">
        <a
          class="nav-item mb-3 block"
          v-for="(item, index) in Aicons"
          :key="index" :href="item.router">
          <i :class="item.icon"></i>
          <div class="py-2">{{ item.name }}</div>
        </a>
      </div>
      <div class="d-flex flex-wrap" v-else>
        <a
          class="nav-item mb-3 block"
          v-for="(item, index) in Bicons"
          :key="index" :href="item.router">
          <i :class="item.icon"></i>
          <div class="py-2">{{ item.name }}</div>
        </a>
      </div>
      <div class="bg-light py-2 fs-xm">
        <i :class="click.icon"></i>
        <span @click="fold">{{ click.des }}</span>
      </div>
    </div>
    <M-listCard title="新闻资讯" icon="sprite sprite-news-1" :categories="newCates">
      <template #items="{category,index}">
        <router-link class="py-2 fs-md d-flex" v-for="(news,i) in category.newsList" :key="i" tag="div" :to="`/articles/${news._id}`">
          <div class="mr-2" :class="colors[index]">[{{news.categoryName}}]</div>
          <div class="flex-1 text-hidden mr-2">{{news.title}}</div>
          <div>{{news.updatedAt | date}}</div>
        </router-link>
      </template>
    </M-listCard>
    <M-listCard title="英雄列表" icon="sprite sprite-hero" :categories="heroCates">
      <template #banner>
        <div class="banner">
          <img src="../assets/hero.jpg" class="w-100">
        </div>
      </template>
      <template #items="{category}">
        <div class="d-flex flex-wrap">
          <router-link class="py-2 fs-md px-1 text-center" v-for="(hero,i) in category.heroList" :key="i" style="width:20%" :to="`/heroes/${hero._id}`" tag="div">
            <img :src="hero.avatar"  class="w-100">
            <span >{{hero.name}}</span>
          </router-link>
        </div>
      </template>
    </M-listCard>
    <M-listCard title="精彩视频" icon="sprite sprite-video" :categories="videoCates">
      <template #items="{category}">
        <div class="d-flex flex-wrap">
          <a class="py-2 fs-md px-1 text-center block" v-for="(video,i) in category.videoList" :key="i" style="width:50%" tag="div" :href="video.url">
            <img :src="video.image" class="w-100">
            <span class="text-hidden w-100">{{video.name}}</span>
          </a>
        </div>
      </template>
    </M-listCard>
    <div></div>
  </div>
</template>
<style lang="scss" scope>
@import "../css/global";
.wh_indicator {
  text-align: right;
  .wh_indicator_item {
    border-radius: 0%;
    background: white;
    &.wh_show_bgcolor {
      background: #4867af;
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border: none;
    }
  }
}
</style>

<script>
import { Swiper, Slide } from "vue-swiper-component";
import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  components: {
    Swiper,
    Slide,
  },
  data() {
    return {
      list: [
        {
          url:
            "http://ossweb-img.qq.com/upload/adw/image/194/20210423/ed4f0a315b1c2d68002b609f00e76717.jpeg",
        },
        {
          url:
            "http://ossweb-img.qq.com/upload/adw/image/194/20210420/5449cb0ee1ac08eddd5c9db7770b09f6.jpeg",
        },
        {
          url:
            "http://ossweb-img.qq.com/upload/adw/image/194/20210422/6fb45960f3578bdaf4daaf75c32cd0d2.jpeg",
        },
      ],
      Bicons: [
        {
          icon: "sprite sprite-news",
          name: "爆料站",
          router: "https://pvp.qq.com/ingame/all/tobe/home/index.shtml",
        },
        {
          icon: "sprite sprite-story",
          name: "故事站",
          router: "https://pvp.qq.com/story201904/index.html#/index",
        },
        {
          icon: "sprite sprite-shop",
          name: "周边商城",
          router: "https://pvp.qq.com/mall/m/?biz=yxzj#/",
        },
        {
          icon: "sprite sprite-try",
          name: "体验服",
          router: "https://pvp.qq.com/cp/a20161116tyf/page01.htm",
        },
        {
          icon: "sprite sprite-new",
          name: "新人专区",
          router: "https://pvp.qq.com/m/m201606/goCenter.shtml",
        },
        {
          icon: "sprite sprite-honor",
          name: "荣耀·传承",
          router: "https://pvp.qq.com/m/memory/index.shtml",
        },
        {
          icon: "sprite sprite-camp",
          name: "王者营地",
          router: "/camp",
        },
        {
          icon: "sprite sprite-chat",
          name: "公众号",
          router: "/chat",
        },
        {
          icon: "sprite sprite-edition",
          name: "版本介绍",
          router: "https://pvp.qq.com/cp/a20190320bbgxsmm/index.html",
        },
        {
          icon: "sprite sprite-news",
          name: "对局环境",
          router: "https://pvp.qq.com/cp/a20190917station/index.html",
        },
        {
          icon: "sprite sprite-new",
          name: "无限王者团",
          router: "https://pvp.qq.com/cp/a20190827boundlessp/index.html",
        },
        {
          icon: "sprite sprite-try",
          name: "创意互动营",
          router: "https://pvp.qq.com/m/hdy/p1/index.html",
        },
      ],
      Aicons: [
        {
          icon: "sprite sprite-news",
          name: "爆料站",
          router: "https://pvp.qq.com/ingame/all/tobe/home/index.shtml",
        },
        {
          icon: "sprite sprite-story",
          name: "故事站",
          router: "https://pvp.qq.com/story201904/index.html#/index",
        },
        {
          icon: "sprite sprite-shop",
          name: "周边商城",
          router: "https://pvp.qq.com/mall/m/?biz=yxzj#/",
        },
        {
          icon: "sprite sprite-try",
          name: "体验服",
          router: "https://pvp.qq.com/cp/a20161116tyf/page01.htm",
        },
      ],
      flag: true,
      click: {
        icon: "sprite sprite-arrow-up",
        des: "展开",
      },
      newCates:[],
      heroCates:[],
      videoCates:[],
      colors:[
        'text-hot',
        'text-news',
        'text-hot',
        'text-active',
        'text-match',
      ]
    };
  },
  created() {
    this.feachNews()
    this.feachHero()
    this.feachVideo()
  },
  methods: {
    fold() {
      if (this.flag) {
        this.click.des = "收起";
        this.flag = false;
      } else {
        this.click.des = "展开";
        this.flag = true;
      }
    },
    async feachNews(){
      let {data} = await this.$http.get('/news/list')
      this.newCates = data
    },
    async feachHero(){
      let {data} = await this.$http.get('/hero/list')
      this.heroCates = data
    },
    async feachVideo(){
      let {data} = await this.$http.get('/video/list')
      this.videoCates = data
    },
  },
};
</script>