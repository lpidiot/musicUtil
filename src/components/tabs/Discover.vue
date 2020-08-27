<template>
  <div>
    <mt-swipe :auto="4000" height="150px">
      <mt-swipe-item v-for="item in focus" :key="item.id">
        <img
          @click="openSongListDetail(null,item.jump_info.url)"
          class="cover"
          :src="item.pic_info.url"
        />
      </mt-swipe-item>
    </mt-swipe>

    <div class="container">
      <!-- 歌单区域 -->
      <div class="musicList-box">
        <div class="musicList-head">
          <h3>官方歌单</h3>
          <div class="musicList-more">
            <span>更多</span>
            <div class="lcon-more">
              <img src="../../assets/images/more.png" />
            </div>
          </div>
        </div>

        <ul class="musicList-content ul_h">
          <p v-if="songList_gf.length==0">获取歌单失败惹 刷新试试8</p>
          <li class="musicList-item li_h" v-for="item in songList_gf" :key="item.tid">
            <div class="item-coverBox" @click="openSongListDetail(null,item.tid)">
              <el-image
                style="width: 100%; height: 100%;"
                :src="item.cover_url_small"
                fit="cover"
                lazy
              ></el-image>
              <!-- <img :src="item.cover_url_small" /> -->
              <div class="item-detail">
                <div class="detail-numbox">
                  <div class="icon">
                    <img src="../../assets/images/erji.png" />
                  </div>
                  <span>{{item.access_num | toMillionFilter}}</span>
                </div>

                <div class="icon">
                  <img src="../../assets/images/play-big.png" />
                </div>
              </div>
            </div>
            <div class="item-title">
              <p>{{item.title}}</p>
            </div>
          </li>
        </ul>

        <div style="background-color:#325423; padding:50px;">asdsds</div>
      </div>
      <!-- /歌单区域 -->
    </div>
  </div>
</template>

