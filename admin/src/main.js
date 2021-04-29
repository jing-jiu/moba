import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from "axios"

let http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    //baseURL:'http://localhost:3000/admin/api'
})
http.interceptors.request.use((config)=>{
  if(sessionStorage.token){
    config.headers.Authorization = sessionStorage.token
  }
  return config
})
http.interceptors.response.use(res=>{
  return res
},err=>{
  Vue.prototype.$message({
      type:'error',
      message:err.response.data.message
  })
  if(err.response.status === 401){
    router.push('/login')
  }
  return Promise.reject(err)
})
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.mixin({
  methods: {
    getAuthor(){
      return {
          Authorization:sessionStorage.token || ''
      }
    }
  },
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
