import * as types from "./mutation-type"

const mutations = {
    //[](){}这种函数写法是当函数作为对象的方法的时候可以这么写，相当于a(){}
   [types.SET_SINGER](state,data){
      state.singer = data;
   },
   [types.SET_PLAYING_STATE](state,data){
      state.playing = data;
   },
   [types.SET_FULL_SCREEN](state,data){
      state.fullScreen= data;
   },
   [types.SET_PLAYLIST](state,data){
      state.playlist = data;
   },
   [types.SET_SEQUENCE_LIST](state,data){
      state.sequenceList = data;
   },
   [types.SET_PLAY_MODE](state,data){
      state.mode = data;
   },
   [types.SET_CURRENT_INDEX](state,data){
      state.currentIndex = data;
   }
}
export default mutations