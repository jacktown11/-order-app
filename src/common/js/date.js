/**
 * 将一个数字num格式化为固定长度len的字符串
 * 如果位数不够，前方加字符0；
 * 如果位数过多，截取最后len位
 * @param {number} num 要被格式化的数字
 * @param {number} len 格式化位数
 */
function toFixedStr(num, len) {
  let str = num + '';
  if (str.length < len) {
    for (let i = 0; i < len; i++) str = '0' + str;
  }
  return str.slice(-len);
}

export function formatDate(date, fmt) {
  let regsMap = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in regsMap) {
    let reg = new RegExp(`(${k})`);
    let v = regsMap[k];
    if (reg.test(fmt)) {
      fmt = fmt.replace(reg, RegExp.$1.length === 1 ? v : toFixedStr(v, RegExp.$1.length));
    }
  }
  return fmt;
}

console.log(formatDate(new Date(), 'yyyy-MM-dd hh:mm'));