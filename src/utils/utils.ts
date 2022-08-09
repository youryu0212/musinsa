export const curry =
  (fnc: Function) =>
  (arg, ...args) =>
    args.length ? fnc(arg, ...args) : (...args) => fnc(arg, ...args);

export const map = curry((callback: Function, iter) => {
  const res = [];

  for (const element of iter) {
    res.push(callback(element));
  }
  return res;
});

export const filter = curry((callback: Function, iter) => {
  let res = [];
  for (const el of iter) {
    if (callback(el)) res.push(el);
  }
  return res;
});

export const reduce = curry((callback: Function, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const el of iter) {
    acc = callback(acc, el);
  }
  return acc;
});

export const go = (...args) => reduce((el, f) => f(el), args);

export const pipe =
  (f, ...callbackFncs) =>
  (...args) =>
    go(f(...args), ...callbackFncs);

export const isIterable = (iter): boolean => {
  return iter && !!iter[Symbol.iterator];
};

export const isString = (arg): boolean => {
  return typeof arg === 'string';
};

export const fetchData = async (url: string, { method, bodyData }: any = {}) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  const body = JSON.stringify(bodyData);
  const fetchParams = { method, headers, body };
  try {
    const data = await fetch(url, fetchParams);
    return data.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getWonTemplate = (num: number) => `${num.toLocaleString()}원`;

export const throttling = (timer, key: string, callback: Function, setupFnc = null, delay: number = 2000) => {
  if (!timer[key]) {
    if (setupFnc) {
      setupFnc();
    }
    timer[key] = setTimeout(() => {
      if (!timer[key]) {
        return;
      }
      callback();
      timer[key] = null;
    }, delay);
  }
};
