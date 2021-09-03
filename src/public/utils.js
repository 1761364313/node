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

export default {
  isEmpty,
  isType
}