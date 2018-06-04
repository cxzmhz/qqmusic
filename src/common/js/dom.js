
export function addClass(ele,className){
   if(hasClass(ele,className)){
      return
   }
   let newClass = ele.className.split(' ')
   newClass.push(className);
   ele.className = newClass.join(' ')
}

export function hasClass(ele,className){
   let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
   return reg.test(ele.className);
}

export function getData(ele,name,val){
   let pre = "data-";
   let dataName = pre + name;
   if(val){
      return ele.setAttribute(dataName,val)
   }else {
      return ele.getAttribute(dataName);
   }
}