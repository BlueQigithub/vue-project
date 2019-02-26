// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入路由
import router from './router/router.js'

// 引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'

// 使用use安装一下ElementUi
Vue.use(ElementUI)
// 在main文件配置axios
// 配置(每个组件都要引入的axios 配置后就不用每个文件都引入了)
Vue.prototype.$axios = axios
// 配置baseURL路径 (不用每次请求时都使用很长的根路径了 后需请求时直接使用this.$axios)
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 配置响应头token (后续每次请求都不用携带token了)
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
