<template>
  <div>
    <div class="container">
      <div class="musicList-head">
        <h3>官方歌单</h3>
        <div class="station">
          <div class="musicList-more">
            <div>新增&nbsp;&nbsp;</div>
            <i class="el-icon-plus"></i>
            <!-- <div class="lcon-more">
              <img src="../../assets/images/add.png" />
            </div> -->
          </div>

          <div class="musicList-more">
            <div>更多</div>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
      <div class="songListBox">
        <div class="coverBox" :style="conheight" @click="test" ref="qqq">
          <img src="@/assets/images/cover.jpg" alt />
        </div>
        <div class="songLIstInfo">我的e歌单</div>
      </div>

      <div class="songListBox">
        <div class="coverBox" :style="conheight">
          <img src="@/assets/images/cover.jpg" alt />
        </div>
      </div>

      <div class="songListBox">
        <div class="coverBox" :style="conheight">
          <img src="@/assets/images/cover.jpg" alt />
        </div>
      </div>

      <div class="songListBox">
        <div class="coverBox" :style="conheight">
          <img src="@/assets/images/cover.jpg" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conheight: {
        height: "",
      },
    };
  },
  methods: {
    test() {},
    getHeight() {
      this.conheight.height = this.$refs.qqq.offsetWidth + "px";
    },
  },
  created() {
    window.addEventListener("resize", this.getHeight);
  },
  mounted() {
    this.getHeight;
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
}
.songListBox {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 5px;
  box-sizing: border-box;
  .coverBox {
    width: 100%;
    border: 1px solid #000000;
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .songLIstInfo {
    display: flex;
    flex-direction: row;
    width: 100%;
    text-align: center;
    color: #303133;
    font-size: 15px;
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
</style>