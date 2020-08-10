<template>
  <div class="listGroup">
    <div v-for="item in barList" :key="item.id" class="list">
      <div>{{item.title}}</div>
      <div class="list-img" :style="{width:width,height:height}">
        <img :src="item.imgUrl" />
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      barList: [
        {
          id: 1,
          title: "下载",
          imgUrl: require("@/assets/images/download.png"),
        },
        {
          id: 2,
          title: "分享",
          imgUrl: require("@/assets/images/share2.png"),
        },
        {
          id: 3,
          title: "订阅",
          imgUrl: require("@/assets/images/dinyue.png"),
        },
         {
          id: 4,
          title: "信息",
          imgUrl: require("@/assets/images/info.png"),
        },
         {
          id: 5,
          title: "列表",
          imgUrl: require("@/assets/images/list.png"),
        },
        {
          id: 7,
          title: "列表2",
          imgUrl: require("@/assets/images/list2.png"),
        },
         {
          id: 6,
          title: "设置",
          imgUrl: require("@/assets/images/setting.png"),
        }
      ],
    };
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
  },
  methods: {},
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
  .list:hover{
    background-color: #DADADF;
  }
}
.listGroup:last-child {
  margin-bottom: 0;
}
</style>