import {commonParams, options} from './config'
import axios from 'axios' 

export function getLyric(mid){
  const url = "/api/lyric";
  const data = Object.assign({},commonParams,{
     musicid: mid,
     platform:'h5',
     needNewCode: 1,
     uin:0,
     format: 'json',
     nobase64: 1,
     songtype:0,
     _: +new Date()
  })
  return axios.get(url,{
     params: data
  }).then(res=>{
     return Promise.resolve(res);
  }).catch(error=>{})
}