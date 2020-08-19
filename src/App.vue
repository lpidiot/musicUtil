<template>
  <div id="app">
    <router-view></router-view>
    <player ref="player"/>
  </div>
</template>

<script>
import Player from "../src/components/other/Player"
export default {
  components:{
    Player
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    playerTrigger() {
      this.$refs.player.trigger();
    },
    play(){
      this.$refs.player.play();
    }
  },
};
</script>

<style lang="scss">
.aaa {
  z-index: 999999;
  position: fixed;
  bottom: 20px;
}
</style>
