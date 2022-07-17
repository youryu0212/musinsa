import { RESET_BUTTON } from 'src/assets/svg';
import { SEARCH_STATE_NAME } from 'src/constants/constants';
import searchFilterContext from 'src/reducer/searchFilterProvider';
import { innerHTML, qs, render } from 'src/utils/dom';
import { go, map } from 'src/utils/utils';
import SelectedFilter from './selectedFilter/selectedFilter';

const reRender = (words) => {
  const $selectedArea = qs('.selected-area');
  const $selectedFilterArea = qs('.selected-filter-area');

  if (!words.length) {
    $selectedArea.classList.add('hide');
    return;
  }
  $selectedArea.classList.remove('hide');
  return go(
    words,
    map(({ word }) => SelectedFilter(word)),
    (words) => innerHTML($selectedFilterArea, words),
  );
};

const resetFilterButton = () => {
  const { dispatch } = searchFilterContext;
  dispatch({ type: 'SEARCH_RESET', notify: [SEARCH_STATE_NAME] });
};

const removeSelectedFilter = ({ target }) => {
  const { dispatch } = searchFilterContext;
  const $targetFilter = target.closest('.selected-filter');
  const { innerHTML } = qs('.word', $targetFilter);
  dispatch({ type: 'REMOVE', words: innerHTML, notify: [SEARCH_STATE_NAME] });
};

const SelectedArea = () => {
  const { store, setObserver } = searchFilterContext;

  const $selectedFilterArea = render({
    tag: 'div',
    attributes: { class: 'selected-filter-area' },
    handler: removeSelectedFilter,
    eventName: 'click',
    selector: '.close-btn',
  });

  const $resetButton = render({
    tag: 'div',
    attributes: { class: 'reset-btn' },
    eventName: 'click',
    handler: resetFilterButton,
    childComponents: RESET_BUTTON,
  });

  const childComponents = [$selectedFilterArea, $resetButton];

  setObserver(SEARCH_STATE_NAME, () => {
    const { state } = store;
    const { words } = state;
    reRender(words);
  });

  const selectedAreaProps = {
    tag: 'div',
    attributes: { class: 'selected-area hide' },
    childComponents,
  };
  return render(selectedAreaProps);
};

export default SelectedArea;
