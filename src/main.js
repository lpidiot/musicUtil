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

import songListDeatil from './plugins/songListDetail.js'
Vue.use(songListDeatil)

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
Vue.prototype.$getLoading=function(){
  var loading = this.$loading({
    // 声明一个loading对象
    lock: true, // 是否锁屏
    text: "正在加载...", // 加载动画的文字
    //spinner: "el-icon-loading", // 引入的loading图标
    //background: "rgba(0, 0, 0, 0.3)", // 背景颜色
    target: ".sub-main", // 需要遮罩的区域
    body: true,
    customClass: "mask", // 遮罩层新增类名
  });

  setTimeout(function () {
    // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close(); // 关闭遮罩层
  }, 5000);
  return loading;
}

Vue.prototype.$get = function (url, data,load) {
  var loading=null;
  if(load){
    loading = this.$getLoading();
  }
  
  return new Promise(function (resolve, reject) {
    axios.get(url, JSON.parse(JSON.stringify(data))).then(res => {
      if(loading){
        loading.close()
      }
      resolve(res);
    }).catch(err => {
      if(loading){
        loading.close()
      }
      reject(err.data)
    })
  })
}

Vue.prototype.$post = function post(url, params,load) {
  var loading =null;
  if(load){
    loading=this.$getLoading();
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        if(loading){
          loading.close()
        }
        resolve(res.data);
      })
      .catch(err => {
        if(loading){
          loading.close()
        }
        reject(err.data)
      })
  })
}
Vue.prototype.$getMusic =async function (songId) {
  var result = await this.$get(
    "http://127.0.0.1:9900/music/api/getVipMusic", {
      params: {
        songId: songId,
      },
    },true
  ).catch((err) => {
    console.log(err);
  })
  var goal = null;

  if (result.data.isok) {
    console.log('aa');
    var data = JSON.parse(result.data.data)[0];

    try {
      goal = {
        songId: data.songmid,
        songName: data.songname,
        subtitle: data.subtitle,
        singer: {
          singerId: data.singer[0].mid,
          singerName: data.singer[0].name
        },
        album: {
          albumname: data.albumname,
          albummId: data.albummid
        },
        cover: 'http:' + data.pic,
        url: data.m4aUrl,
        vid: data.vid
      };
    } catch (e) {
      console.log(e);
      //获取数据有问题 处理
    }

    return goal;

  }
}


Vue.prototype.$addMusic = function (music) {
  if (music) {
    var originData = util.localUtil("playingList", "{}");
    if (originData.songList == undefined) {
      originData = {
        index: 0,
        songList: []
      }
    }
    var songList = originData.songList;
    for (var i = 0; i < songList.length; i++) {
      if (music.songId == songList[i].songId) {
        originData.index = i;
        break;
      }
    }
    originData.songList.unshift(music);
    util.localUtil("playingList", originData);
    console.log('ok');

  }
}

Vue.prototype.$getSongList = function (tid) {
  return this.$post(
    "http://127.0.0.1:9900/music/api/getWebData", {
      url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
      header: {
        "origin": "https://y.qq.com",
        "referer": "https://y.qq.com/n/yqq/playlist/" + tid + ".html",
      },
      params: {
        type: '1',
        json: '1',
        utf8: '1',
        onlysong: '0',
        new_format: '1',
        disstid: tid,
        loginUin: '1195188852',
        hostUin: '0',
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: '0',
        platform: 'yqq.json',
        needNewCode: '0'
      }
    },true
  ).catch((err) => {
    console.log(err);
    return null;
  });
}


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
