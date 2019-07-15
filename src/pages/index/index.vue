<template>
  <div class="header">
   <div class="header-wrapper">
<div class="f-block-1">
<div class="u-avator11">
<img
class="u-avator"
src="http://img.zhipuzi.com/upload_files/image/20190525/cae29Soa7761JuMGuhL1GRrIKg1gN44g.jpg!max80"
/>
</div>

<div class="u-block-1">
<div class="shopname">{{Datalist.shopname}}</div>
<div class="uu">
<span class="icon">
<i-icon type="systemprompt" color="#f87a7c" size="24" class="icon1" />
</span>
<span class="gonggao">{{Datalist.shop_notice}}</span>
</div>
</div>

<div class="u-collect">
<i-icon type="like" size="28" color="#fff;"/>
<p class="shoucang">收藏</p >
</div>
</div>
</div>
<div class="f-block-2"></div>






    <div class="tab">
      <ul>
        <li @click="tab(1)" :class="num==1?'act':''">点餐</li>
        <li @click="tab(2)" :class="num==2?'act':''">评价</li>
        <li @click="tab(3)" :class="num==3?'act':''">商家</li>
      </ul>
    </div>
    <div>
      <diancan v-if="num==1?true:false"></diancan>
      <pingjia v-if="num==2? true:false"></pingjia>
      <shangjia v-if="num==3? true:false"></shangjia>
    </div>
  </div>
</template>

<script>
// import card from "@/components/card";
import diancan from "@/components/diancan/index";
import pingjia from "@/components/pingjia/index";
import shangjia from "@/components/shangjia/index";
import headerss from "@/components/headerss/index";

export default {
  data() {
    return {
      num: 1,
      Datalist:{}
    };
  },

  components: {
    diancan,
    pingjia,
    shangjia
  },

  methods: {
    tab(index) {
      this.num = index;
    }
  },
  mounted() {
    this.$apis.getfood().then(res => {
this.Datalist = res.data;
console.log(res.data);
});
  }
};
</script>
<style lang="scss" scoped>
.header{
position: fixed;
top:0;
}
.header-wrapper {
width: 100%;
height: r(71);
background: #a8a383;
.f-block-1 {
display: flex;
padding: r(10) r(0);
.u-avator {
width: r(51);
height: r(51);
border-radius: 50%;
}
}
.u-block-1 {
width: r(266);
color: #fff;
/* padding-left: r(10); */
.shopname {
font-size: r(16);
}
.uu {
height: r(30);
line-height: r(30);

.i-icon {
vertical-align: top !important;
}
}

.gonggao {
width: r(242);
height: r(12);
line-height: r(12);
overflow: hidden;
font-size: r(12);
display: inline-block;
}
}
.u-collect{
width: r(60);
height: r(45);
/* margin-top: r(5); */
border-left: 2px solid #fff;
text-align: center;
}
.shoucang{
color: #fff;
font-size: r(16);
padding-top: r(6);
}
}
.f-block-2{
width: 100%;
height: r(33);
border-top: 1px dashed #fff;
background: #a8a383;
}





.act {
  border-bottom: 2px solid #f87a7c;
}
.tab {
  padding-bottom: 5px;
  ul {
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid #ccc;
    padding-bottom: 3px;
    li {
      font-size: 18px;
      color: #676767;
      height: 30px;
      line-height: 30px;
      text-align: center;
      width: 70px;
      padding-bottom: 2px;
    }
  }
}
.heads {
  
}
</style>
