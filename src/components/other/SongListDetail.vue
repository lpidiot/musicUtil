<template>
  <div>
    <div v-for="(item, index) in audios" :key="index">
      <VueAudio :theUrl="item.url" theControlList="noDownload noSpeed onlyOnePlaying" />
    </div>

    <div class="toolbarBox">
      <div class="toolbar">ads</div>
      <div class="toolbar">ads</div>
      <div class="toolbar">ads</div>
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
      audios: [
        {
          url: require("../../assets/music/aaa.mp3"),
          controlList: "noDownload noSpeed onlyOnePlaying",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style scoped lang="scss">
.toolbarBox {
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 10px;
  justify-items: center;
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
}
</style>