<template>
  <div class="di main-wrap" :v-loading="audio.waiting">
    <audio
      ref="audio"
      class="dn"
      :src="url"
      :preload="audio.preload"
      @play="onPlay"
      @error="onError"
      @waiting="onWaiting"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div class="box">
      <!-- <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button> -->
      <!-- <el-button
        v-show="!controlList.noSpeed"
        type="text"
        @click="changeSpeed"
      >{{audio.speed | transSpeed}}</el-button>-->

      <el-slider
        v-show="!controlList.noProcess"
        v-model="sliderTime"
        :format-tooltip="formatProcessToolTip"
        @change="changeCurrentTime"
        class="slider"
        :show-tooltip="false"
      ></el-slider>
      <div class="progBox">
        <div class="progress">
          <div>{{ audio.currentTime | formatSecond}}</div>
          <div>{{ audio.maxTime | formatSecond }}</div>
        </div>
      </div>

      <!-- <a :href="url" v-show="!controlList.noDownload" target="_blank" class="download" download>下载</a> -->
    </div>
  </div>
</template>

<script>
function realFormatSecond(second) {
  var secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "0:00:00";
  }
}
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    theSpeeds: {
      type: Array,
      default() {
        return [1, 1.5, 2];
      },
    },
    theControlList: {
      type: String,
      default: "",
    },
  },
  name: "VueAudio",
  data() {
    return {
      audio: {
        currentTime: 0,
        maxTime: 0,
        muted: false,
        speed: 1,
        waiting: true,
        preload: "auto",
      },
      sliderTime: 0,
      speeds: this.theSpeeds,
      controlList: {
        // 不显示下载
        noDownload: false,
        // 不显示进度条
        noProcess: false,
        // 只能播放一个
        onlyOnePlaying: false,
        // 不要快进按钮
        noSpeed: false,
      },
    };
  },
  methods: {
    setControlList() {
      let controlList = this.theControlList.split(" ");
      controlList.forEach((item) => {
        if (this.controlList[item] !== undefined) {
          this.controlList[item] = true;
        }
      });
    },
    changeSpeed() {
      let index = this.speeds.indexOf(this.audio.speed) + 1;
      this.audio.speed = this.speeds[index % this.speeds.length];
      this.$refs.audio.playbackRate = this.audio.speed;
    },

    // 进度条toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },
    // 播放跳转
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    origin() {
      this.audio = {
        currentTime: 0,
        maxTime: 0,
        muted: false,
        speed: 1,
        waiting: true,
        preload: "auto",
      };
    },
    // 开始播放
    async startPlay() {
      var src = this.$refs.audio.src;
      if (src.substring(src.length - 4) == "mark") {
        this.reGet();
      }
      this.$refs.audio.play();
    },
    async reGet() {
      var localData = this.$util.localUtil("playingList", "{}");
      if (localData.songList) {
        var result = await this.$getMusic(
          localData.songList[localData.index].songId
        );
        if (result) {
          localData.songList[localData.index].url = result;
          this.$store.commit("updateList", localData.songList);
          this.$util.localUtil("playingList", localData);
        }
      }
      this.audio.waiting = true;
    },
    // 暂停
    pausePlay() {
      this.$refs.audio.pause();
    },
    // 当音频暂停
    onPause() {
      this.$store.commit("stop");
      //this.$parent.pausePlay();
      if (this.$refs.audio.ended) {
        //下一首或者单曲循环a操作
        console.log("下一首");
        //this.$parent.pausePlay();
        this.$parent.nextSong();
      }
    },
    // 当发生错误, 就出现loading状态
    async onError() {
      console.log("error");
      //链接失效 重新获取当前音乐链接
      this.reGet();
    },
    // 当音频开始等待
    onWaiting(res) {
      console.log(res);
    },
    // 当音频开始播放
    onPlay(res) {
      console.log("onPlay");
      this.audio.waiting = false;
      this.audio.maxTime = parseInt(res.target.duration);
      this.$store.commit("play");
      //这里重复设置时间是处理切换歌曲导致进度条丢失
      if (!this.controlList.onlyOnePlaying) {
        return;
      }
      let target = res.target;
      let audios = document.getElementsByTagName("audio");
      [...audios].forEach((item) => {
        if (item !== target) {
          item.pause();
        }
      });
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log('timeupdate')
      // console.log(res)
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log("loadedmetadata");
      console.log(res);
      this.audio.waiting = false;
      this.audio.maxTime = parseInt(res.target.duration);
    },
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    transMutedOrNot(value) {
      return value ? "放音" : "静音";
    },
    transSpeed(value) {
      return "快进: x" + value;
    },
  },
  created() {
    this.setControlList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.main-wrap {
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
.slider {
  display: flex;
  width: 90%;
  position: relative;
  z-index: 99;
}
.di {
  display: inline-block;
}
.download {
  color: #409eff;
  margin-left: 15px;
}
.dn {
  margin: 0;
  display: none;
}
.progBox {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.progress {
  width: 100%;
  z-index: 0;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #b2babb;
}
</style>