export function isType(params) {
  const s = Object.prototype.toString.call(params)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

export function isEmpty(params) {
  if (params === '' || params === undefined || params === null) {
    return true
  } 
  return false
}

export function getTime(){
  const day = new Date()
  day.setHours(day.getHours() + 8)
  return day
} 

export function dateFormat(time = Date.now(), fmt = 'YYYY-mm-dd HH:MM:SS') {
  let ret;
  const date = new Date(time);
  const opt = {
    'Y+': date.getFullYear().toString(),     
    'm+': (date.getMonth() + 1).toString(),  
    'd+': date.getDate().toString(),         
    'H+': date.getHours().toString(),        
    'M+': date.getMinutes().toString(),      
    'S+': date.getSeconds().toString(),      
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

export function resultErrorJson (code= -1, msg = '失败', data = {}, ...res) {
  return {
    code,
    msg,
    data,
    ...res
  }
}

export function resultSuccessJson (code= 0, msg = '成功', data = {}, ...res) {
  return {
    code,
    msg,
    data,
    ...res
  }
}

export default {
  isEmpty,
  isType,
  resultErrorJson,
  resultSuccessJson
}