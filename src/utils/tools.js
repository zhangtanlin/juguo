
// 清除对象里面的空属性
export const removeEmpty = (obj) => {
  for (var key in obj) {
    if (
      obj[key] === '' ||
      obj[key] === 'null' ||
      obj[key] === null ||
      obj[key] === undefined
    ) {
      delete obj[key]
    }
  }
  return obj || {}
}
