<template>
  <div id="app">
     <m-header></m-header>
     <tab></tab>
     <keep-alive>
       <router-view></router-view>
     </keep-alive>
  </div>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
<script type="text/ecmascript-6">
  import MHeader from "components/m-header/m-header"
  import Tab from "components/tab/tab"

  export default {
    components:{
      MHeader,
      Tab
    }
  }
</script>