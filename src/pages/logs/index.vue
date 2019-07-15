<template>
  <div class="mian">
    <div class="left">
      <p class="p1">{{list.commentgrade}}</p>
      <p>平均得分</p>
      <p>
        (评论数
        <span style="color:#f87a7c">{{list.commentPeople}}</span>条)
      </p>
    </div>
    <div class="right">
     <i-rate count='5' value="5"></i-rate>
      <i-rate count='5' value="4"></i-rate>
       <i-rate count='5' value="3"></i-rate>
        <i-rate count='5' value="2"></i-rate>
      <i-rate count='5' value="1"></i-rate>
       
    </div>  
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";
import card from "@/components/card";

export default {
  components: {
    card
  },

  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.$apis.getinfo().then(res => {
      console.log(res.data);
      this.list = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.mian {
  display: flex;
  .left {
    width: 150px;
    height: 100px;
    border: 1px solid #000;
    text-align: center;
    .p1 {
      color: #f87a7c;
      font-size: 26px;
    }
  }
  .right {
    width: 150px;
    height: 100px;
    border: 1px solid #000;
  }
}
</style>

