import { SMALL_SEARCH_BUTTON } from 'src/assets/svg';
import { SEARCH_BAR_OPEN_STATE_NAME, SEARCH_STATE_NAME } from 'src/constants/constants';
import searchFilterContext from 'src/context/searchFilterProvider';
import { qs, qsAll, render, toggleClassName } from 'src/utils/dom';
import { go, map } from 'src/utils/utils';
import FilterButton from './filterButton/filterButton';

const filterButtonClassName = '.filter-btn';

const tagList: string[] = ['검색', '세일상품', '단독상품', '품절포함'];
const { store, setObserver, dispatch } = searchFilterContext;

const isSearchButton = (word) => {
  return word === '검색';
};

const filterActiveButton = map((element) => {
  const { state } = store;
  const { words } = state;
  const { innerHTML } = element;
  for (const keyword of words) {
    const { word, fromSearchBar } = keyword;
    if (innerHTML === word) {
      element.classList.add('active-filter');
      return element;
    }

    if (fromSearchBar && isSearchButton(innerHTML)) {
      element.classList.add('active-filter');
      return element;
    }
  }
  element.classList.remove('active-filter');
  return element;
});

const setActiveButton = () => {
  const filterButtons = qsAll('.filter-btn');

  go(
    filterButtons,
    map((filterButton) => qs('.word', filterButton)),
    filterActiveButton,
  );
};

const handleClickFilterButton = ({ target }) => {
  const filterButton = target.closest(filterButtonClassName);
  if (!filterButton) {
    return;
  }
  const wordElement = qs('.word', filterButton);
  const { innerHTML } = wordElement;

  if (isSearchButton(innerHTML)) {
    const isOpen = toggleClassName(filterButton, 'active-search-bar');
    dispatch({ type: 'SEARCH_BAR_TOGGLE', isOpen, notify: [SEARCH_BAR_OPEN_STATE_NAME] });
    return;
  }

  if (!wordElement.classList.contains('active-filter')) {
    dispatch({ type: 'SEARCH', words: innerHTML, notify: [SEARCH_STATE_NAME] });
    return;
  }

  dispatch({ type: 'REMOVE', words: innerHTML, notify: [SEARCH_STATE_NAME] });
  return;
};

const FilterArea = () => {
  const searchButton = render({
    tag: 'div',
    attributes: { class: 'small-search-btn' },
    childComponents: SMALL_SEARCH_BUTTON,
  });

  const createButton = (keyword: string) => {
    const firstChild = `<div class="word">${keyword}</div>`;
    return keyword === '검색' ? [firstChild, searchButton] : firstChild;
  };

  setObserver(SEARCH_STATE_NAME, setActiveButton);

  const childComponents = go(
    tagList,
    map((keyword) => createButton(keyword)),
    map((childComponents) => FilterButton({ childComponents })),
  );

  const filterProps = {
    tag: 'div',
    attributes: { class: 'filter-area' },
    eventName: 'click',
    handler: handleClickFilterButton,
    childComponents,
    selector: '.filter-btn',
  };
  return render(filterProps);
};

export default FilterArea;
