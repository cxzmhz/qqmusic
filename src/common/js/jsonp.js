import originJsonp from "jsonp"

export default function jsonp(url,data,option){
   url = param(url,data);
   return new Promise((resolve,reject)=>{
      originJsonp(url,option,(err,data)=>{
         if(!err){
            resolve(data)
         }else {
            reject(err)
         }
      })
   })
}

function param(url,data){
   if(url[url.length-1]!="?"){
      url += "?"
   }
   for(let k in data){
      let value = data[k] !== undefined ? data[k] : '';
      url += `${k}=${encodeURIComponent(value)}&`
   }
   return url.substring(0,url.length-1);
}