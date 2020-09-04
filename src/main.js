import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/common.css'
import './assets/css/animate.css'

import Vuex from 'vuex'
Vue.use(Vuex)

import 'lib-flexible'
import Meta from 'vue-meta'
Vue.use(Meta)


import {
  Message
} from 'element-ui';
Vue.component(Message.name, Message)
Vue.prototype.$message = Message

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




axios.interceptors.response.use(
  (response) => {
    //console.log(response);
    if (response.data.isok) {
      try {
        var goal = JSON.parse(response.data.data);
        return goal;
      } catch (e) {

        return response.data.data;
      }
    } else if (typeof (response.data.isok) == 'boolean') {
      //处理
      console.log('error');
      console.log(response.data);
      if (response.data.data) {
        Message(response.data.data);
      } else {
        Message('服务器可能维护中');
      }
      return null;
    }
    return response.data;
  }, error => {
    if (error.response) {
      if (error.response.status === 404) {
        //处理
        Message('没有找到该资源');
        return new Promise(() => {}) // pending的promise，中止promise链
      } else if (error.response.status === 500) {
        Message('后台方法失效 忘了我吧');
        //处理
        return new Promise(() => {}) // pending的promise，中止promise链
      }
      return Promise.reject(error.response)
    }

  }
)


const store = new Vuex.Store({
  state: {
    isPlaying: false, //是否正在播放
    playingList: [], //当前播放列表
    idx: 0, //播放列表对应的索引
  },
  mutations: {
    sw(state) {
      state.isPlaying = !state.isPlaying
    },
    play(state) {
      state.isPlaying = true
    },
    stop(state) {
      state.isPlaying = false
    },
    updateList(state, newList) {
      state.playingList = newList
    },
    updateIdx(state, newIdx) {
      state.idx = newIdx
    }
  },
  actions: {

  },
  getters: {
    isPlaying(state) {
      return state.isPlaying
    },
    playingList(state) {
      return state.playingList
    },
    idx(state) {
      return state.idx
    },
    currentSongCover(state) {
      if (state.playingList.length > 0) {
        return state.playingList[state.idx].cover;
      }
      return require("@/assets/images/cover.jpg");
    }

  }
})

Vue.prototype.$getLoading = function (text) {
  if (!text) {
    text = "正在加载...";
  }
  var loading = this.$loading({
    // 声明一个loading对象
    lock: true, // 是否锁屏
    text: text, // 加载动画的文字
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

Vue.prototype.$get = function (url, data, load) {
  var loading = null;
  if (load) {
    loading = this.$getLoading();
  }

  return new Promise(function (resolve, reject) {
    axios.get(url, JSON.parse(JSON.stringify(data))).then(res => {
      if (loading) {
        loading.close()
      }
      resolve(res);
    }).catch(err => {
      if (loading) {
        loading.close()
      }
      reject(err)
    })
  })
}

Vue.prototype.$post = function post(url, params, load) {
  var loading = null;
  if (load) {
    loading = this.$getLoading();
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        if (loading) {
          loading.close()
        }
        resolve(res);
      })
      .catch(err => {
        if (loading) {
          loading.close()
        }
        reject(err)
      })
  })
}
// Vue.prototype.$getMusic = async function (songId) {
//   var result = await this.$get(
//     "http://127.0.0.1:9900/music/api/getVipMusic", {
//       params: {
//         songId: songId,
//       },
//     }, true
//   ).catch((err) => {
//     console.log(err);
//   })
//   var goal = null;
//   console.log(result);
//   if (result.data.isok) {
//     console.log('aa');
//     var data = JSON.parse(result.data.data)[0];

//     try {
//       goal = {
//         songId: data.songmid,
//         songName: data.songname,
//         subtitle: data.subtitle,
//         singer: {
//           singerId: data.singer[0].mid,
//           singerName: data.singer[0].name
//         },
//         album: {
//           albumname: data.albumname,
//           albummId: data.albummid
//         },
//         cover: 'http:' + data.pic,
//         url: data.m4aUrl,
//         vid: data.vid
//       };
//     } catch (e) {
//       console.log(e);
//       //获取数据有问题 处理
//     }

//     return goal;

//   }
// }

Vue.prototype.$getMusic = async function (songId) {
  var data = {
    req: {
      module: "CDN.SrfCdnDispatchServer",
      method: "GetCdnDispatch",
      param: {
        guid: "6605262745",
        calltype: 0,
        userip: ""
      },
    },
    req_0: {
      module: "vkey.GetVkeyServer",
      method: "CgiGetVkey",
      param: {
        guid: "6605262745",
        songmid: [songId],
        songtype: [0],
        uin: "1195188852",
        loginflag: 1,
        platform: "20",
      },
    },
    comm: {
      uin: 1195188852,
      format: "json",
      ct: 24,
      cv: 0
    },
  }
  var sign = util.getSign(data);
  var result = await this.$post(
    "http://127.0.0.1:9900/music/api/getMusic", {
      url: 'https://u.y.qq.com/cgi-bin/musics.fcg',
      params: {
        "-": "getplaysongvkey734640045891823",
        g_tk: 2099400196,
        sign: sign,
        loginUin: "1195188852",
        hostUin: 0,
        format: "json",
        inCharset: "utf8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0,
        data: data,
      },
    }, true
  )
  //console.log(result);
  return result;
}


Vue.prototype.$addMusic = function (music, asc) {
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
        util.localUtil("playingList", originData);
        return;
      }
    }
    if (asc) {
      originData.songList.push(music);
    } else {
      originData.songList.unshift(music);
    }
    store.commit('updateList', originData.songList);
    store.commit('updateIdx', originData.index);
    util.localUtil("playingList", originData);
  }
}
Vue.prototype.$getData = function (url, params, load) {
  params.url = url;
  if (!load) {
    load = false;
  }
  //console.log('ok');
  return this.$post(
    "http://127.0.0.1:9900/music/api/getWebData", params, load
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

axios.post("http://127.0.0.1:9900/music/getToken", {
  username: "admin",
  password: "admin",
}).then(res => {
  console.log(res);
  var token = res.token;
  axios.defaults.headers.common["token"] = token;
  new Vue({
    router,
    store,
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
},error=>{
  alert('服务器没有响应=忘了我吧');
});
