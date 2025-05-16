// export function leftpad(str, count, ch = 0) {
//   return `${[...Array(count)].map((v) => "0")}${str}`.slice(-count);
// }

function type(data) {
  const str = Object.prototype.toString.call(data);
  console.log(str, str.slice(8, -1));
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

export function clone(source) {
  const t = type(source);

  if (t !== "array" && t !== "object") {
    return source;
  }

  let target = {};

  if (t === "object") {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = clone(source[key]);
      }
    }
  } else {
    target = [];
    for (let ii = 0; ii < source.length; ii++) {
      target[ii] = clone(source[ii]);
    }
  }

  return target;
}

export function getUrlParam(key) {
  const query =
    location.search[0] === "?" ? location.search.slice(1) : location.search;

  const map = query.split("&").reduce((data, key) => {
    const arr = key.split("=");
    data[arr[0]] = arr[1];
    return data;
  }, {});

  return map[key];
}
