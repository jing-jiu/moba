import Vue from 'vue'
import App from './App.vue'

import'./css/global.scss'
import router from './router'
import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'
import axios from "axios"

let http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  //baseURL:'http://localhost:3000/web/api'
})
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.component('M-card',Card)
Vue.component('M-listCard',ListCard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
