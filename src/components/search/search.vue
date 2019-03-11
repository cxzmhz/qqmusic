<template>
  <div>
    {{$store.state.testSearch}}
    <button @click="testFunc">click</button>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        
      }
    },
    mounted(){
      
    },
    methods:{
      testFunc(){
        this.$store.commit("test","hahaha")//state是响应式的；修改之后视图也会发生变化
        // this.$store.state.testSearch = "haha"
      }
    }
  }
</script>
<style scoped>
  
</style>