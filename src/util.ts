export const map = (callback, iter) => {
  const res = [];

  for (const element of iter) {
    res.push(callback(element));
  }
  return res;
};

export const isIterable = (iter) => {
  return iter.hasOwnProperty(Symbol.iterator);
};

export const render = ($target, templateIter) => {
  if (!isIterable(templateIter)) {
    $target.innerHTML = templateIter;
    return;
  }
  $target.innerHTML = templateIter.join('');
};
