import fly from "./http"

class Apis {
  // test() {
  //     // 贝思客蛋糕
  //     return fly.get("/getjson.ashx", {
  //         v: "1562722622906",
  //         c: "Index",
  //         m: "GetBannerList",
  //         Type: "1",
  //         City: "上海",
  //         BrandType: "1"
  //     })
  // }
  getfood() {
    return fly.post("/customer/common/page/food/choose?ver=v2", {
      admin_id: "88997",
      lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
      food_type: 1,
      shop_id: 374933,
      from_type: 1
    }, {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    })
  }
  getinfo(num) {
    return fly.post("/customer/crm/communion/comment/list", {
        shop_id:'374933',
        lwm_sess_token:'d1t1n6kpf8rij9clcafq15udd4',
        lwm_appid:'dh129ahsd9898123gjhjfamnxoo1',
        admin_id:'88997',
        page: '0',
        num: '20',
        tag: num,
        timestamp: '1562764971',
        nonce: '37383',
        sign: '6D7C7FB9F1FAAE4FFC7C08EC27D59502'
    }, {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    })
  }
   getgader() {      
    return fly.post("/customer/common/shop/shop/info?ver=v2", {
      shop_id: '374933',
      lwm_sess_token: 'd1t1n6kpf8rij9clcafq15udd4',
      lwm_appid: 'dh129ahsd9898123gjhjfamnxoo1',
      admin_id: '88997',
      timestamp: '1562896934',
      nonce: '04155',
      sign: 'DDEC7EBDD85744CE870A34B01DADA5ED',
      from_type: '1'
    }, {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    })
  }
}
export default new Apis();
