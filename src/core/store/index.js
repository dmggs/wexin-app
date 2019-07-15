import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    foodList: []
  },
  mutations: {
    add: (state, data) => {
      var bool = true
      if (state.foodList.length != 0) {
        state.foodList.forEach((item) => {
          if (item.id == data.id) {
            item.num++
            bool = false
          }
        })
      }
      if (bool) {
        data.num = 1;
        state.foodList.push(data)
      }
   
    },
    del: (state, data) => {
        state.foodList.forEach((item,index)=>{
            if (item.id == data.id) {
              item.num--
              if (item.num==0) {
                state.foodList.splice(index,1)
                
              }

            }
        })
       
    }
    
    
    
  }
})

export default store
