import Vue from "vue";
import Router from "vue-router";
import recommend from "components/recommend/recommend"
import rank from "components/rank/rank"
import search from "components/search/search"
import singer from "components/singer/singer"
import tab from "components/tab/tab"
import show from "components/show/show"
import upload from "components/upload/upload"
import loginAndout from "components/loginAndout/loginAndout"
import socket from "components/socket/socket"
import singerDetail from "components/singer-detail/singer-detail"

Vue.use(Router);
export default new Router({
   mode: 'history',//默认为hash，即路由前面会有一个#
   fallback: false,//兼容ie9的hash模式
   routes: [
      { path: "/", redirect: "/show" },
      { path: "/recommend", component: recommend },
      { path: "/rank", component: rank },
      { path: "/search", component: search },
      { path: "/show", component: show },
      { path: "/upload", component: upload },
      { path: "/loginAndout", component: loginAndout },
      { path: "/socket", component: socket },
      {
         path: "/singer",
         component: singer,
         children: [
            {
               path: ":id",
               component: singerDetail
            }
         ]
      },
      { path: "/tab", component: tab }
   ]
})
