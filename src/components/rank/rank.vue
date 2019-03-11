<template>
  <div>
    <button @click="test">click</button>
    {{obj}}
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        obj:{
          a:"aa",
          b:"bb"
        },
        arr:[1,2,3]
      }
    },
    watch:{
      obj:{
        handler(){
          console.log("changed")
        },
        deep:true
      }
    },
    methods:{
      test(){
        // this.obj.a = "cc";           worked
        // this.obj.c="cc";             not worked
        // this.$set(this.obj,"c","cc") worked
        // this.arr[0]=6                not worked
        // this.arr.length = 5          not worked
        // this.arr.splice(0,1,6)       worked
        // this.obj.a="cc"              with deep watch : worked
        this.obj.c="cc"                 //with deep watch : not worked
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>