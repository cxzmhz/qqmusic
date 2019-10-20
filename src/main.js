import 'babel-polyfill'
import Vue from "vue";
import App from "./App";
import fastclick from 'fastclick'
import router from "./router"
import VueLazyload from "vue-lazyload"
import store from "./store"
import axios from "axios";

import "common/stylus/index.styl"
router.beforeEach((to, from, next) => {
   if (to.path.includes("loginAndout")) {
      next();
   } else {
      axios.get("/test/users").then(res => {
         if (res.data.code == 1) {
            next()
         } else {
            next("/loginAndout")
         }
      })
   }
})

fastclick.attach(document.body)
Vue.use(VueLazyload, {
   loading: require('common/image/default.png')
})

new Vue({
   el: "#app",
   router,
   store,
   render: h => h(App)
})