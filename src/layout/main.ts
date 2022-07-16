import createNoSearchResult from 'src/components/searchResult/noSearchResult';
import createSearchResult from 'src/components/searchResult/searchResult';
import { SEARCH_RESULT_STATE_NAME } from 'src/constants/constants';
import searchFilterContext from 'src/reducer/searchFilterProvider';
import { qs, render } from 'src/utils/dom';

const { store, setObserver } = searchFilterContext;

const renderSearchResult = () => {
  const { state } = store;
  const { length } = state;
  const $searchResult = qs('.search-result');
  const $noSearchResult = qs('.no-search-result');
  if (length) {
    $searchResult.classList.remove('hide');
    $noSearchResult.classList.add('hide');
    return;
  }
  $searchResult.classList.add('hide');
  $noSearchResult.classList.remove('hide');
};

const createMain = () => {
  const searchResult: HTMLElement = createSearchResult();
  const noSearchResult: HTMLElement = createNoSearchResult();
  const childComponents: HTMLElement[] = [searchResult, noSearchResult];

  setObserver(SEARCH_RESULT_STATE_NAME, renderSearchResult);
  return render({
    tag: 'main',
    attributes: { class: 'main' },
    childComponents,
  });
};

export default createMain;
