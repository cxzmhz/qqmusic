<template>
  <div class="recommend" ref="recommend">

    <scroll ref="scroll" class="recommend-content" :data="descList">
      <div>
        <div class="slider-wrap" v-if="recommends.length">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage()" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item,index) in descList" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!descList.length">
        <loading></loading>
      </div>
    </scroll>
    
  </div>
</template>
<script type="text/ecmascript-6">
import { getRecommendSlider, getDiscList } from "src/api/recommend";
import { ERR_OK } from "src/api/config";
import Slider from "src/base/slider/slider";
import Scroll from "src/base/scroll/scroll";
import Loading from "src/base/loading/loading";
import { playlistMixin } from "common/js/mixin";
export default {
  mixins: [playlistMixin],
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: [],
      descList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    _getRecommend() {
      getRecommendSlider().then(res => {
        if (res.code == ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    // _getDiscList(){
    //   getDiscList().then((res)=>{
    //     this.descList = res.data.list;
    //   })
    // },
    //使用async函数改编请求
    async _getDiscList() {
      // let res = await getDiscList().catch(e=>{
      //   console.log(e);
      // });
      // this.descList = res.data.list;
      try {
        let res = await getDiscList();
        this.descList = res.data.list;
      } catch (e) {
        console.log(e);
      }
    },
    loadImage() {
      if (!this.checkLoad) {
        this.$refs.scroll.refresh();
        this.checkLoad = true;
      }
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>