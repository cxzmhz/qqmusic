<template>
  <div>
recommend
  </div>
</template>
<script type="text/ecmascript-6">
  import {getRecommend} from "src/api/recommend";
  import {ERR_OK} from "src/api/config"
  export default {
    created(){
      this._getRecommend();
    },
    methods:{
      _getRecommend(){
        getRecommend().then((res)=>{
          console.log(res);
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>