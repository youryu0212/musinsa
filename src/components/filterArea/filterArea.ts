import { SEARCH_BUTTON } from 'src/assets/svg';
import { render } from 'src/utils/dom';
import { go, map } from 'src/utils/utils';
import createFilterButton from './filterButton/filterButton';

const tag = '[filter area]';

const tagList: string[] = ['검색', '세일상품', '단독상품', '품절포함'];

const handleClick = () => {
  console.log(tag);
};

const createFilterArea = () => {
  const searchButton = render({
    tag: 'div',
    attributes: { class: 'small-search-btn' },
    childComponents: SEARCH_BUTTON,
  });

  const createButton = (keyword: string) => {
    const firstChild = `<div class="word">${keyword}</div>`;
    return keyword === '검색' ? [firstChild, searchButton] : firstChild;
  };

  const childComponents = go(
    tagList,
    map((keyword) => createButton(keyword)),
    map((childComponents) => createFilterButton({ childComponents })),
  );

  const filterProps = {
    tag: 'div',
    attributes: { class: 'filter-area' },
    eventName: 'click',
    handler: handleClick,
    childComponents,
  };
  return render(filterProps);
};

export default createFilterArea;
