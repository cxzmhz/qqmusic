
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

let elementStyle = document.createElement('div').style;

let vendor = (()=>{
  let transformNames = {
    webkit:"webkitTransform",
    Moz:"MozTransform",
    O:"OTransform",
    ms:"msTransform",
    standard:"transform"
  }
  for(let key in transformNames){
    if(elementStyle[transformNames[key]] !== undefined){
      return key;
    }
    return false;
  }
})()

export function prefixStyle(style){
  if(vendor === false){
    return false;
  }
  if(vendor === "standard") {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}