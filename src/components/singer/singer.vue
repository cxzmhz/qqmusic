<template>
  <div>
     singer
  </div>
</template>
<script type="text/ecmascript-6">
  import {getSingerList} from "src/api/singer"
  import {ERR_OK} from "src/api/config"
  import Singer from "common/js/singer"
  const HOT_NAME = "热门"
  const HOT_LENGTH = 10
  export default {
    data(){
      return {
        singerList:[]
      }
    },
    created(){
      this._getSingerList();
    },
    methods:{
      _getSingerList(){
        getSingerList().then(res=>{
          if(res.code == ERR_OK){
            this.singerList = this._normalizeSinger(res.data.list);
            console.log(this.singerList)
          }
        })
      },
      _normalizeSinger(list){
        let map = {
          hot: {
            title: HOT_NAME,
            item:[]
          }
        };
        list.forEach((item,index)=>{
          if(index<HOT_LENGTH){
            map.hot.item.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name
            }))
          }
          let key = item.Findex;
          if(!map[key]){
            map[key] = {
              title: key,
              item:[]
            };
          }
          map[key].item.push(new Singer({
            id:item.Fsinger_mid,
            name:item.Fsinger_name
          }))
        })
        let ret = [];
        let hot = [];
        for(let key in map){
          if(map[key].title.match(/[a-zA-Z]/)){
            ret.push(map[key]);
          }else if(map[key].title == HOT_NAME){
            hot.push(map[key]);
          }
        }
        ret.sort((a,b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret);
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>