export const curry =
  (fnc) =>
  (arg, ...args) =>
    args.length ? fnc(arg, ...args) : (...args) => fnc(arg, ...args);

export const map = curry((callback, iter) => {
  const res = [];

  for (const element of iter) {
    res.push(callback(element));
  }
  return res;
});

export const filter = curry((callback, iter) => {
  let res = [];
  for (const el of iter) {
    if (callback(el)) res.push(el);
  }
  return res;
});

export const reduce = curry((callback, acc, iter) => {
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
