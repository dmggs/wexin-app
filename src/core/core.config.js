import store from "./store"
import Apis from "./api"
export default ((Vue)=>{
    Vue.prototype.$store=store
    Vue.prototype.$apis=Apis;
    Vue.prototype.$eventHub=new Vue();
})