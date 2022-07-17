import { createElement, render } from 'src/utils/dom';

const Loading = () => {
  const Circle = createElement('div', { class: 'spinner' });
  return render({
    tag: 'div',
    attributes: { class: 'loading' },
    childComponents: Circle,
  });
};

export default Loading;
