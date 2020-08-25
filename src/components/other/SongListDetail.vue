<template>
<transition>
  <div  v-if="show" class="fixed">
    <div :class="['headBox',isScroll?'border':'']">
      <div class="bar" @click="back">
        <img src="@/assets/images/back_blue.png" alt />返回
      </div>
      <div class="bar roundBar">
        <img src="@/assets/images/more_blue.png" alt />
      </div>
    </div>

    <div class="appear" v-if="!isSinger">
      <div class="filterBox filter">
        <div class="cover">
          <img
            src=" https://qpic.y.qq.com/music_cover/xCubmCUxl5icKI16GSM3EXzEGy5zIMr41cqzwBYhFciaKwMmwwLN2Y3w/300?n=1
"
            alt
          />
          
        </div>
        <div class="infoBox">
          <div class="info">aaaa的a歌单</div>
          <div class="info">周杰伦</div>
          <div
            class="subInfo"
          >介绍balabala介绍balabala介绍balabala介绍balabala介绍balabala介绍balabala介绍balabala介绍balabala介绍balabala</div>
        </div>
      </div>
    </div>

    <div class="appear" v-else>
      <div class="filterBox">
          <div class="singer">周杰伦</div>
      </div>
    </div>

    <div class="list-box">
      <div class="list-item">
        <div class="content">
          <div class="info">aaa</div>
          <div class="subInfo">vvv</div>
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

      <div class="list-item">
        <div class="content">
          <div class="info">七里香</div>
          <div class="subInfo">vvv</div>
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
      isSinger:false,
      show: false,
      isScroll: false,
    };
  },

  methods: {
    handleScroll() {
      const self = this;
      var scrolltopTemp =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrolltopTemp != 0) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    },
    back(){
      this.show=false;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style scoped lang="scss">
.v-enter,.v-leave-to{
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
.fixed{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #f5f5f5;
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
  // background-color: #f5f5f5;
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

.appear {
  background-image: url(https://qpic.y.qq.com/music_cover/xCubmCUxl5icKI16GSM3EXzEGy5zIMr41cqzwBYhFciaKwMmwwLN2Y3w/300?n=1);
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
    height: 250px;
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
  margin-top: 40px;
  display: flex;
  flex-direction: column;
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