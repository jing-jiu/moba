import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/articles/:id',
        name: 'Article',
        component: Article,
        props:true
      }
    ]
  },
  {
    path: '/heroes/:id',
    name: 'Hero',
    component: Hero,
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
