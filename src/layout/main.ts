import { createElement, render } from 'src/utils/dom';

const tag = '[main]';

const handleClick = () => {
  console.log(tag);
};

const createMain = () => {
  const searchResult: HTMLElement = createElement('div', { class: 'search-result' });
  const noSearchResult: HTMLElement = createElement('div', { class: 'no-search-result' });
  const childComponents: HTMLElement[] = [searchResult, noSearchResult];
  return render({
    tag: 'main',
    childComponents,
    eventName: 'click',
    handler: handleClick,
  });
};

export default createMain;
