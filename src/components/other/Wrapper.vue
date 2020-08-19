<template>
  <div>
   
    <!--  :class="['wrapper',isShow?'fade-in':'fade-out']" -->
    <div
      :class="['wrapper',isShow?'fade-in':'fade-out']"
      v-if="isShow"
      :style="{
        'width': width,
        'height': height,
        'backgroundColor': backgroundColor,
        'backdrop-filter':filter?'blur(45px)':'',
        'opacity':filter?'0.9':'1'
      }"
    >
      <div class="wrapper-content">
        <slot></slot>
      </div>
    </div>
    <div class="cover" v-if="isShow&&showMask" @click="sw" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    modal: {
      type: Boolean,
      default: false,
    }, //模态
    filter: {
      type: Boolean,
      default: false,
    },
    showMask: {
      type: Boolean,
      default: true,
    }, //显示遮盖层
    width: {
      type: String,
      default: "100%",
    }, //模态
    height: {
      type: String,
      default: "auto",
    }, //模态
    backgroundColor: {
      type: String,
      default: "#F0EFEC",
    },
  },
  methods: {
    sw() {
      const self = this;
      setTimeout(function () {
        self.isShow = !self.isShow;
      }, 200);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@keyframes moveTop {
  0% {
    transform: translate3d(0, 100%, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-webkit-keyframes moveTop {
  0% {
    transform: translate3d(0, 100%, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}


@keyframes moveBottom {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 100%, 0);
    opacity: 1;
  }
}

@-webkit-keyframes moveBottom {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 100%, 0);
    opacity: 1;
  }
}

.cover {
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(#000, 0.75);
  z-index: 900;
  transition: all 0.6s ease;
  transition: background 0.6s ease-in-out;
  &.mask-fade {
    background-color: rgba(rgb(187, 177, 177), 0);
    opacity: 0.2;
  }
}
.wrapper {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  border-radius: 8px 8px 0 0;
  padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
  .wrapper-content {
    width: 100%;
    height: 100%;
    padding: 12px;
    display: flex;
    justify-content: end;
    flex-direction: column;
    overflow: auto;
    box-sizing: border-box;
  }
}
.fade-in {
  animation: moveTop 0.5s forwards;
  -webkit-animation:moveTop 0.5s forwards;
}
.fade-out {
  animation: moveBottom 0.5s forwards;
  -webkit-animation: moveBottom 0.5s forwards;
}
</style>