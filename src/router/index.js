import Vue from "vue";
import Router from "vue-router";
import recommend from "components/recommend/recommend"
import rank from "components/rank/rank"
import search from "components/search/search"
import singer from "components/singer/singer"
import tab from "components/tab/tab"



Vue.use(Router);
export default new Router({
   routes:[
      {path:"/",redirect:"/recommend"},
      {path:"/recommend",component:recommend},
      {path:"/rank",component:rank},
      {path:"/search",component:search},
      {path:"/singer",component:singer},
      {path:"/tab",component:tab}
   ]
})
