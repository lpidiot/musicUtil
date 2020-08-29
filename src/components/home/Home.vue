<template>
  <div>
    <!-- head栏 -->
    <div class="head-box">
      <!-- 侧栏图标区 -->
      <div class="search-box">
        <div class="bar" @click="test">
          <img src="@/assets/images/setting2.png" />
        </div>
        <div
          class="searchbar text-sub"
          @click="openSearchView"
          :style="playingListExist()?{}:{'margin-right':'15px'}"
        >
          <img src="../../assets/images/search.png" />
          搜索音乐
        </div>
        <div class="bar" @click="playerTrigger" v-show="playingListExist()">
          <img src="@/assets/images/setting2.png" />
        </div>
      </div>

      <el-tabs @tab-click="handleClick" stretch v-model="activeName">
        <el-tab-pane label="推荐" name="/home/discover"></el-tab-pane>
        <el-tab-pane label="排行" name="www"></el-tab-pane>
        <el-tab-pane label="我的" name="/home/mine"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- /head栏 -->
    <!-- 内容 -->
    <div class="contant">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
    };
  },
  methods: {
    handleClick(tab, event) {
      var idx = tab.index;
    },
    //打开搜索页
    openSearchView() {
      this.$router.push("/search");
    },
    playingListExist() {
      var local = this.$util.localUtil("playingList", "{}");
      if (local.songList) {
        if (local.songList.length > 0) {
          return true;
        }
      }
      return false;
    },
    playerTrigger() {
      this.$parent.playerTrigger();
    },
    async test() {
      // this.getMusic("0039MnYb0qxYhV").then((e) => {
      //   console.log(e);
      // });

      // var result = await this.$axios.get(
      //   "http://127.0.0.1:9900/music/api/updateCookie",
      //   {
      //     params: {
      //      cookies:"pgv_pvi=8605431808; pgv_si=s5542136832; pgv_info=ssid=s902520674; pgv_pvid=6605262745; ptui_loginuin=1195188852; RK=I0AxlGKHba; ptcz=77e89dcb9d3223f38300285f48686d04900f5a28c10b8479d0557016bd643683; psrf_qqrefresh_token=6CE28D629A55C5C3B2FA5201F9BBE76E; psrf_qqaccess_token=69454B3F0A42B668866D7C0603319016; euin=oK6q7K6FNeckoc**; psrf_qqunionid=; psrf_musickey_createtime=1598512072; tmeLoginType=2; psrf_access_token_expiresAt=1606288072; qqmusic_key=Q_H_L_2WyM7z50euDDAFiN5nSbKdiTtLy1uaYZzeU4riQQSaBoyQEFE69D9AZ-gV_6wJ6; uin=1195188852; qm_keyst=Q_H_L_2WyM7z50euDDAFiN5nSbKdiTtLy1uaYZzeU4riQQSaBoyQEFE69D9AZ-gV_6wJ6; psrf_qqopenid=2CC58CEAF778A2A3A8179F38E02DED0F; qqmusic_fromtag=66"
      //     },
      //   }
      // );
      //console.log(result.data);

      // var result = await this.$getData("https://u.y.qq.com/cgi-bin/musics.fcg", {
      //   header:{
      //     Cookie:"pgv_pvi=8605431808; pgv_si=s5542136832; pgv_info=ssid=s902520674; pgv_pvid=6605262745; ptui_loginuin=1195188852; RK=I0AxlGKHba; ptcz=77e89dcb9d3223f38300285f48686d04900f5a28c10b8479d0557016bd643683; psrf_qqrefresh_token=6CE28D629A55C5C3B2FA5201F9BBE76E; psrf_qqaccess_token=69454B3F0A42B668866D7C0603319016; euin=oK6q7K6FNeckoc**; psrf_qqunionid=; psrf_musickey_createtime=1598512072; tmeLoginType=2; psrf_access_token_expiresAt=1606288072; qqmusic_key=Q_H_L_2WyM7z50euDDAFiN5nSbKdiTtLy1uaYZzeU4riQQSaBoyQEFE69D9AZ-gV_6wJ6; uin=1195188852; qm_keyst=Q_H_L_2WyM7z50euDDAFiN5nSbKdiTtLy1uaYZzeU4riQQSaBoyQEFE69D9AZ-gV_6wJ6; psrf_qqopenid=2CC58CEAF778A2A3A8179F38E02DED0F; qqmusic_fromtag=66"
      //   },
      //   params: {
      //     "-": "getplaysongvkey734640045891823",
      //     g_tk: 2099400196,
      //     sign: sign,
      //     loginUin: "1195188852",
      //     hostUin: 0,
      //     format: "json",
      //     inCharset: "utf8",
      //     outCharset: "utf-8",
      //     notice: 0,
      //     platform: "yqq.json",
      //     needNewCode: 0,
      //     data: data,
      //   },
      // });
      var result = await this.$getMusic("002jD2Q83NmcPJ");
      console.log(result);
    },
  },
  watch: {
    activeName(val) {
      if (this.$route.path == val) return;
      this.$router.push(val);
    },
  },
  created() {
    //this.activeName = "/home/mine";
    this.activeName = "/home/discover";
  },
};
</script>
<style>
.el-tabs__header {
  margin-bottom: 0 !important;
}
.el-tabs__nav-wrap::after {
  color: #e4e7ed;
  display: none !important;
}

.el-tabs__content {
  display: none !important;
}
.el-tabs {
  width: 100%;
}
</style>

<style lang="scss" scoped>
.head-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 1px 2px #e4e7ed;
  width: 100%;
  margin: 0;
  background-color: #f5f5f5;
  z-index: 500;

  .search-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    .bar {
      width: 28px;
      height: 28px;
      margin: 0 15px;
      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 50%;
      }
    }
    .searchbar {
      // background-color: #fefefe;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #e6ecf0;
      height: 2em;
      flex: 1;
      border-radius: 14px;
      // margin: 0 15px;
      padding: 0 10px;
      font-size: 14px;
      color: #758593;
      img {
        margin-right: 5px;
      }
    }
  }
}

.contant {
  margin-top: 90px;
}

// .tabs-box {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   .tabs-item {
//     flex: 1;
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//   }
//   .tab-text {
//     position: relative;
//     display: -webkit-box;
//     -webkit-box-pack: center;
//     -webkit-box-align: center;
//     height: 100%;
//     white-space: nowrap;
//     font-size: 15px;
//   }
//   .tab-active::after {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 50%;
//     width: 70%;
//     height: 2px;
//     border-radius: 0.03rem;
//     background: currentColor;
//     -webkit-transform: translate3d(-50%, 0, 0);
//     animation: mymove 1s;
//   }

//   @keyframes mymove {
//     from {
//       opacity: 0;
//     }
//     to {
//       opacity: 1;
//     }
//   }

//   @-webkit-keyframes mymove /*Safari and Chrome*/ {
//     from {
//       opacity: 0;
//     }
//     to {
//       opacity: 1;
//     }
//   }
// }
</style>