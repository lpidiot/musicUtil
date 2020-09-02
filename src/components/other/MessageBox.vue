<template>
  <!-- head+footer=90px -->
  <div>
    <div
      v-if="show"
      class="messageContainer"
      :style="{
        'width': width,
        'height': height,
        'backgroundColor': backgroundColor,
        'backdrop-filter':filter?'blur(45px)':'',
        'opacity':filter?'0.9':'1'
      }"
    >
      <div class="messageBox">
        <div class="messageHead">{{headText}}</div>
        <div class="messageContent">
          <slot></slot>
        </div>
        <div class="border-h"></div>
        <div class="messageFooter">
          <div class="toolBar" @click="cancel">{{canceText}}</div>
          <div class="border-v"></div>
          <div class="toolBar" @click="confirm">{{confirmText}}</div>
        </div>
      </div>
    </div>
    <div class="cover" v-if="show&&showMask" @click="modal?close:''" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    modal: {
      type: Boolean,
      default: true,
    }, //模态
    filter: {
      type: Boolean,
      default: false,
    },
    showHead: {
      type: Boolean,
      default: true,
    }, //显示头
    headText: {
      type: String,
      default: "标题",
    },
    canceText: {
      type: String,
      default: "取消",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    showFooter: {
      type: Boolean,
      default: true,
    }, //显示底部按钮
    cancel: {
      type: Function,
      default: function () {
        console.log("cancel");
      },
    },
    confirm: {
      type: Function,
      default: function () {
        console.log("confirm");
      },
    },
    width: {
      type: String,
      default: "300px",
    },
    height: {
      type: String,
      default: "200px",
    },
    backgroundColor: {
      type: String,
      default: "#F0EFEC",
    },
    showMask: {
      type: Boolean,
      default: true,
    }, //显示遮盖层
  },
  methods: {
    sw() {
      const self = this;
      setTimeout(function () {
        self.show = !self.show;
      }, 200);
    },
    close() {
      const self = this;
      setTimeout(function () {
        self.show = false;
      }, 200);
    },
  },
};
</script>

<style scoped lang="scss">
.messageContainer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  .messageBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .messageHead {
      position: relative;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      padding: 10px 0;
      font-size: 16px;
    }
    .messageContent {
      width: 100%;
    }
    .messageFooter {
      width: 100%;
      display: flex;
      flex-direction: row;
      position: absolute;
      bottom: 0;
      .toolBar {
        flex: 1;
        display: flex;
        justify-content: center;
        font-size: 16px;
        height: 30px;
        padding: 5px 0;
      }
    }
  }
}
.border-v {
  width: 1px;
  height: 40px;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
  border-right: 1px solid #9c9c9c;
}
.border-h {
  width: 100%;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  border-top: 1px solid #9c9c9c;
  position: absolute;
  bottom: 40px;
}
.border-left {
  border-left: 0.2px #9c9c9c solid;
}
.border-right {
  border-right: 0.2px #9c9c9c solid;
}

.cover {
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(#000, 0.3);
  z-index: 900;
  transition: all 0.6s ease;
  transition: background 0.6s ease-in-out;
  &.mask-fade {
    background-color: rgba(rgb(187, 177, 177), 0);
    opacity: 0.2;
  }
}
</style>