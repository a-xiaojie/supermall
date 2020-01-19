export function debounce (func, delay) {
  let timer = null

  return function (...args) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 正则表达式是干什么的？字符串匹配 利器（难，规则太多）
export function formatDate(date, fmt) {
  // 1.获取年份
  // y+ -> 1个或者多个y
  // y* -> 0个或者多个y
  // y? -> 0个或者1个y
  // 2019
  // yy - 19
  // yyyy 2019
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 -> 'yyyy'
    // date.getFullYear() + '' -> '2020'
    // substr -> 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
    // 若传入'yy' 则截掉从前面开始数的两位，则剩下后面的20
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取
  // M+
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}


