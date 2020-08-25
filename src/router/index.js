import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'
import SearchView from '../components/home/SearchView.vue'
import Discover from '../components/tabs/Discover.vue'
import SongListDetail from '../components/other/SongListDetail.vue'
import Player from '../components/other/Player.vue'
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
    keepAlive: false, //此组件不需要被缓
      meta: {
        title: '推荐'
      }
    }]
  },
  {
    path: '/search',
    component: SearchView,
    meta: {
      title: '搜索'
    }
  }, {
    path: '/player',
    component: Player
  },
]

const router = new VueRouter({
  routes
})

export default router
