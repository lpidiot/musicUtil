import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'
import SearchView from '../components/home/SearchView.vue'
import Discover from '../components/tabs/Discover.vue'
import Mine from '../components/tabs/Mine.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home',
    meta: {
      title: '首页'
    }
  }, {
    path: '/home',
    component: Home,
    children: [{
      path: 'discover',
      component: Discover,
      meta: {
        title: '推荐'
      }
    },
    {
      path: 'mine',
      component: Mine,
      meta: {
        title: '我的'
      }
    }]
  },
  {
    path: '/search',
    component: SearchView,
    meta: {
      title: '搜索'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
