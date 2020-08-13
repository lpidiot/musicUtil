<template>
  <div style="padding: 0 10px;">
    <div :class="['headBox',isScroll?'border':'']">
      <div class="bar">
        <img src="@/assets/images/back_blue.png" alt />返回
      </div>
      <div class="bar roundBar">
        <img src="@/assets/images/more_blue.png" alt />
      </div>
    </div>

    <div class="interval" />
    <div class="content">
      <div class="coverBox">
        <img src="@/assets/images/test.jpg" alt />
      </div>
      <div class="info">aaa</div>
    </div>

    <div>
      asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />asaaaa
      <br />
    </div>
  </div>
</template>

<script>
import Head from "../other/Head";
export default {
  components: {},
  data() {
    return {
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
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style scoped lang="scss">
.interval {
  margin: 0;
  padding: 0;
  margin-top: 40px;
}
.border {
  border-bottom: 1px solid #c5c5c5;
  box-shadow: none;
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
  background-color: #f5f5f5;
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
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  img {
    width: 200px;
    height: 200px;
  }
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>