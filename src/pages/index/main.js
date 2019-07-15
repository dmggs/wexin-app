import Vue from 'vue'
import App from './index'
import core from "@/core/core.config.js"
Vue.use(core)
// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()
