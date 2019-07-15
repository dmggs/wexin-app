<template>
  <div>
    <scroll-view scroll-y style="height: 500px">
      <div class="top">
        <img :src="dataList.share_image" alt />
      </div>
      <div class="main">
        <ul>
          <li>
            <i-rate count="5" :value="4" size="15"></i-rate>
            <span>13人已评价</span>
            <i-icon type="enter" />
          </li>
        </ul>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: {}
    };
  },
  mounted() {},
  computed: {},
  mounted() {
    this.$apis.getgader().then(res => {
      this.dataList = res.data.shop;
      console.log(this.dataList);
    });
  }
};
</script>



<style lang="scss" scoped>
.top {
  img {
    width: 100%;
    height: 265px;
    display: block;
  }
}
.main{
  ul{
    li{
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>

