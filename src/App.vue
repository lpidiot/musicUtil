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
    };
  },
  methods: {
    playerTrigger() {
      this.$refs.player.trigger();
    },
    play(){
      this.$refs.player.play();
    },
    updatePlayingList(idx,now){
      this.$refs.player.updatePlayingList(idx,now);
    }
  },
};
</script>

<style lang="scss">

</style>
