<template>
   <transition name="slide">
      <div class="singer-detail"></div>
   </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";
import {getVkey} from "api/singer"
import {createSong} from "common/js/song"

export default {
  data(){
    return{
      songs:[]
    }
  },
  computed: {
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
              console.log(that.songs)
            }
          })
        }
      })
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.singer-detail {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
