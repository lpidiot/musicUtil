<template>
  <div
    class="backgroundBox"
    :style="[{'background-image':'url(https://qpic.y.qq.com/music_cover/Z89aLA93LOSOicz0QOnMbonRk9ySaEU2phYUYiajyZxCBvgOZrSPDswg/300?n=1)'}]"
  >
    <div :class="hg">
      <div class="player-head-wyy">
        <div class="head-wyy-btn">
          <img src="@/assets/images/back.png" alt />
        </div>
        <div class="head-wyy-title">
          song
          <div class="head-wyy-title-subtit">Album</div>
        </div>
        <div class="head-wyy-btn">
          <img src="@/assets/images/share.png" alt />
        </div>
      </div>
      <div class="around-box">
        <div class="around1">
          <div class="around2"></div>
        </div>
      </div>

      <div class="player-content">
        <div :class="['bracket',isPlaying?'':'rotate']"></div>
        <div class="whiteRound">
          <div :class="['msk','animation',isPlaying?'running':'stop']">
            <img
              class="cover"
              src="http://p1.music.126.net/Nagysgn-c_pyLwHSTsFtXQ==/109951164514817375.jpg?param=130y130"
            />
          </div>
        </div>
      </div>

      <div class="control-box">
        <VueAudio
          ref="audio"
          :theUrl="audioUrl"
          theControlList="noDownload noSpeed onlyOnePlaying"
        />
        <div class="toolbar-box">
          <!-- <div class="toolbar">
            <img src="@/assets/images/stop.png" alt />
          </div>-->
          <div class="toolbar">
            <img src="@/assets/images/circle.png" style=" width: 25px;
          height: 25px;" alt />
          </div>
          <div class="toolbar">
            <img src="@/assets/images/prev.png" style=" width: 25px;
          height: 25px;" alt />
          </div>

          <div v-if="isPlaying" class="toolbar" @click="play()">
            <img src="@/assets/images/stop.png" alt />
          </div>
          <div v-else class="toolbar" @click="play()">
            <img src="@/assets/images/c_play.png" alt />
          </div>

          <div class="toolbar">
            <img src="@/assets/images/next.png" style=" width: 25px;
          height: 25px;" alt />
          </div>

          <div class="toolbar">
            <img src="@/assets/images/menu.png" style=" width: 25px;
          height: 25px;" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueAudio from "../other/VueAudio";
export default {
  components: {
    VueAudio,
  },
  data() {
    return {
      isPlaying: false,
      audioUrl: require("../../assets/music/aaa.mp3"),
    };
  },
  methods: {
    play() {
      this.isPlaying = !this.isPlaying;
      this.$refs.audio.startPlayOrPause();
    },
  },
  computed: {
    hg() {
      var s = ["player-container"];
      if (
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent)
      ) {
        localStorage.setItem("isSafari", 1);
        return ["player-container", "safariheight"];
      }
      return ["player-container"];
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes around {
  from {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}

/* Firefox */
@-moz-keyframes around {
  from {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}

/* Safari and Chrome */
@-webkit-keyframes around {
  from {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
/* Opera */
@-o-keyframes around {
  from {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
.animation {
  animation: around 18s infinite linear;
  -webkit-animation: around 18s infinite linear;
}
.stop {
  animation-play-state: paused;
  -webkit-animation-play-state: paused; /* Safari 和 Chrome */
}
.running {
  animation-play-state: running;
  -webkit-animation-play-state: running; /* Safari 和 Chrome */
}

.backgroundBox {
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  width: 100%;
}
.player-container {
  width: 100%;
  height: 100vh;
  -webkit-backdrop-filter: blur(45px);
  backdrop-filter: blur(45px);
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
  .player-head-wyy {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0;
    .head-wyy-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
    }

    .head-wyy-title {
      color: white;
      font-size: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .head-wyy-title-subtit {
        display: flex;
        align-content: center;
        justify-content: center;
        font-size: 14px;
      }
    }
  }
  .player-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .bracket {
      position: absolute;
      z-index: 1;
      left: calc(50% + 16px);
      top: 97px;
      -webkit-transform-origin: top left;
      transform-origin: top left;
      -webkit-transform: translate(-40%) rotate(0deg);
      transform: translate(-40%) rotate(0deg);
      -webkit-transition: -webkit-transform 0.2s;
      transition: -webkit-transform 0.2s;
      transition: transform 0.2s;
      transition: transform 0.2s, -webkit-transform 0.2s;
      width: 2rem;
      height: 0;
      padding-bottom: 2.5rem;
      background-image: url("../../assets/images/nrJyJP.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      transition: all 0.6s ease;
    }
    .rotate {
      transform: translate(-40%) rotate(-16deg);
      transition: all 0.6s ease;
    }

    .whiteRound {
      position: absolute;
      top: 145px;
      width: 270px;
      height: 270px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      padding: 1.5%;
      display: flex;
      justify-content: center;
      align-items: center;

      .msk {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        background: url("../../assets/images/bol.png") no-repeat;
        background-size: cover;
        box-sizing: border-box;
        padding: 0;
        .cover {
          width: 172px;
          height: 172px;
          margin: 48px;
          border-radius: 50%;
        }
      }
    }
  }
  .around-box {
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 auto;
    width: 13px;
    height: 13px;
    position: relative;
    border-radius: 50%;
    padding: 1%;
    z-index: 99;
    .around1 {
      width: 97%;
      height: 97%;
      background-color: #fff;
      border-radius: 50%;
      padding: 1.5%;
      display: flex;
      justify-content: center;
      align-items: center;
      // background: linear-gradient(#101012, #272729, #101012);
      .around2 {
        width: 40%;
        height: 40%;
        background-color: #dedede;
        z-index: 99;
        border-radius: 50%;
      }
    }
  }

  .control-box {
    width: calc(100% - 20px);
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 30px;
    box-sizing: border-box;
    flex-direction: column;

    .toolbar-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 5px 0;
      .toolbar {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
</style>
<style>
.el-slider__button {
  border: none !important;
  width: 10px !important;
  height: 10px !important;
}
.el-slider__runway {
  height: 1.5px !important;
  background-color: #b2babb !important;
}
.el-slider__button-wrapper {
  top: -0.43rem !important;
}
.el-slider__bar {
  height: 1.5px !important;
  background-color: #eee !important;
}
</style>