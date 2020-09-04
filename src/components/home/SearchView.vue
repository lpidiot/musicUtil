<template>
  <div>
    <!-- <div class="container"> -->
    <!-- head栏 -->

    <div class="head-box">
      <!-- 侧栏图标区 -->
      <div class="search-box">
        <div :class=" [isFocus?'searchbar-focus':'searchbar'] ">
          <div class="icon">
            <img src="@/assets/images/search_focus.png" v-if="isFocus" />
            <img src="@/assets/images/search.png" v-else />
          </div>
          <input
            v-model="searchText"
            placeholder="搜索音乐"
            @focus="changeFocus"
            @blur="changeFocus"
            @keyup.enter="openSearchDetail"
            v-focus
          />
        </div>
        <!-- <el-button type="text" @click="back">取消</el-button> -->
        <div class="textBtn" @click="back">
          <span>取消</span>
        </div>
      </div>
    </div>
    <!-- /head栏 -->

    <!-- 搜索结果栏 -->
    <!-- <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      tag="div"
      mode="out-in"
    >-->
    <div class="headTopMargin" v-if="currentContent=='search'">
      <el-tabs stretch v-model="activeName" @tab-click="watchActive">
        <el-tab-pane label="单曲" name="single">
          <div class="music-box">
            <ul ref="tab_single">
              <li class="disable text-black">
                <div class="content">单曲</div>
                <div class="icon">
                  <img src="@/assets/images/play_blue_32.png" alt />
                </div>
              </li>

              <li v-for="(song,idx) in searchResult" :key="page*15+idx" @click="startPlay(song)">
                <div class="musicInfo">
                  <div class="musicName">{{song.songname}}</div>
                  <div class="subName">
                    <div class="subName-icon" v-if="song.pay.paydownload">
                      <img src="@/assets/images/vip.png" />
                    </div>
                    <div class="subName-content">{{song.singer[0].name}}</div>
                  </div>
                </div>
                <div class="toolBar">
                  <div class="bar" v-if="song.vid">
                    <img src="@/assets/images/play_operation.png" />
                  </div>
                  <div class="bar" @click.stop="songDetailSwitch(song)">
                    <img src="@/assets/images/more_option.png" />
                  </div>
                </div>
              </li>

              <li
                style="display:flex; justify-content: center;align-items: center;height:2em;margin-bottom:50px"
                v-if="isLoading"
              >正在加载中</li>
              <div v-else>
                <li
                  style="display:flex; justify-content: center;align-items: center;height:2em;margin-bottom:50px"
                  v-if="isEnded"
                >数据全部加载完毕</li>
              </div>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="songlist">
          <div class="music-box">
            <ul ref="tab_songlist">
              <li class="disable text-black">
                <div class="content">歌单</div>
                <div class="icon">
                  <img src="@/assets/images/play_blue_32.png" alt />
                </div>
              </li>

              <li
                v-for="(item,idx) in searchResult_songList"
                :key="page*15+idx"
                @click="openSongListDetail('tid',item.dissid)"
              >
                <div class="station">
                  <div class="covarBox">
                    <img :src="item.imgurl?item.imgurl:'@/assets/images/m.jpg'" alt />
                  </div>
                  <div class="albumInfo">
                    <div class="name">{{item.dissname}}</div>
                    <div class="subName">
                      <!-- <div class="subName-icon" v-if="song.pay.paydownload">
                      <img src="@/assets/images/vip.png" />
                      </div>-->
                      <div class="subName-content">{{item.creator.name+" "+item.createtime}}</div>
                    </div>
                  </div>
                </div>
                <div class="toolBar">
                  <div class="bar" style="width: 16px;height: 16px;">
                    <img src="@/assets/images/more.png" />
                  </div>
                </div>
              </li>

              <li
                style="display:flex; justify-content: center;align-items: center;height:2em;margin-bottom:50px"
                v-if="isLoading"
              >正在加载中</li>
              <div v-else>
                <li
                  style="display:flex; justify-content: center;align-items: center;height:2em;margin-bottom:50px"
                  v-if="isEnded"
                >数据全部加载完毕</li>
              </div>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="album">
          <div class="music-box">
            <ul ref="tab_album">
              <li class="disable text-black">
                <div class="content">专辑</div>
                <div class="icon">
                  <img src="@/assets/images/play_blue_32.png" alt />
                </div>
              </li>

              <li
                v-for="(album,idx) in searchResult_album"
                :key="page*15+idx"
                @click="openSongListDetail('album',album.albumMID)"
              >
                <div class="station">
                  <div class="covarBox">
                    <img :src="album.albumPic?album.albumPic:'@/assets/images/m.jpg'" alt />
                  </div>
                  <div class="albumInfo">
                    <div class="name">{{album.albumName}}</div>
                    <div class="subName">
                      <!-- <div class="subName-icon" v-if="song.pay.paydownload">
                      <img src="@/assets/images/vip.png" />
                      </div>-->
                      <div class="subName-content">{{album.singerName+" "+album.publicTime}}</div>
                    </div>
                  </div>
                </div>
                <div class="toolBar">
                  <div class="bar" style="width: 16px;height: 16px;">
                    <img src="@/assets/images/more.png" />
                  </div>
                </div>
              </li>

              <li
                style="display:flex; justify-content: center;align-items: center;height:2em;margin-bottom:50px"
                v-if="isLoading"
              >正在加载中</li>
              <div v-else>
                <li
                  style="display:flex; justify-content: center;align-items: center;height:2em;margin-bottom:50px"
                  v-if="isEnded"
                >数据全部加载完毕</li>
              </div>
            </ul>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="歌词" name="fifth">eee</el-tab-pane> -->
      </el-tabs>
    </div>
    <!-- </transition> -->
    <!-- /搜索结果栏 -->
    <!-- </div> -->

    <!-- 联想栏 -->
    <!-- <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOutUp"
      tag="div"
      class="history-tags"
      mode="out-in"
    >-->
    <div class="thank-box headTopMargin" v-if="currentContent=='think'">
      <ul>
        <li
          v-if="goalHistory.length==0&&thinks.song.length==0&&thinks.singer.length==0&&thinks.album.length==0"
        >没有找到该词条哦TAT</li>
        <!-- 后续加上loading加载提示 -->
        <li class="disable" v-if="goalHistory.length>0">
          <div class="icon">
            <img src="@/assets/images/history.png" alt />
          </div>
          <div class="content">历史</div>
        </li>
        <li
          v-for="history in goalHistory"
          :key="history.id"
          @click="openSearchDetail(history.name)"
        >
          <div class="icon"></div>
          <div class="content">{{history.name}}</div>
        </li>

        <li class="disable" v-if="thinks.song.length>0">
          <div class="icon">
            <img src="@/assets/images/song.png" alt />
          </div>
          <div class="content">单曲</div>
        </li>

        <li
          v-for="song in thinks.song"
          :key="song.id"
          @click="openSearchDetail('single',song.name)"
        >
          <div class="icon"></div>
          <div class="content">{{song.name}}</div>
        </li>

        <li class="disable" v-if="thinks.singer.length>0">
          <div class="icon">
            <img src="@/assets/images/singer.png" alt />
          </div>
          <div class="content">歌手</div>
        </li>

        <li
          v-for="singer in thinks.singer"
          :key="singer.id"
          @click="openSongListDetail('singer',singer.mid)"
        >
          <div class="icon"></div>
          <div class="content">{{singer.name}}</div>
        </li>

        <li class="disable" v-if="thinks.album.length>0">
          <div class="icon">
            <img src="@/assets/images/album.png" alt />
          </div>
          <div class="content">专辑</div>
        </li>

        <li
          v-for="album in thinks.album"
          :key="album.mid"
          @click="openSearchDetail('album',album.name,album)"
        >
          <div class="icon"></div>
          <div class="content">{{album.name}}</div>
        </li>
      </ul>
    </div>
    <!-- </transition> -->
    <!-- /联想栏 -->

    <!-- 内容栏 -->
    <!-- <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideInDown"
      tag="div"
      class="history-tags"
      mode="out-in"
    >-->
    <div class="container headTopMargin" v-if="currentContent=='default'">
      <!-- 搜索历史 -->
      <div class="history-box">
        <div class="history-head">
          <h4>搜索历史</h4>
          <div class="lcon-more" @click="clearHistory">
            <!-- <img src="../../assets/images/garbage.png" /> -->
            <i class="el-icon-milk-tea"></i>
          </div>
        </div>
        <div class="content">
          <div class="history-tags">
            <transition-group
              enter-active-class="animated bounceIn"
              leave-active-class="animated bounceOut"
              tag="div"
              class="history-tags"
            >
              <div
                class="tag"
                v-for="item in historyTags"
                :key="item.id"
                @click="tagTouchHander(item)"
              >{{item.name}}</div>
            </transition-group>

            <div class="topBar" @click="changeTagView" v-if="historyTags!=null&&showTagBar">
              <img src="@/assets/images/top.png" :class="isShowTagBtn?'fff':'rrr'" />
            </div>
          </div>
        </div>
      </div>
      <!-- /搜索历史 -->
    </div>
    <!-- </transition> -->

    <!-- /内容栏 -->

    <!-- 底部弹框 -->

    <wrapper ref="songDetail" :filter="true">
      <ListGroup :barList="barList"></ListGroup>
    </wrapper>

    <!-- /底部弹框 -->
  </div>
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
      searchText: "", //搜索框绑定对象
      isFocus: false, //搜索框是否获得焦点
      isShowTagBtn: false, //搜索历史相关
      historyTags: [], //搜索历史列表
      showTagBar: false, //是否显示展开/收起标签按钮
      goalHistory: [], //与输入内容匹配后的历史列表(用于联想栏)
      thinks: {
        album: [],
        singer: [],
        mv: [],
        song: [],
        history: [],
      }, //联想数据
      currentContent: "default", //选项卡值
      activeName: "", //选项卡标示 默认不给值触发watch
      flag: false, //点击历史/热门标签后为watch监听作判断
      searchResult: [], //搜索结果 单曲
      searchResult_album: [], //专辑搜索结果
      searchResult_songList: [], //歌单搜索结果
      page: 0, //搜索结果页数
      overFlowTimeout: null, //滚动条定时器
      isLoading: false, //是否正在刷新
      isEnded: false, //数据是到末尾
      barList: [],
    };
  },
  methods: {
    //搜索框获得、失去焦点 改变样式
    changeFocus() {
      this.isFocus = !this.isFocus;
    },
    //返回到主页
    back() {
      this.currentContent = "default";
      this.$router.back(-1);
      // this.$router.push("/?back=true");
    },
    //初始化(重新取缓存中的)历史搜索数据 (默认折叠仅展示一行)
    initHistoryData() {
      var historyTags = this.$util.localUtil("historyTags");
      var tagNum = 0;
      var totalSongLength = 0;
      for (var tag of historyTags) {
        totalSongLength += this.$util.getLength(tag.name) + 2;
        if (totalSongLength <= 40) {
          tagNum++;
        }
      }

      if (historyTags.length > tagNum) {
        this.showTagBar = true;
      } else {
        this.showTagBar = false;
      }
      this.historyTags = historyTags.splice(0, tagNum);
    },
    //切换到search并刷新列表
    watchActive() {
      this.isEnded = false;
      this.page = 0;
      this.getSearchResult(this.searchText);
      this.currentContent = "search";
    },
    //展开搜索内容详细
    openSearchDetail(mark, val, e) {
      // console.log(e);
      // return;
      //为obj就是从keyup
      if (typeof mark == "object") {
        val = this.searchText.trim();
        mark = "single";
      }
      this.activeName = mark;
      this.initHistoryData();
      //========

      //展开搜索页面
      this.watchActive();
      //this.getSearchResult(val);
      //添加搜索历史

      //排除已经存在的一致的标签 用flag来记录
      var tagData = this.$util.localUtil("historyTags");
      var flag = true;
      for (var oldTag of tagData) {
        if (oldTag.name == val) {
          flag = false;
          break;
        }
      }
      if (flag) {
        var data = {
          id: this.$util.createUuid(8, 10),
          name: val,
          type: mark,
        };
        tagData.unshift(data);
        this.$util.localUtil("historyTags", tagData);
      }
    },
    //标签的展开和关闭
    changeTagView() {
      var historyTags = this.$util.localUtil("historyTags");
      var tagNum = 0;
      var totalSongLength = 0;
      for (var tag of historyTags) {
        totalSongLength += this.$util.getLength(tag.name) + 2;
        if (totalSongLength <= 40) {
          tagNum++;
        }
      }
      this.isShowTagBtn = !this.isShowTagBtn;

      //显示收起数据
      if (this.isShowTagBtn) {
        //this.historyTags = this.$util.localUtil("historyTags");
        var data = this.$util.localUtil("historyTags").splice(tagNum);
        for (var i = 0; i < data.length; i++) {
          this.historyTags.push(data[i]);
        }
      } else {
        this.historyTags = historyTags.splice(0, tagNum);
      }
    },
    //获取官方联想数据
    async getThinkData(val) {
      var result = await this.$getData(
        "https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg",
        {
          params: {
            is_xml: 0,
            key: val,
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: "json",
            inCharset: "utf8",
            outCharset: "utf-8",
            notice: 0,
            platform: "yqq.json",
            needNewCode: 0,
          },
        }
      );
      if (result) {
        try {
          var data = result.data;
          var album = data.album.itemlist;
          var singer = data.singer.itemlist;
          var mv = data.mv.itemlist;
          var song = data.album.itemlist;
          if (album.length > 5) {
            album = album.splice(0, 5);
          }
          if (album.length > 5) {
            singer = album.splice(0, 5);
          }
          if (album.length > 5) {
            mv = album.splice(0, 5);
          }
          if (album.length > 5) {
            song = album.splice(0, 5);
          }
          var goal = {
            album: album,
            singer: singer,
            mv: mv,
            song: song,
          };
          this.thinks = goal;
        } catch (e) {
          return;
        }
      }
    },
    //标签/热门点击事件
    tagTouchHander(val) {
      //事先写了watch事件 这里用变量flag简单处理下...处理下算了
      this.flag = true;
      this.currentContent = "search";
      this.searchText = val.name;
      this.activeName = val.type ? val.type : "single";
      this.watchActive();
    },
    //清空历史搜索
    clearHistory() {
      this.$util.localUtil("historyTags", []);
      this.historyTags = [];
      this.showTagBar = false;
    },
    //获取搜索结果
    async getSearchResult(val) {
      const self = this;
      this.isEnded = false;
      var remoteplace = "txt.yqq.song";
      var result;
      if (this.page == 0) {
        this.searchResult = [];
        this.searchResult_album = [];
        this.searchResult_songList = [];
      }
      if (this.activeName == "single") {
        //remoteplace='txt.yqq.song';
        result = await this.$getData(
          "https://c.y.qq.com/soso/fcgi-bin/client_search_cp",
          {
            params: {
              p: self.page++, //页数
              n: 15, //每页数据数量
              w: val,
              format: "json",
              remoteplace: "", //获取类型 单曲/专辑...
            },
          },
          true
        );
        //console.dir(result);
        if (result) {
          if (typeof result == "string") {
            if (result.substring(0, 9).indexOf("call")) {
              result = result.substring(9, result.length - 1);
              result = JSON.parse(result);
            }
            // console.dir(result);
          }

          var goalData = result.data.song.list;
          if (goalData.length == 0) {
            self.isEnded = true;
            self.isLoading = false;
            return;
          }
          for (var item of goalData) {
            self.searchResult.push(item);
          }
          console.log(this.searchResult);
        }
      } else if (this.activeName == "songlist") {
        result = await this.$getData(
          "https://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist",
          {
            header: {
              origin: "https://y.qq.com",
              referer: "https://y.qq.com/portal/search.html",
            },
            params: {
              num_per_page: 10,
              page_no: self.page++, //页数
              platform: "yqq.json",
              query: val,
              format: "json",
            },
          },
          true
        );
        if (result) {
          console.dir(result);
          if (typeof result == "string") {
            if (result.substring(0, 9).indexOf("call")) {
              result = result.substring(9, result.length - 1);
              result = JSON.parse(result);
            }
            // console.dir(result);
          }

          var goalData = result.data.list;
          if (goalData.length == 0) {
            self.isEnded = true;
            self.isLoading = false;
            return;
          }
          for (var item of goalData) {
            self.searchResult_songList.push(item);
          }
        }
      } else if (this.activeName == "album") {
        result = await this.$getData(
          "https://c.y.qq.com/soso/fcgi-bin/client_search_cp",
          {
            params: {
              p: self.page++, //页数
              n: 15, //每页数据数量
              w: val,
              format: "json",
              remoteplace: "txt.yqq.album",
              t: 8,
            },
          },
          true
        );
        if (result) {
          if (typeof result == "string") {
            if (result.substring(0, 9).indexOf("call")) {
              result = result.substring(9, result.length - 1);
              result = JSON.parse(result);
            }
            // console.dir(result);
          }

          var goalData = result.data.album.list;
          if (goalData.length == 0) {
            self.isEnded = true;
            self.isLoading = false;
            return;
          }
          for (var item of goalData) {
            self.searchResult_album.push(item);
          }
        }
      }
      self.isLoading = false;
    },
    /*  搜索结果滚动条改变事件
     *  上拉加载新的词条
     *
     */
    handleScroll() {
      //非search页面不操作
      if (this.currentContent != "search") {
        return;
      }
      const self = this;
      var totalHeight;
      var clientHeight;
      var moveHeight;
      try {
        if (this.activeName == "single") {
          totalHeight = this.$refs.tab_single.scrollHeight;
          clientHeight = this.$refs.tab_single.clientHeight;
          moveHeight = this.$refs.tab_single.scrollTop;
        } else if (this.activeName == "album") {
          totalHeight = this.$refs.tab_album.scrollHeight;
          clientHeight = this.$refs.tab_album.clientHeight;
          moveHeight = this.$refs.tab_album.scrollTop;
        } else if (this.activeName == "songlist") {
          totalHeight = this.$refs.tab_songlist.scrollHeight;
          clientHeight = this.$refs.tab_songlist.clientHeight;
          moveHeight = this.$refs.tab_songlist.scrollTop;
        }
      } catch (e) {
        return;
      }

      //window.scroll(0,30);
      // console.log(totalHeight);
      // console.log(clientHeight);
      // console.log(moveHeight);
      if (
        moveHeight + clientHeight >= totalHeight - 20 &&
        !this.isLoading &&
        !this.isEnded
      ) {
        //   设置为正在加载中
        this.isLoading = true;
        //console.log("Refresh");
        setTimeout(() => {
          this.getSearchResult(self.searchText);
        }, 200);
      }
    },
    openSongListDetail(mark, val) {
      this.$showSongList(mark, val);
    },
    async downloadSong(songmid) {
      var result = await this.$getMusic(songmid);
      if (result) {
        window.open(result);
      }
    },
    songDetailSwitch(info) {
      //console.log(info);
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
            fun: function () {
              //console.log(info);
              that.$refs.songDetail.close();
              that.openSongListDetail("singer", info.singer[0].mid);
            },
          },
          {
            id: 2,
            title: "专辑" + " (" + info.albumname + ")",
            imgUrl: require("@/assets/images/cd.png"),
            fun: function () {
              that.$refs.songDetail.close();
              that.openSongListDetail(null, info.albummid);
              //this.$showSongList(info.albummid);
            },
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
    //开始播放所选歌曲
    async startPlay(song) {
      console.log(song);
      var url = await this.$getMusic(song.songmid);
      console.log(url);
      if (url) {
        var coverImg = this.$util.getAlbumImg(song.albummid);
        var goal = {
          songId: song.songmid,
          songName: song.songname,
          singer: song.singer[0],
          album: {
            albumName: song.albumname,
            albummId: song.albummid,
          },
          cover: coverImg,
          url: url,
          vid: song.vid,
        };
        this.$addMusic(goal);
        this.$parent.updatePlayingList(null, true);
        this.$parent.playerTrigger();
      }
    },
  },
  watch: {
    //搜索文本改变时获取联想数据并判断历史记录中有没有已经搜索过的记录 有就添加到相关变量
    searchText(val) {
      //点击标签后的操作不需要再改变页面展示值
      if (!this.flag) {
        if (val == "") {
          this.currentContent = "default";
        } else {
          this.currentContent = "think";
        }
      }
      this.flag = false;
      this.getThinkData(val);
      var historyTags = this.$util.localUtil("historyTags");
      var goal = [];
      for (var h of historyTags) {
        if (h.name.indexOf(val) != -1) {
          goal.push(h);
        }
      }
      this.goalHistory = goal;
      this.initHistoryData();
    },

    immediate: true,
  },
  created() {
    this.initHistoryData();
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", " overflow: hidden;");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
    window.addEventListener("scroll", null, true);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>
<style>
</style>
<style lang="scss" scoped>
@keyframes myfirst {
  from {
    padding: 0 30px;
  }
  to {
    padding: 0 10px;
  }
}

/* Firefox */
@-moz-keyframes myfirst {
  from {
    padding: 0 30px;
  }
  to {
    padding: 0 10px;
  }
}

/* Safari and Chrome */
@-webkit-keyframes myfirst {
  from {
    padding: 0 30px;
  }
  to {
    padding: 0 10px;
  }
}
/* Opera */
@-o-keyframes myfirst {
  from {
    padding: 0 30px;
  }
  to {
    padding: 0 10px;
  }
}
.el-tabs {
  width: 100%;
}

/*头部(含搜索框)*/
.head-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  padding: 0 10px;
  box-sizing: border-box;
  z-index: 10;
  // border-bottom: 1px solid #e4e7ed;
  // box-shadow: 0 1px 2px #e4e7ed;
  width: 100%;
  margin: 0;
  // 搜索框放大动画
  animation: myfirst 0.6s;
  -moz-animation: myfirst 0.6s; /* Firefox */
  -webkit-animation: myfirst 0.6s; /* Safari and Chrome */
  -o-animation: myfirst 0.6s; /* Opera */

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
      height: 30px;
      flex: 1;
      border-radius: 14px;
      // margin: 0 15px;
      padding: 0 10px;
      input {
        margin: 0;
        padding: 0;
        background: none;
        border: none;
        outline: none;
        height: 100%;
        width: 100%;
        font-size: 16px;
        color: #758593;
        font: 400 13.3333px Arial;
      }
      input:focus {
        border: none;
      }
      .icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
    .searchbar-focus {
      // background-color: #fefefe;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #fff;
      height: 2em;
      flex: 1;
      border-radius: 14px;
      // margin: 0 15px;
      padding: 0 10px;
      font-size: 14px;
      color: #758593;
      border: 1px solid #19a0f2;
      input {
        margin: 0;
        padding: 0;
        background: none;
        border: none;
        outline: none;
        height: 100%;
        width: 100%;
        font-size: 16px;
        color: #758593;
        font: 400 13.3333px Arial;
      }
      input:focus {
        border: none;
      }
      .icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
    .textBtn {
      margin-left: 20px;
      -webkit-appearance: none;
      box-sizing: border-box;
      transition: 0.1s;
      span {
        color: #409eff;
        background: 0 0;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}
/*/头部(含搜索框)*/

/* 联想栏 */
.thank-box {
  ul {
    width: 100%;
    padding: 0;
    margin: 0;
    .disable {
      color: #999;
    }
    li {
      margin: 0;
      list-style: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 8px 20px;
      .icon {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
      .content {
        margin-left: 10px;
      }
    }
    li:hover {
      background-color: #e5e5e5;
    }
  }
}
/* /联想栏 */
// 距离head栏的宽度
.headTopMargin {
  margin-top: 54px;
}

/* 历史栏 */
.history-box {
  display: flex;
  flex-direction: column;
  height: auto;
  //头部
  .history-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 5px 0;
    h4 {
      margin: 0;
    }
    .history-more {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 15px;
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
  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    //标签
    .history-tags {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: start;
      overflow: hidden;
      margin-right: 10px;

      .tag {
        display: flex;
        flex-direction: row;
        max-height: 1.4em;
        font-size: 13px;
        justify-content: center;
        align-items: center;
        padding: 5px 8px;
        background-color: #f0f0f0;
        border: 1px solid #eee;
        border-radius: 14px;
        margin: 5px 8px;
      }

      .topBar {
        display: flex;
        width: 1.5em;
        height: 1.5em;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
        border: 1px solid #eee;
        margin: 10px 15px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }

    .topBar {
      position: absolute;
      right: -5px;
      display: flex;
      width: 1.5em;
      height: 1.5em;
      justify-content: flex-start;
      align-items: center;
      background-color: #f0f0f0;
      border: 1px solid #eee;
      margin: 10px 15px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
    .fff {
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
      transition: all, 0.6s ease;
    }
    .rrr {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
      transition: all, 0.6s ease;
    }
  }
}
/* /历史栏 */

//tab选项卡底下的歌曲列表

.hideOverFlow::-webkit-scrollbar {
  -ms-overflow-style: none; // IE 10+
  scrollbar-width: none; // Firefox}.container::-webkit-scrollbar {
  display: none; // Safari and Chrome}
  overflow: -moz-scrollbars-none;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  // width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  // height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
  animation: myfirst 0.6s;
  -moz-animation: myfirst 0.6s; /* Firefox */
  -webkit-animation: myfirst 0.6s; /* Safari and Chrome */
  -o-animation: myfirst 0.6s; /* Opera */
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.music-box {
  box-sizing: border-box;

  ul {
    width: 100%;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden; //设置Y轴出现滚动条，X轴隐藏
    overflow-y: overlay;
    max-height: 700px;
    .disable {
      font-size: 15px;
      font-weight: 600;
      justify-content: stretch;
    }
    li:last-child {
      margin-bottom: 100px;
    }
    li {
      margin: 0;
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px 10px;
      .musicInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        .musicName {
          width: 100%;
          color: #1c1c1c;
          font-size: 14px;
          font-weight: 500;
        }
        .subName {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          .subName-content {
            margin-left: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            -ms-text-overflow: ellipsis;
            display: box;
            display: -webkit-box;
            line-clamp: 1;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            color: #707070;
            font-size: 12px;
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

      .station {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .covarBox {
          width: 60px;
          height: 60px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
        .albumInfo {
          display: flex;
          flex-direction: column;
          align-items: center;
          .name {
            width: 100%;
            color: #1c1c1c;
            font-size: 14px;
            font-weight: 500;
          }
          .subName {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            .subName-content {
              overflow: hidden;
              text-overflow: ellipsis;
              -ms-text-overflow: ellipsis;
              display: box;
              display: -webkit-box;
              line-clamp: 1;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              color: #707070;
              font-size: 12px;
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
      }

      .toolBar {
        display: flex;
        flex-direction: row;
        align-items: center;
        .bar {
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

      .icon {
        width: 22px;
        height: 22px;
        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
      .content {
        margin-right: 10px;
      }

      .albumInfo {
      }
    }
    li:hover {
      background-color: #e5e5e5;
    }
  }
}
</style>