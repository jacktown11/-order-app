// unique string for localStorage prefix
const UNIQUE_STR = '__order-app__';

function _storeSet(key, val) {
  window.localStorage[UNIQUE_STR + key] = val;
}

function _storeGet(key) {
  return window.localStorage[UNIQUE_STR + key];
}

export function setSeller(id, key, val) {
  // get all sellers
  let sellers = _storeGet('sellers');
  sellers = sellers ? JSON.parse(sellers) : {};

  // get seller of the id and set new key-val
  let s = sellers[id] || {};
  s[key] = val;
  sellers[id] = s;

  _storeSet('sellers', JSON.stringify(sellers));
}

export function getSeller(id, key, def) {
  let sellers = _storeGet('sellers');
  if (!sellers) return def;

  sellers = JSON.parse(sellers);
  let s = sellers[id];
  if (!s) return def;

  return s[key] === undefined ? def : s[key];
}

/**
 * 将url中的查询参数对转换为对象形式
 */
export function parseUrl() {
  let paramArr = window.location.search.slice(1).split('&');
  let params = {};
  if (paramArr[0]) {
    paramArr.forEach((pairs) => {
      let arr = pairs.split('=');
      if (arr.length === 1) arr[1] = '';
      params[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
    });
  }
  return params;
}
