<template>
  <div
    class="backgroundBox"
    :style="[{'background-image':'url(https://qpic.y.qq.com/music_cover/Z89aLA93LOSOicz0QOnMbonRk9ySaEU2phYUYiajyZxCBvgOZrSPDswg/300?n=1)'}]"
  >
    <div class="player-container" @click="changePlay">
      <div class="player-head">
        <div>返回</div>
        <div>丸之内虐待狂</div>
        <div>更多</div>
      </div>
      <div class="player-content">
        <div :class="['bracket',isStop?'rotate':'']">
          <!-- <img src="@/assets/images/nrJyJP.png" /> -->
        </div>
        <div :class="['msk','animation',isStop?'stop':'running']">
          <img
            class="cover"
            src="http://p1.music.126.net/Nagysgn-c_pyLwHSTsFtXQ==/109951164514817375.jpg?param=130y130"
          />
        </div>
      </div>
      <div class="toolbar-box">
        <div class="bar">
          <img src />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isStop: false
    };
  },
  methods: {
    changePlay() {
      this.isStop = !this.isStop;
    }
  }
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
  height: 100vh;
}
.player-container {
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(45px);
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  .player-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .player-content {
    height: 500px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .bracket {
      position: absolute;
      z-index: 1;
      left: 55%;
      top: 50px;
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
      background-image: url(https://s3.music.126.net/mobile-new/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862=);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      transition: all 0.6s ease;
    }
    .rotate {
      transform: translate(-40%) rotate(-16deg);
      transition: all 0.6s ease;
    }
    // .msk {
    //   position: absolute;
    //   height: 100vh;
    //   background: url(https://s2.music.126.net/style/web2/img/coverall.png?de57f1fd876defc937c110aeb0ed6a17)
    //     no-repeat;
    //   width: 206px;
    //   height: 205px;
    //   top: -4px;
    //   left: -4px;
    //   background-position: -140px -580px;
    //   border-radius: 50%;
    // }
    .msk {
      position: absolute;
      top: 93px;
      background: url(https://s3.music.126.net/mobile-new/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48=)
        no-repeat;
      background-size: cover;
      box-sizing: border-box;
      width: 200px;
      height: 200px;
      .cover {
        width: 130px;
        height: 130px;
        margin: 34px;
        border-radius: 50%;
      }
    }
  }
}
</style>