<template>
  <scroll class="listview" :data="data" ref="listview">
      <ul>
         <li ref="listgroup" class="list-group" v-for="(item,index) in data" :key="index">
            <h1 class="list-group-title">{{item.title}}</h1>
            <ul>
               <li class="list-group-item" v-for="singers in item.item" :key="singers.id">
                  <img class="avatar" v-lazy="singers.avatar">
                  <span class="name">{{singers.name}}</span>
               </li>
            </ul>
         </li>
      </ul>
      <div class="list-shortcut" @touchstart.stop.prevent = "onShotcutTouchstart">
         <ul>
            <li v-for="(item,index) in shotcutList" :key="index" class="item" :data-index = "index">
               {{item}}
            </li>
         </ul>
      </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
   import Scroll from "src/base/scroll/scroll"
   import {getData} from "common/js/dom.js"

   export default {
      components:{
         Scroll
      },
      props:{
         data:{
            type:Array,
            default:[]
         }
      },
      computed:{
         shotcutList(){
            return this.data.map((group)=>{
               return group.title.substr(0,1);
            })
         }
      },
      methods:{
         onShotcutTouchstart(e){
            let touchIndex = getData(e.target,"index")
            this.$refs.listview.scrollToElement(this.$refs.listgroup[touchIndex],0)
         }
      }
   }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: fixed
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>