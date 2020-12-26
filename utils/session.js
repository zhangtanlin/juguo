/**
 * 把value添加到sessionStorage指定key内
 * @param {string} [key]   - sessionStorage的key
 * @param {string} [value] - sessionStorage的值
 */
export const setSession = (key, value) => {
  if (process.client) {
    window.sessionStorage.setItem(key, value)
    return true
  }
}
/**
 * 获取sessionStorage指定key的值
 * @param {string} [key] - sessionStorage的key
 */
export const getSession = (key) => {
  if (process.client) {
    return window.sessionStorage.getItem(key) || ''
  }
}
/**
 * 删除sessionStorage里面指定的key
 * @param {string} [key] - sessionStorage的key
 */
export const clearSession = (key) => {
  if (process.client) {
    window.sessionStorage.clear(key)
    return true
  }
}
