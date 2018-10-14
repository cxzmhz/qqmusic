
import {getLyric} from "api/song"
import {ERR_OK} from "api/config"

export class Song{
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric(){
    if(this.lyric){
      return Promise.resolve(this.lyric);
    }
    return new Promise((resolve,reject)=>{
      getLyric(this.id).then((res)=>{
        var ret = res.data;
        if(typeof ret === "string"){
          var reg = /^\w+\(({[^()]+})\)$/;
          var matches = ret.match(reg);
          if(matches){
            ret = JSON.parse(matches[1])
            if(ret.retcode == ERR_OK){
              let dom = document.createElement('div');
              dom.innerHTML = ret.lyric;
              this.lyric = dom.innerHTML;
              resolve(this.lyric);
            }else{
              reject('no lyric');
            }
          }
        }
      })

    })
  }
}

export function createSong(musicData,songVkey){
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${songVkey}&guid=7087234296&uin=0&fromtag=66`
  })
}

function filterSinger(singers){
  let ret = [];
  if(!singers) return '';
  singers.forEach(s=>{
    ret.push(s.name)
  })
  return ret.join('/')
}