import * as types from "./mutation-type"

const mutations = {
   [types.SET_SINGER](state,data){
      state.singer = data;
   }
}
export default mutations