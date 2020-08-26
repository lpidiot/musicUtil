<template>
  <transition>
    <div v-if="show" class="fixed" ref="box">
      <div :class="['headBox',isScroll?'border':'']">
        <div class="bar" @click="back">
          <img src="@/assets/images/back_blue.png" alt />返回
        </div>
        <div class="tit" v-show="changeAppear">{{songListInfo.songListName}}</div>
        <div class="bar roundBar">
          <img src="@/assets/images/more_blue.png" alt />
        </div>
      </div>

      <div
        :class="['appear', changeAppear?'fixedTop':'']"
        v-if="!isSinger"
        :style="{backgroundImage:'url('+logo+')'}"
      >
        <div class="filterBox filter">
          <div class="cover">
            <img :src="logo" alt />
          </div>
          <div class="infoBox">
            <div class="info">{{songListInfo.songListName}}</div>
            <div class="info">{{songListInfo.songer}}</div>
            <div class="subInfo">{{songListInfo.describe}}</div>
          </div>
        </div>
      </div>

      <div class="appear" v-else>
        <div class="filterBox">
          <div class="singer">周杰伦</div>
        </div>
      </div>

      <div :class="['list-box', changeAppear?'distance':'']">
        <div class="list-item" v-for="item in songList" :key="item.id" @click="prin(item)">
          <div class="content">
            <div class="info">{{item.name}}</div>
            <div class="subInfo">{{item.singer[0].name+" - "+item.album.name}}</div>
          </div>

          <div class="toolbar-box">
            <div class="toolbar">
              <img src="@/assets/images/play_operation.png" />
            </div>
            <div class="toolbar">
              <img src="@/assets/images/more_option.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isSinger: false,
      changeAppear: false, //是否改变信息栏显示状态
      songerInfo: {},
      logo: require("@/assets/images/m.jpg"),
      songList: [],
      songListInfo: {
        songListName: "歌单名",
        songer: "拥有者",
        describe: "描述",
      },
      show: false,
      isScroll: false,
    };
  },

  methods: {
    prin(val) {
      console.log(val);
    },
    handleScroll() {
      const self = this;
      // var scrolltopTemp =
      //   document.documentElement.scrollTop || document.body.scrollTop;
      //   console.log(scrolltopTemp);
      // if (scrolltopTemp != 0) {
      //   this.isScroll = true;
      // } else {
      //   this.isScroll = false;
      // }
      var moveHeight;
      try {
        moveHeight = this.$refs.box.scrollTop;
      } catch (e) {
        return;
      }

      // if (moveHeight != 0) {
      //   this.isScroll = true;
      // } else {
      //   this.isScroll = false;
      // }
      if (moveHeight >= 210) {
        this.changeAppear = true;
      } else {
        this.changeAppear = false;
      }
    },
    //显示回调 用来刷新数据
    async freshSongList_tid(tid) {
      var result = await this.$getSongList(tid);
      console.log(result);
      if (result.cdlist) {
        var data = result.cdlist[0];
        if (data) {
          this.songListInfo = {
            songListName: data.dissname,
            songer: data.nickname,
            describe: data.desc,
          };

          this.songList = data.songlist;
          this.logo = data.logo;
        }
      }
    },
    async freshSongList_url(url) {
      var result = await this.$get("/musicApi", {
        headers: {},
        params: {
          ":": "recom9188477459130378",
          g_tk: "5381",
          loginUin: 0,
          hostUin: 0,
          needNewCode: 0,
          data: {
            comm: { ct: 24, cv: 10000 },
            albumSonglist: {
              method: "GetAlbumSongList",
              param: {
                albumMid: url,
                albumID: 0,
                begin: 0,
                num: 10,
                order: 2,
              },
              module: "music.musichallAlbum.AlbumSongList",
            },
          },
        },
      }).catch((err) => {
        console.log(err);
      });
      if (result.data.albumSonglist) {
        var songarr = result.data.albumSonglist.data.songList;
        console.log(songarr);
        if (songarr) {
          this.songListInfo = {
            songListName: songarr[0].songInfo.title,
            songer: songarr[0].songInfo.singer[0].name,
            describe: songarr[0].songInfo.subtitle,
          };
          var goal = [];
          for (var item of songarr) {
            goal.push(item.songInfo);
          }
          this.songList = goal;
          this.logo =
            "https://y.gtimg.cn/music/photo_new/T002R300x300M000" +
            url +
            "_1.jpg?max_age=2592000";
        }
      }
    },
    back() {
      this.isSinger = false;
      this.changeAppear = false; //是否改变信息栏显示状态
      this.songerInfo = {};
      this.logo = require("@/assets/images/m.jpg");
      this.songList = [];
      this.songListInfo = {
        songer: "拥有者",
        describe: "描述",
      };
      this.songListName = "歌单名";
      this.show = false;
      this.isScroll = false;
      this.$forceUpdate();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style scoped lang="scss">
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
// .v-leave-to {
//   opacity: 0;
//   transform: translateX(-100%);
//   position: absolute;
// }
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.interval {
  margin: 0;
  padding: 0;
  margin-top: 40px;
}
.border {
  border-bottom: 1px solid #c5c5c5;
  box-shadow: none;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #f5f5f5;
  overflow-y: auto;
}
.headBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  box-sizing: border-box;
  z-index: 100;
  color: #f5f5f5;
  // background-color: #f5f5f5;
  .tit {
    font-size: 15px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-width: calc(100%-80px);
  }
  .bar {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .roundBar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #dcdcdc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.filter {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.fixedTop {
  position: fixed;
  transform: translateY(-210px);
  width: 100%;
}
.distance {
  margin-top: 40px !important;
}

.appear {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  //height: 220px;
  height: 250px;
  .singer {
    color: white;
    font-size: 17px;
    font-weight: 700;
    transform: translateY(50px);
  }
  .filterBox {
    height: 220px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 20px 10px 20px;
    .cover {
      width: 100px;
      height: 100px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .infoBox {
      flex: 1;
      height: 100px;
      div {
        width: 100%;
      }
      .info {
        font-size: 15px;
        color: white;
      }
      .subInfo {
        font-size: 13px;
        color: #f0efec;
        margin-top: 10px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
// rgb(245, 248, 250);
// rgb(230, 236, 240);

.list-box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  .list-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 0 solid black;
    border-bottom: 2px solid rgb(230, 236, 240);
    padding: 10px;
    box-sizing: border-box;
    .content {
      display: flex;
      flex-direction: row;
      flex: 1;
      flex-wrap: wrap;
      div {
        width: 100%;
      }
      .info {
        color: rgba(0, 0, 0, 1);
      }
      .subInfo {
        color: rgb(101, 119, 134);
      }
    }
    .toolbar-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      .toolbar {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }
}
</style>