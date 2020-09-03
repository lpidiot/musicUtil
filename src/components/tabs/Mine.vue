<template>
  <div>
    <div class="container">
      <div class="musicList-head">
        <h3>我的歌单</h3>
        <div class="station">
          <div class="musicList-more">
            <div>新增&nbsp;&nbsp;</div>
            <i class="el-icon-plus"></i>
            <!-- <div class="lcon-more">
              <img src="../../assets/images/add.png" />
            </div>-->
          </div>

          <div class="musicList-more" @click="mesBoxClick">
            <div>导入</div>
            <i class="el-icon-upload"></i>
          </div>
        </div>
      </div>
      <div class="songListBox">
        <div class="coverBox" :style="conheight" @click="openLocalSongList" ref="qqq">
          <img src="@/assets/images/taiga.jpg" alt />
        </div>
        <div class="songLIstInfo">播放列表</div>
      </div>

      <div class="songListBox" v-for="item in mySongList" :key="item.id" @click="openSongList(item.id)">
        <div class="coverBox" :style="conheight">
          <img :src="item.logo||'@/assets/images/cover.jpg'" alt />
        </div>
        <div class="songLIstInfo">{{item.songListName}}</div>
      </div>
    </div>
    <MessageBox
      ref="importSong"
      height="200px"
      headText="导入歌单"
      :cancel="mesBoxClick"
      :confirm="importSongList"
    >
      <div class="importContainer">
        <div class="importBox">
          <input type="text" v-model="songListUrl" placeholder="输入歌单url" />
        </div>
      </div>
    </MessageBox>
  </div>
</template>

<script>
import MessageBox from "../other/MessageBox";
export default {
  components: {
    MessageBox,
  },
  data() {
    return {
      conheight: {
        height: "",
      },
      songListUrl: "",
      mySongList: [],
    };
  },
  methods: {
    openLocalSongList() {
      this.$showSongList("local", null, this);
    },
    async importSongList() {
      var url = this.songListUrl.replace(/ /g, "");
      if (url == "") {
        return;
      }
      var headNum = url.indexOf("id=");
      if (headNum < 0) {
        this.$message("url格式错误");
        return;
      }
      const loading = this.$getLoading("处理中。。。");
      var foot = url.substring(headNum);
      var id = foot.substring(3, foot.indexOf("&"));
      var myList = this.$util.localUtil("mySongList");

      var result = await this.$getData(
        "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",
        {
          header: {
            origin: "https://y.qq.com",
            referer: "https://y.qq.com/n/yqq/playlist/" + id + ".html",
          },
          params: {
            type: "1",
            json: "1",
            utf8: "1",
            onlysong: "0",
            new_format: "1",
            disstid: id,
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
        false
      );

      if (result) {
        var data = result.cdlist[0];
        if (data) {
          myList.push({
            id: id,
            songListName: data.dissname,
            author: data.nickname,
            describe: data.desc,
            logo: data.logo,
          });
        }
      }
      if (myList.length > 0) {
        this.$util.localUtil("mySongList", myList);
        this.mySongList = myList;
      }
      this.mesBoxClick();
      loading.close();
      //this.$showSongList("songList", id, this);
    },
    openSongList(id) {
      this.$showSongList("songList", id, this);
    },
    getHeight() {
      this.conheight.height = this.$refs.qqq.offsetWidth + "px";
    },
    mesBoxClick() {
      this.$refs.importSong.sw();
    },
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.mySongList = this.$util.localUtil("mySongList");
  },
  mounted() {
    this.getHeight;
  },
  beforeDestroy() {
    window.addEventListener("resize", null);
  },
};
</script>

<style scoped lang="scss">
.musicList-head {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 5px;
  height: 30px;
  h3 {
    margin: 0;
  }
  .station {
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .musicList-more {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 5px;
    }
  }
}
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-top: 10px;
}
.songListBox {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 5px;
  box-sizing: border-box;
  .coverBox {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      overflow: hidden;
      //border: 1px solid #515151;
      border-radius: 5px;
      display: block;
    }
  }
  .songLIstInfo {
    display: flex;
    flex-direction: row;
    width: 100%;
    text-align: center;
    color: #303133;
    overflow: hidden;
    text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
.importContainer {
  width: 100%;
  height: 110px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 10px 20px;
  justify-content: center;
  .importBox {
    width: 300px;
    height: 2.5em;
    background-color: #e5e5e5;
    padding: 0 5px;
    input {
      display: block;
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      background: none;
    }
    input:focus {
      border: none;
    }
  }
}
</style>