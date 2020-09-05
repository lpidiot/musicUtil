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
            <div class="info_singer">{{songListInfo.singer}}</div>
            <div class="subInfo">{{songListInfo.describe}}</div>
          </div>
        </div>
      </div>

      <div class="appear_singer" v-else :style="{backgroundImage:'url('+logo+')'}">
        <div class="filterBox">
          <div class="singer">{{songListInfo.singer}}</div>
        </div>
      </div>

      <div :class="['list-box', changeAppear&&!isSinger?'distance':'']">
        <div class="list-item" v-for="item in songList" :key="item.id" @click="playSong(item)">
          <div :class="['content',isCurrentSong(item.mid)?'active':'']">
            <div class="info">{{item.name}}</div>
            <div class="subInfo">
              <div class="subName-icon" v-if="item.pay&&item.pay.pay_down">
                <img src="@/assets/images/vip.png" />
              </div>
              <div class="singleLine">{{item.singer[0].name+" - "+item.album.name}}</div>
              
            </div>
          </div>

          <div class="toolbar-box">
            <!-- <div class="toolbar">
              <img src="@/assets/images/play_operation.png" />
            </div>-->
            <div class="toolbar" @click.stop="songDetailSwitch(item)">
              <img src="@/assets/images/more_option.png" />
            </div>
          </div>
        </div>
        <div
          style="display:flex; justify-content: center;align-items: center;height:2em;padding:30px 0px"
          v-if="isSinger"
        >只能查看10条数据===自己搜吧还是</div>
        <div
          style="display:flex; justify-content: center;align-items: center;height:2em;padding:30px 0px"
          v-if="isEnded&&isSinger"
        >数据全部加载完毕</div>
      </div>

      <wrapper ref="songDetail">
        <ListGroup :barList="barList"></ListGroup>
      </wrapper>
    </div>
  </transition>
