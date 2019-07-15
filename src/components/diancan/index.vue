<template>
  <div class="content">
    <scroll-view scroll-y style="height: 500px" class="left">
      <ul>
        <p>
          <i-icon type="search" size="35" />
        </p>
        <li
          v-for="(item,index) in goodlist"
          :key="index"
          @click="active(index)"
          :class="num==index?'act1':''"
        >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </scroll-view>
    <scroll-view
      scroll-y
      style="height: 400px"
      class="right"
      :scroll-into-view="scrollId"
      @scroll="scroll"
      @scrolltolower="scrolltolower"
    >
      <ul>
        <li v-for="(item,index) in goodlist" :key="index" class="cls">
          <span class="title" :id="'po'+index">{{item.name}}</span>
          <ul>
            <li v-for="(el,num) in item.list" :key="num" class="ccllss">
              <div class="main">
                <div class="main_left">
                  <img :src="el.img" alt />
                </div>
                <div class="main_right">
                  <p>{{el.name}}</p>
                  <p class="descript">{{el.descript}}</p>
                  <p class="member_price">
                    <span class="price">￥{{el.member_price}}</span>
                    <span v-if="el.unit.length>0?true:false" class="formerprice">/{{el.unit}}</span>
                    <span
                      v-if="el.formerprice==0?false:true"
                      class="formerprice"
                    >￥{{el.formerprice}}</span>
                  </p>
                  <div class="xd">
                    <div class="del" @click="delnum(el)" v-show="el.point==0?false:true">
                      <span>-</span>
                    </div>
                    <div class="xs-price" v-show="el.point==0?false:true">
                      <span>{{el.point}}</span>
                    </div>
                    <div class="add" @click="addnum(el)">
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="heng"></div>
            </li>
          </ul>
        </li>
      </ul>
    </scroll-view>
    <div class="list">
      <div>
        <div class="list-header">
          <span>购物车</span>

          <span style="padding-left:65px" @click="handleOpen2()">
            <i-icon type="trash" size="26" />清空购物车
          </span>
          <i-modal :visible="visible2" @ok="handleClose2" @cancel="handleClose3">
            <view>确定删除购物车吗?</view>
          </i-modal>
        </div>
        <ul>
          <li v-for="(item,index) in foodList" :key="index" class="list-li">
            <div class="list-li1">
              <p>{{item.name}}</p>
            </div>
            <div class="list-li2">
              <p style="color:#f87a7c">{{item.price}}</p>
            </div>
            <div class="xd">
              <div class="del" @click="delhand(item,index)">
                <span>-</span>
              </div>
              <div class="xs-price">
                <span>{{item.num}}</span>
              </div>
              <div class="add" @click="addhandle(item,index)">
                <span>+</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart">
      <div class="icon">
        <i-icon type="publishgoods_fill" size="50" @click="handleOpen1" />
      </div>
      <div class="price">
        <span>￥{{allprices}}</span>
      </div>
      <div class="gwc">
        <span>去结算</span>
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {
      goodlist: [],
      scrollId: "",
      num: 0,
      scrollTop: [],
      listHeight: [],
      numprice: 0,
      visible1: false,
      foodList: [],
      allprices: 0,
      visible2: false
    };
  },

  components: {
    card
  },

  methods: {
    handleClose2(){
     this.foodList=[]
       this.visible2 = false;
     
    },
    handleClose3(){
      
       this.visible2 = false;
     
    },

    handleOpen2() {
      this.visible2 = true;
    },
    handleOpen1() {

      this.visible1 = true;
    },
    addhandle(item, index) {
      item.num++;
      this.$set(this.foodList, index, this.foodList[index]);
      // this.cartList.map((item)=>{
      //   if(id==item.id){
      //     item.num++;
      //   }
      // })
      // console.log(this.cartList);
    },
    delhand(item, index) {
      this.$set(this.foodList, index, this.foodList[index]);
      item.num--;
      if (item.num <= 0) {
        this.foodList.splice(index, 1);
      }
    },
    addnum(el) {
      el.point++;
      // this.$store.commit("add", el);
      var bool = true;
      if (this.foodList.length != 0) {
        this.foodList.forEach(item => {
          if (item.id == el.id) {
            item.num++;
            bool = false;
          }
        });
      }
      if (bool) {
        el.num = 1;
        this.foodList.push(el);
      }
      // this.cartList=[];
      // this.cartList.push(...this.foodList)
    },
    delnum(el) {
      el.point--;
      if (el.point == 0) {
        el.point = 0;
      }
      this.foodList.forEach((item, index) => {
        if (item.id == el.id) {
          item.num--;
          if (item.num == 0) {
            this.foodList.splice(index, 1);
          }
        }
      });
    },
    active(index) {
      this.num = index;

      this.scrollId = "po" + index;
    },
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
    getNodesData() {
      var query = wx.createSelectorQuery();
      query
        .selectAll(".cls")
        .boundingClientRect(nodes => {
          nodes.map(item => {
            this.listHeight.push(item.top);
          });
        })
        .exec();
    },
    scrolltolower() {
      setTimeout(() => {
        this.num = this.listHeight.length - 1;
      }, 80);
    }
  },
  computed: {
    currentIndex() {
      this.scrollTop = this.scrollTop + 200;
      for (var i = 0; i < this.listHeight.length; i++) {
        var height1 = this.listHeight[i];
        var height2 = this.listHeight[i + 1];
        if (this.scrollTop >= height1 && this.scrollTop < height2) {
          this.num = i;
          return i;
        }
      }
      return 0;
    }
  },
  watch: {
    foodList: {
      handler: function(newVal, oldVal) {
        // console.log(this.foodList);
        // console.log(oldVal);
        var p = 0;
        this.foodList.forEach(element => {
          p += element.num * element.price;
        });
        this.allprices = p.toFixed(2);
      },
      deep: true
    }
  },
  mounted() {
    // console.log(this.$store.state.foodList)
    let goodlist = [];
    this.$apis.getfood().then(res => {
      res.data.foodtype.forEach((item, index) => {
        goodlist.push({
          name: item.name,
          id: item.id,
          list: []
        });
        res.data.foodlist.forEach(el => {
          if (el.type_id == goodlist[index].id) {
            goodlist[index].list.push(el);
          }
        });
      });

      this.goodlist = goodlist;
      setTimeout(() => {
        this.getNodesData();
      }, 80);
    });
  }
};
</script>
<style lang="scss" scoped>
.list {
  background: #fff;
  position: fixed;
  width: 100%;
  bottom: 50px;
  .list-header {
    display: flex;
    justify-content: space-around;
    background: #f4f4f4;
    padding: 8px 0;
  }
  .list-li {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    .list-li1 {
      width: 120px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.xd {
  display: flex;
  width: 100px;
  justify-content: space-around;
  .xs-price {
    span {
      font-size: 16px;
      line-height: 25px;
    }
  }
  .del {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid #ddd;
    text-align: center;
    span {
      font-size: 22px;
      font-weight: bolder;
      line-height: 22px;
    }
  }
  .add {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: goldenrod;
    text-align: center;
    span {
      font-size: 22px;
      font-weight: bolder;
      line-height: 22px;
    }
  }
}

.cart {
  height: 50px;
  width: 100%;
  background: #999;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  .icon {
    width: 50px;
    height: 50px;
    background: goldenrod;
    border-radius: 50%;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .price {
    line-height: 50px;
    padding-right: 50px;
    color: #f5f5f5;
    font-size: 20px;
    font-weight: bold;
  }
  .gwc {
    background: #2e2d2d;
    padding: 0 20px;
    line-height: 50px;
    text-align: center;
    color: #f5f5f5;
  }
}
.act1 {
  background: #fff;
  color: #f87a7c;
  border-left: 2px solid #f87a7c;
}
.content {
  display: flex;
  .left {
    background-color: #f5f5f5;
    width: 110px;
    text-align: center;
    span {
      font-weight: 400;
      height: 60px;
      text-align: center;
      line-height: 50px;
      font-size: 15px;
    }
  }
  .right {
    .heng {
      width: 280px;
      height: 1px;
      background: #ccc;
      margin-left: 5px;
      margin-top: 10px;
    }

    .cls {
      margin-bottom: 5px;

      padding: 10px 0;
      .ccllss {
        padding: 15px 0;
      }
    }
    .title {
      font-weight: bolder;
    }
    img {
      width: 65px;
      height: 65px;
    }
    .main {
      display: flex;
      .main_right {
        padding-left: 10px;
        width: 200px;
      }
    }
    .descript {
      font-size: 14px;
      color: #a9a9a9;
      margin-top: 5px;
    }
    .member_price {
      margin-top: 5px;
      .price {
        color: #f87a7c;
      }
      .formerprice {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>
