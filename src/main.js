import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/common.css'
import './assets/css/animate.css'

import 'lib-flexible'
import Meta from 'vue-meta'
Vue.use(Meta)

//引入可能用到的方法
import util from './assets/js/util' // 引入
Vue.prototype.$util = util

//配置axios及根路径
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
Vue.prototype.$axios = axios
//axios.defaults.baseURL='http://127.0.0.1/demo/api'

// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   let token = window.sessionStorage.getItem("token");
//   console.log(token);
//   if (token) {
//       //config.headers.token = token;    //将token放到请求头发送给服务器
//       config.headers.common['token'] = token;
//       // config.headers['token'] = Token;
//   }
//   return config;

// }, function (error) {
//   return Promise.reject(error);
// });

Vue.config.productionTip = false;

Vue.directive('focus', {
  bind: function (el) {

  },
  inserted: function (el) {
    el.focus();
  },
  updated: function (el) {

  }
});

new Vue({
  router,
  metaInfo() {
    return {
      title: 'music',
      meta: [{
        name: "viewport",
        content: 'initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width'
      }]
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