</template>
<script>
import Wrapper from "../other/Wrapper";
import ListGroup from "../other/ListGroup";
export default {
  components: {
    Wrapper,
    ListGroup,
  },
  data() {
    return {
      isSinger: false,
      isLocal: false,
      changeAppear: false, //是否改变信息栏显示状态
      logo: require("@/assets/images/m.jpg"), //默认显示图片
      songList: [],
      songListInfo: {
        songListName: "歌单名",
        singer: "拥有者",
        describe: "描述",
      },
      show: false, //是否显示
      isScroll: false, //头部是否i显示下边框
      isLoading: false, //是否加载数据中
      page: 0, //歌手歌单默认页数（从0开始）
      isEnded: false, //数据是否到底
      singerId: "", //歌手id 歌手歌单加载数据用
      context: null, //打开歌单的页面，用来处理切歌等操作
      barList: [], //歌曲n选项
    };
  },

  methods: {
    async playSong(song) {
      console.log("song=" + song.mid);
      if (this.isLocal) {
        var idx = this.$util.findSongByMid(song.mid);
        console.log("idx=" + idx);
        this.context.$parent.$parent.updatePlayingList(idx, true);
        this.context.$parent.$parent.playerTrigger();
        return;
      }
      var songList = this.songList;
      var idx = null;
      var localData = this.$util.localUtil("playingList"); //临时备份下出错后恢复

      this.$util.localUtil("playingList", {}); //切歌清空下数据
      try {
        for (var i = 0; i < songList.length; i++) {
          if (songList[i].mid == song.mid) {
            idx = i;
          }
          var coverImg = this.$util.getAlbumImg(songList[i].album.mid);
          var goal = {
            songId: songList[i].mid,
            songName: songList[i].name,
            singer: songList[i].singer[0],
            album: {
              albumName: songList[i].album.name,
              albummId: songList[i].album.mid,
            },
            cover: coverImg,
            url: "mark",
          };
          this.$addMusic(goal, "asc");
        }
      } catch (e) {
        console.log("覆盖当前播放列表失败");
        this.$util.localUtil("playingList", localData); //恢复数据
      }
      if (idx != null) {
        this.context.$parent.$parent.updatePlayingList(idx, true);
        this.context.$parent.$parent.playerTrigger();
      }

      // var url = await this.$getMusic(song.mid);
      // if (url) {
      //   var coverImg = this.$util.getAlbumImg(song.album.mid);
      //   var goal = {
      //     songId: song.mid,
      //     songName: song.name,
      //     singer: song.singer[0],
      //     album: {
      //       albumName: song.album.name,
      //       albummId: song.album.mid,
      //     },
      //     cover: coverImg,
      //     url: url,
      //   };
      //   this.$addMusic(goal);
      //   this.context.$parent.$parent.updatePlayingList(null, true);
      //   this.context.$parent.$parent.playerTrigger();
      //   //这个确实有点离谱...用vuex的话感觉更离谱 先这样吧
      // }
    },
    songDetailSwitch(info) {
      console.log(info);
      const that = this;
      var bars = [
        [
          {
            id: 1,
            title: "下一首播放",
            imgUrl: require("@/assets/images/nextPlay.png"),
            disable: true,
          },
          {
            id: 2,
            title: "收藏到歌单",
            imgUrl: require("@/assets/images/sc.png"),
            disable: true,
          },
          {
            id: 3,
            title: "下载",
            imgUrl: require("@/assets/images/download.png"),
            fun: function () {
              that.downloadSong(info.songmid);
            },
          },
        ],
        [
          {
            id: 1,
            title: "歌手" + " (" + info.singer[0].name + ")",
            imgUrl: require("@/assets/images/singer2.png"),
            disable: true,
          },
          {
            id: 2,
            title: "专辑" + " (" + info.album.name + ")",
            imgUrl: require("@/assets/images/cd.png"),
            disable: true,
          },
          {
            id: 3,
            title: "信息",
            imgUrl: require("@/assets/images/info.png"),
            disable: true,
          },
        ],
      ];
      this.barList = bars;
      this.$refs.songDetail.sw();
    },

    handleScroll() {
      const self = this;
      //下滑head加上下边框线 已弃用
      // var scrolltopTemp =
      //   document.documentElement.scrollTop || document.body.scrollTop;
      //   console.log(scrolltopTemp);
      // if (scrolltopTemp != 0) {
      //   this.isScroll = true;
      // } else {
      //   this.isScroll = false;
      // }

      var totalHeight;
      var clientHeight;
      var moveHeight;
      try {
        totalHeight = this.$refs.box.scrollHeight;
        clientHeight = this.$refs.box.clientHeight;
        moveHeight = this.$refs.box.scrollTop;
      } catch (e) {
        return;
      }
      // console.log(totalHeight);
      // console.log(clientHeight);
      // console.log(moveHeight);

      // if (
      //   moveHeight + clientHeight >= totalHeight - 20 &&
      //   !this.isLoading &&
      //   !this.isEnded
      // ) {
      //   设置为正在加载中
      //this.isLoading = true;
      //console.log("Refresh");
      // setTimeout(() => {
      //   this.freshSongList_singer(self.singerId);
      // }, 200);
      //}
      // console.log(moveHeight);
      if (this.isSinger) {
        //console.log(moveHeight);
        // if (moveHeight >= 230) {
        //   this.changeAppear = true;
        // } else {
        //   this.changeAppear = false;
        // }
      } else {
        if (moveHeight >= 210) {
          this.changeAppear = true;
        } else {
          this.changeAppear = false;
        }
      }
    },
    //显示回调 用来刷新数据
    async freshSongList_tid(tid) {
      var result = await this.$getData(
        "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",
        {
          header: {
            origin: "https://y.qq.com",
            referer: "https://y.qq.com/n/yqq/playlist/" + tid + ".html",
          },
          params: {
            type: "1",
            json: "1",
            utf8: "1",
            onlysong: "0",
            new_format: "1",
            disstid: tid,
            loginUin: "1195188852",
            hostUin: "0",
            format: "json",
            inCharset: "utf8",
            outCharset: "utf-8",
            notice: "0",
            platform: "yqq.json",
            needNewCode: "0",
          },
        },
        true
      );
      //console.log(result);
      if (result) {
        var data = result.cdlist[0];
        if (data) {
          this.songListInfo = {
            songListName: data.dissname,
            singer: data.nickname,
            describe: data.desc,
          };

          this.songList = data.songlist;
          this.logo = data.logo;
        }
      }
    },
    async freshSongList_url(url) {
      var result = await this.$getData(
        "https://u.y.qq.com/cgi-bin/musicu.fcg",
        {
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
        }
      );
      if (result) {
        var songarr = result.albumSonglist.data.songList;
        //console.log(songarr);
        if (songarr) {
          this.songListInfo = {
            songListName: songarr[0].songInfo.album.name,
            singer: songarr[0].songInfo.singer[0].name,
            describe: songarr[0].songInfo.subtitle,
          };
          var goal = [];
          for (var item of songarr) {
            goal.push(item.songInfo);
          }
          this.songList = goal;
          this.logo = this.$util.getAlbumImg(url);
        }
      }
    },

    async freshSongList_singer(singerId) {
      const self = this;
      if (this.page == -1) {
        this.songList = [];
      }
      var data = {
        comm: { ct: 24, cv: 0 },
        singerSongList: {
          method: "GetSingerSongList",
          param: {
            order: 1,
            singerMid: singerId,
            begin: self.page++,
            num: 10,
          },
          module: "musichall.song_list_server",
        },
      };
      var sign = this.$util.getSign(data);

      var result = await this.$getData(
        "https://u.y.qq.com/cgi-bin/musics.fcg",
        {
          headers: {},
          params: {
            "-": "getSingerSong42397207500114176",
            g_tk: 5381,
            sign: sign,
            loginUin: 0,
            hostUin: 0,
            format: "json",
            inCharset: "utf8",
            outCharset: "utf-8",
            notice: 0,
            platform: "yqq.json",
            needNewCode: 0,
            data: data,
          },
        }
      );
      if (result) {
        var songarr = result.singerSongList.data.songList;
        if (songarr) {
          this.songListInfo = {
            songListName: songarr[0].songInfo.title,
            singer: songarr[0].songInfo.singer[0].name,
            describe: songarr[0].songInfo.subtitle,
          };
          //var goal = [];
          if (songarr.length == 0) {
            this.isEnded = true;
            this.isLoading = false;
            return;
          }
          for (var item of songarr) {
            this.songList.push(item.songInfo);
          }

          //this.songList = goal;
          this.logo = this.$util.getSingerImg(singerId);
        }
      }
    },
    //将本地歌单转换为此插件所需的数据结构
    //本地歌单就先这么凑数吧。。
    freshSongList_local() {
      var localData = this.$util.localUtil("playingList", "{}");
      if (localData.songList) {
        var songList = localData.songList;
        //console.log(songarr);
        this.songListInfo = {
          songListName: "播放列表",
          singer: "本地",
          describe: "这里是当前播放列表ovo",
        };
        var goal = [];
        for (var item of songList) {
          var singer = [];
          var album = {
            mid: item.album.albummId,
            name: item.album.albumName,
          };
          singer.push(item.singer);
          var data = {
            mid: item.songId,
            singer: singer,
            album: album,
            name: item.songName,
            url: item.url,
          };
          goal.push(data);
        }
        this.songList = goal;
        this.logo = require("@/assets/images/taiga.jpg");
        this.isEnded = true; //本地不存在加载
      }
    },
    isCurrentSong(mid) {
      console.log(this.context);
      var currentSong = this.context.$store.getters.playingList[
        this.context.$store.getters.idx
      ];
      if (currentSong.songId == mid) {
        return true;
      }
      return false;
    },

    back() {
      this.isSinger = false;
      this.isLocal = false;
      this.changeAppear = false; //是否改变信息栏显示状态
      this.logo = require("@/assets/images/m.jpg");
      this.songList = [];
      this.songListInfo = {
        singer: "拥有者",
        describe: "描述",
      };
      this.songListName = "歌单名";
      this.show = false;
      this.isScroll = false;
      this.isLoading = false; //是否加载数据中
      this.page = 0; //歌手歌单默认页数（从0开始）
      this.isEnded = false; //数据是否到底
      this.singerId = ""; //歌手id 歌手歌单加载数据用
      this.$forceUpdate();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.$util.sign_main(this, this.$util.sign_pram2());
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
  z-index: 888;
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
  backdrop-filter: blur(45px);
  -webkit-backdrop-filter: blur(45px);
}

.fixedTop {
  position: fixed;
  transform: translateY(-210px);
  width: 100%;
}
.fixedTop_singer {
  position: fixed;
  transform: translateY(-240px);
  width: 100%;
}
.distance {
  margin-top: 40px !important;
}
.appear_singer {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 280px;
  .singer {
    color: white;
    font-size: 17px;
    font-weight: 700;
    display: initial;
    position: absolute;
    top: 100px;
    left: 30px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .filterBox {
    height: 280px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 20px 10px 20px;
  }
}
.appear {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 250px;
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
      .info_singer {
        font-size: 13px;
        color: #f0efec;
        font-weight: 600;
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
    padding: 10px 0;
    box-sizing: border-box;
    .active {
      border-left: 3px solid #1296db;
    }
    .content {
      display: flex;
      flex-direction: row;
      flex: 1;
      flex-wrap: wrap;
      padding: 0 10px;
      div {
        width: 100%;
      }
      .info {
        color: rgba(0, 0, 0, 1);
      }
      .subInfo {
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
       
        .subName {
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          color: rgb(101, 119, 134);
        }
        .subName-icon {
          width: 20px;
          height: 18px;
          img {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
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