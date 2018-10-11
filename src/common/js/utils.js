export function getRandomInt(min,max){
  var index = Math.floor(Math.random()*(max-min+1)+min);
  return index;
}
export function shuffle(arrs){
  var arr = arrs.slice();
  for(var i=0;i<arr.length;i++){
    var j = getRandomInt(0,i);
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}