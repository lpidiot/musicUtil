<template>
  <div>
    <div class="listGroup" v-if="isSingle">
      <div v-for="item in barList" :key="item.id" class="list" @click.prevent="item.fun?item.fun():''">
        <div>{{item.title}}</div>
        <div class="list-img" :style="{width:width,height:height}">
          <img :src="item.imgUrl" />
        </div>
      </div>
    </div>

    <div class="listGroup" v-else v-for="(arr,idx) in barList" :key="idx">
      <div v-for="item in arr" :key="item.id" class="list" @click.prevent="item.fun?item.fun():''">
        <div>{{item.title}}</div>
        <div class="list-img" :style="{width:width,height:height}">
          <img :src="item.imgUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    width: {
      type: String,
      default: "22px",
    },
    height: {
      type: String,
      default: "22px",
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    barList: {
      type: Array,
    },
  },
  methods: {},
  computed: {
    isSingle() {
      return this.$util.typeObj(this.barList[0]) == "Array" ? false : true;
    },
  },
};
</script>

<style scoped lang="scss">
.listGroup {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  .list {
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    color: black;
    padding: 8px 10px;
    margin-bottom: 2px;
    .list-img {
      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }

  .list:first-child {
    border-radius: 12px 12px 0 0;
  }
  .list:last-child {
    border-radius: 0 0 12px 12px;
    margin-bottom: 0;
  }
  .list:hover {
    background-color: #dadadf;
  }
}
.listGroup:last-child {
  margin-bottom: 0;
}
</style>