<script>
window.onload = function () {
  var lastTouchEnd = 0;
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener(
    "touchend",
    function (event) {
      var now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
  document.addEventListener("dblclick", function (event) {
    event.preventDefault();
  });
};

export default {
  data() {
    return {
      //轮播图数据
      focus: [],
      //官方歌单数据
      songList_gf: [],
    };
  },
  methods: {
    openSongListDetail(mark, val) {
      if (typeof (val) == "string") {
        var first = val.substring(0, 1);
        if (/^[a-zA-Z]/.test(first)) {
          alert('不是歌单');
          return;
        }
      }
      this.$showSongList(mark,val);
    },
    //获取热门专辑封面及数据
    async getCover() {
      var coverData = this.$util.localUtil("coverData", "{}");
      var result = await this.$getData(
        "https://u.y.qq.com/cgi-bin/musicu.fcg",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
          },
          params: {
            "-": "recom9188477459130378",
            g_tk: "5381",
            loginUin: 0,
            hostUin: 0,
            needNewCode: 0,
            data: {
              comm: { ct: 24 },
              category: {
                method: "get_hot_category",
                param: { qq: "" },
                module: "music.web_category_svr",
              },
              recomPlaylist: {
                method: "get_hot_recommend",
                param: { async: 1, cmd: 2 },
                module: "playlist.HotRecommendServer",
              },
              playlist: {
                method: "get_playlist_by_category",
                param: { id: 8, curPage: 1, size: 40, order: 5, titleid: 8 },
                module: "playlist.PlayListPlazaServer",
              },
              new_song: {
                module: "newsong.NewSongServer",
                method: "get_new_song_info",
                param: { type: 5 },
              },
              new_album: {
                module: "newalbum.NewAlbumServer",
                method: "get_new_album_info",
                param: { area: 1, sin: 0, num: 10 },
              },
              new_album_tag: {
                module: "newalbum.NewAlbumServer",
                method: "get_new_album_area",
                param: {},
              },
              toplist: {
                module: "musicToplist.ToplistInfoServer",
                method: "GetAll",
                param: {},
              },
              focus: {
                module: "QQMusic.MusichallServer",
                method: "GetFocus",
                param: {},
              },
            },
          },
        }
      );
      //console.log(result);
      if (result) {
        this.$util.localUtil("coverData", result);
        this.focus = result.focus.data.content;
      }

      // if (Object.keys(coverData).length != 0) {
      //   this.focus = coverData.focus.data.conten;
      // }
    },
    // 获取热门搜索信息(其中歌单数据不太行 放弃)
    async getHotKey() {
      var hotKey = this.$util.localUtil("hotKey");
      var result = await this.$getData(
        "https://u.y.qq.com/cgi-bin/musicu.fcg",
        {
          params: {
            cgiKey: "GetHomePage",
            data: {
              comm: {
                g_tk: 5381,
                uin: "",
                format: "json",
                inCharset: "utf-8",
                outCharset: "utf-8",
                notice: 0,
                platform: "h5",
                needNewCode: 1,
              },
              MusicHallHomePage: {
                module: "music.musicHall.MusicHallPlatform",
                method: "MobileWebHome",
                param: { ShelfId: [101, 102, 161] },
              },
              hotkey: {
                module: "tencent_musicsoso_hotkey.HotkeyService",
                method: "GetHotkeyForQQMusicMobile",
                param: {
                  remoteplace: "txt.miniapp.wxada7aab80ba27074",
                  searchid: "1559616839293",
                },
              },
            },
          },
        }
      );
      //console.log(result);
      if (result) {
        hotKey = result.hotkey.data.vec_hotkey;
        this.$util.localUtil("hotKey", JSON.stringify(hotKey));
      }
    },
    // 获取官方歌单信息
    async getGfSongList() {
      var songList_gf = this.$util.localUtil("songList_gf");
      var result = await this.$getData(
        "https://u.y.qq.com/cgi-bin/musicu.fcg",
        {
          params: {
            format: "json",
            notice: 0,
            needNewCode: 0,
            platform: "yqq.json",
            data: {
              playlist: {
                method: "get_playlist_by_category",
                param: {
                  id: 3317,
                  curPage: 1,
                  size: 40,
                  order: 5,
                  titleid: 3317,
                },
                module: "playlist.PlayListPlazaServer",
              },
            },
          },
        }
      );
      //console.log(result);
      if (result) {
        songList_gf = result.playlist.data.v_playlist;
        this.$util.localUtil("songList_gf", songList_gf);
        this.songList_gf = songList_gf;
        //console.log(songList_gf);
      }
      // if (songList_gf.length > 0) {
      //   this.songList_gf = songList_gf;
      // }
    },
  },
  filters: {
    toMillionFilter(text) {
      text = text.toString();
      if (text.length >= 5) {
        text =
          text.substring(0, text.length - 4) +
          "." +
          text.substring(text.length - 4, text.length - 2) +
          "w";
      }
      return text;
    },
  },
  created() {
    var loading = this.$getLoading();
    this.getCover();
    this.getGfSongList();
    this.getHotKey();
    loading.close();
  },
};
</script>
<style>
.el-carousel__button {
  width: 6px !important;
  height: 6px !important;
  border-radius: 50% !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
<style lang="scss" scoped>
.mint-swipe {
  height: 150px !important;
  margin-bottom: 20px !important;
}
.cover {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.musicList-box {
  display: flex;
  flex-direction: column;
  .musicList-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 5px 0;
    h3 {
      margin: 0;
    }
    .musicList-more {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 5px;
      .lcon-more {
        width: 12px;
        height: 12px;
        line-height: 12px;
        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }

  .ul_h {
    overflow-x: auto;
    white-space: nowrap;
    width: auto;
    margin: 0;
    padding: 0;
  }

  /* Chorme/Safari */
  ::-webkit-scrollbar {
    display: none;
  }
  /* IE 10+ */
  ul {
    -ms-overflow-style: none;
  }
  /* Firefox */
  ul {
    overflow: -moz-scrollbars-none;
  }

  .li_h {
    display: inline-block;
    margin-right: 10px;
    padding: 0;
  }
  .musicList-content {
    display: flex;
    flex-direction: row;
    align-items: center;

    .musicList-item {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 112px;
      margin: 3px;
      .item-coverBox {
        position: relative;
        max-width: 112px;
        max-height: 112px;
        .el-image {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 8px;
          object-fit: cover;
          margin: 0;
        }
        .item-detail {
          margin: 0;
          position: absolute;
          height: 20px;
          display: -webkit-box;
          -webkit-box-pack: center;
          -webkit-box-align: center;
          border-radius: 0 0 8px 8px;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 3px 6px;
          box-sizing: border-box;
          background-color: rgba(0, 0, 0, 0.2);
          bottom: 0px;
          .icon {
            width: 15px;
            height: 15px;
            img {
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          }
          .detail-numbox {
            display: flex;
            flex-direction: row;
            align-items: center;
            span {
              font-weight: 100;
              font-size: 10px;
              margin-left: 3px;
              transform: translateY(1px);
              color: #eedfd9 !important;
            }
          }
        }
      }

      .item-title {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin: 0;
        p {
          margin: 0;
          width: 100%;
          font-size: 12px;
          height: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }
    }
  }
}
</style>