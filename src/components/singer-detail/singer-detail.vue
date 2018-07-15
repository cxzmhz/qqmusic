<template>
   <transition name="slide">
      <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
   </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";
import {getVkey} from "api/singer"
import {createSong} from "common/js/song"
import MusicList from "components/music-list/music-list"

export default {
  data(){
    return{
      songs:[]
    }
  },
  computed: {
    bgImage(){
      return this.singer.avatar
    },
    title(){
      return this.singer.name
    },
    allSongs(){
      return this.songs;
    },
    ...mapGetters(["singer"])
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if(!this.singer.id){
        this.$router.push("/singer")
        return;
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code == ERR_OK) {
          this._createSong(res.data.list)
          
        }
      });
    },
    _createSong(list){
      let that = this;
      list.forEach(item=>{
        let {musicData} = item
        if(musicData.songid && musicData.albummid){
          getVkey(musicData.songmid).then(res=>{
            if(!res) return;
            if(res.code == ERR_OK){
              let Vkey = res.data.items[0].vkey
              that.songs.push(createSong(musicData,Vkey))
            }
          })
        }
      })
    }
  },
  components:{
    MusicList
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
