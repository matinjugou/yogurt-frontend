export default {
  getUrlParams: function (url) {
    // http://www.zcfy.cc/article/quick-tip-get-url-parameters-with-javascript-1173.html
    let queryString = url ? url.split('?')[1] : window.location.search.slice(1)
    let obj = {}
    if (queryString) {
      queryString = queryString.split('#')[0]
      let arr = queryString.split('&')
      for (let i = 0, len = arr.length; i < len; i++) {
        let a = arr[i].split('=')
        // handling same param name like arr[]=a&arr[]=b
        let paramNum
        let paramName = a[0].replace(/\[\d*\]/, function (v) {
          paramNum = v.slice(1, -1)
          return ''
        })
        var paramValue = (typeof a[1]) === 'undefined' ? true : a[1]
        if (obj[paramName]) {
          if (typeof obj[paramName] === 'string') {
            obj[paramName] = [obj[paramName]]
          }
          if (typeof paramNum === 'undefined') {
            obj[paramName].push(paramValue)
          } else {
            obj[paramName][paramNum] = paramValue
          }
        } else {
          obj[paramName] = paramValue
        }
      }
    }
    return obj
  }
}
