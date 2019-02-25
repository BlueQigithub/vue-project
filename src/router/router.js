// 引入vue
import Vue from 'vue'

// 引入
// 路由
import VueRouter from 'vue-router'

// 引入子组件
import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'
import Users from '../components/users/Users.vue'
import Rights from '../components/rights/Rights.vue'
import Roles from '../components/roles/Roles.vue'

// 把router当做模块化使用 , 使用use安装一下
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  // 设置路由
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }
  ]
})

// 守卫导航 (在vue-router中进行登录拦截)
router.beforeEach((to, from, next) => {
  // to 往哪个页面进行跳转
  // 不管跳到哪个页面next()都要执行一下
  // console.log('to:', to.path)
  // next()
  if (to.path === '/login') {
    next()
  } else {
    // 访问的其他的页面 , 判断是否有登录过
    const token = localStorage.getItem('token')
    // console.log(token)
    if (token) {
      // 登录过
      next()
    } else {
      next('/login')
    }
  }
})
// 导出路由
export default router
