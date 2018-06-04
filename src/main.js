import 'babel-polyfill'
import Vue from "vue";
import App from "./App";
import fastclick from 'fastclick'
import router from "./router"
import VueLazyload from "vue-lazyload"

import "common/stylus/index.styl"

fastclick.attach(document.body)
Vue.use(VueLazyload,{
   loading: require('common/image/default.png')
})

new Vue({
   el:"#app",
   router,
   render: h=>h(App)
})