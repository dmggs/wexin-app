<template>
  <div>
    <scroll-view scroll-y style="height: 430px;">
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
          <i-rate count="5" value="5" size="15"></i-rate>
          <span class="fontcolor">10</span>
          <i-rate count="5" value="4" size="15"></i-rate>
          <span class="fontcolor">0</span>
          <i-rate count="5" value="3" size="15"></i-rate>
          <span class="fontcolor">0</span>
          <i-rate count="5" value="2" size="15"></i-rate>
          <span class="fontcolor">0</span>
          <i-rate count="5" value="1" size="15"></i-rate>
          <span class="fontcolor">3</span>
        </div>
      </div>
      <div class="pingjia">
        <ul>
          <li
            v-for="(item,index) in getgaderlist.tag_num"
            :key="index"
            :class="actnum==index?'act':''"
            @click="acttab(index)"
          >
            {{item.name}}
            <span>({{item.num}})</span>
          </li>
        </ul>
      </div>
      <div class="neirong">
        <ul>
          <li v-for="(item,index) in list.comments" :key="index">
            <div class="top">
              <span>{{item.lewaimai_customer_id}}</span>
              <i-rate count="5" :value="item.grade" size="15"></i-rate>
            </div>
            <div class="mid">
              <p class="message">{{item.content}}</p>
              <p v-if="item.imgurl.length>0?true:false">
                <!-- <i-button type="ghost" @click="handleImage(item.imgurl[0])"> -->
                      <img :src="'https://img.zhipuzi.com'+item.imgurl[0]" alt />
                <!-- </i-button> -->
              
              </p>
              <p class="time">{{item.time}}</p>
            </div>
          </li>
        </ul>
      </div>
    </scroll-view>
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
      list: [],
      actnum: 0,
      getgaderlist: {}
    };
  },
  mounted() {
    this.pageinit();
  },
  methods: {
    handleImage (img) {
        $Toast({
            content: '使用自定义图片',
            image: "https://img.zhipuzi.com"+img
        });
    },
    acttab(index) {
      this.actnum = index;
      this.pageinit();
    },
    pageinit() {
      this.$apis.getinfo(this.actnum).then(res => {
        this.list = res.data;
      });
      this.$apis.getgader().then(res => {
        this.getgaderlist = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.act {
  border-color: #f87a7c !important;
  color: #f87a7c !important;
  background-color: #ffe7e7;
}
.fontcolor {
  color: #fdbc3f;

  margin-left: 20px;
}
.mian {
  display: flex;
  justify-content: space-around;
  border-bottom: 8px solid #cccc;
  padding-bottom: 30px;
  .left {
    width: 150px;
    margin-top: 30px;
    border-right: 2px solid #ccc;

    text-align: center;
    .p1 {
      color: #f87a7c;
      font-size: 26px;
    }
  }
  .right {
    width: 150px;
    height: 100px;
  }
}
.pingjia {
    border-bottom: 8px solid #cccc;
    padding: 15px 0;
  ul {
    display: flex;
    li {
      border: 1px solid #c2c2c2;
      padding: 0 15px;
      border-radius: 15px 15px;
      margin-left: 10px;
      height: 30px;
      line-height: 30px;
    }
  }
}
.neirong {
  .top {
    width: 350px;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
  }
  .message {
    width: 350px;
    margin-left: 10px;
    font-size: 15px;
    padding: 10px 0;
  }
  .time{
    margin-left: 200px;
  }
  .mid{
    margin-top: 10px;
  }
}
</style>

