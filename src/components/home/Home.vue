<template>
  <div>
    <!-- head栏 -->
    <div class="head-box">
      <!-- 侧栏图标区 -->
      <div class="search-box">
        <div class="bar" @click="test">
          <img src="@/assets/images/setting2.png" />
        </div>
        <div class="searchbar text-sub" @click="openSearchView" :style="playingListExist()?{}:{'margin-right':'15px'}">
          <img src="../../assets/images/search.png" />
          搜索音乐
        </div>
        <div class="bar" @click="ttt" v-show="playingListExist()">
          <img src="@/assets/images/setting2.png" />
        </div>
      </div>

      <el-tabs @tab-click="handleClick" stretch v-model="activeName">
        <el-tab-pane label="推荐" name="/home/discover"></el-tab-pane>
        <el-tab-pane label="排行" name="second"></el-tab-pane>
        <el-tab-pane label="我的" name="third"></el-tab-pane>
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
    playingListExist(){
      var playingList=this.$util.localUtil('playingList');
      if(playingList.length>0){
        return true;
      }
      return false;
    },
    ttt() {
      this.$parent.playerTrigger();
    },
    async test() {
      // this.getMusic("0039MnYb0qxYhV").then((e) => {
      //   console.log(e);
      // });

      var result = await this.$axios.get(
        "http://127.0.0.1:9900/music/api/updateCookie",
        {
          params: {
            cookies: "ts_uid=689002144; pgv_pvid=2273141038; ts_uid=285984560; pgv_pvi=7055907840; userAction=1; ptui_loginuin=1195188852; RK=A0A50EKnYa; ptcz=a8ea77d518573518ea4529ae95f6564a799ded970b8f71392cee78583e6c207d; uin=1195188852; psrf_access_token_expiresAt=1605684731; psrf_musickey_createtime=1597908731; psrf_qqrefresh_token=6CE28D629A55C5C3B2FA5201F9BBE76E; qqmusic_key=Q_H_L_2il9_y50eOJGO_BkyuvVqzFUNTrCcNdHRRZO84FAPGQWvN8rLqanxyuyeZkyxAA; qm_keyst=Q_H_L_2il9_y50eOJGO_BkyuvVqzFUNTrCcNdHRRZO84FAPGQWvN8rLqanxyuyeZkyxAA; euin=oK6q7K6FNeckoc**; psrf_qqaccess_token=69454B3F0A42B668866D7C0603319016; psrf_qqunionid=; tmeLoginType=2; psrf_qqopenid=2CC58CEAF778A2A3A8179F38E02DED0F; pgv_info=ssid=s4077436704; pgv_si=s8947619840; ts_refer=ADTAGmyqq; ts_refer=ADTAGmyqq; yq_playschange=0; yq_playdata=; player_exist=1; qqmusic_fromtag=66; yq_index=0; yplayer_open=0; yqq_stat=0; ts_last=y.qq.com/; ts_last=i.y.qq.com/v8/playsong.html",
          },
        }
      );
      console.log(result.data);
    },
  },
  watch: {
    activeName(val) {
      if (this.$route.path == val) return;
      this.$router.push(val);
    },
  },
  created() {
    this.activeName = "/home/discover";
  },
};
</script>

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
  .el-tabs {
    width: 100%;
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