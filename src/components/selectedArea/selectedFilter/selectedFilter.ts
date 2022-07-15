import { CLOSE_BUTTON } from 'src/assets/svg';
import { render } from 'src/utils/dom';

const createSelectedFilter = (word: string, isSearchFilter: boolean | string = '') => {
  const closedButton = `<div class="close-btn">${CLOSE_BUTTON}</div>`;
  const className = 'selected-filter' + isSearchFilter && 'isSearchFilter';
  const wordComponent = `<div class="word">${word}</div>`;
  const childComponents = [wordComponent, closedButton];

  const selectedFilterProps = {
    tag: 'div',
    attributes: { class: className },
    childComponents,
  };

  return render(selectedFilterProps);
};

export default createSelectedFilter;
