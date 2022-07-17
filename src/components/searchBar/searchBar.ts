import { SEARCH_BUTTON } from 'src/assets/svg';
import { SEARCH_BAR_OPEN_STATE_NAME, SEARCH_STATE_NAME } from 'src/constants/constants';
import searchFilterContext from 'src/context/searchFilterProvider';
import { qs, render } from 'src/utils/dom';

type SearchBarType = {
  className: string;
  inputPlaceHolder: string;
};

const { dispatch } = searchFilterContext;

const handleSearchSubmit = (evt) => {
  evt.preventDefault();
  const searchButtonClassName = 'active-search-bar';
  const searchButton = qs(`.${searchButtonClassName}`);

  const { value } = evt.target.closest('form').querySelector('input');
  dispatch({ type: 'SEARCH', words: value, fromSearchBar: true, notify: [SEARCH_STATE_NAME] });
  dispatch({ type: 'SEARCH_BAR_TOGGLE', notify: [SEARCH_BAR_OPEN_STATE_NAME] });
  searchButton.classList.remove(searchButtonClassName);
};

const SearchBar = ({ className, inputPlaceHolder }: SearchBarType) => {
  const searchButton = render({
    tag: 'div',
    attributes: { class: 'search-bar__button-img' },
    eventName: 'click',
    handler: handleSearchSubmit,
    childComponents: SEARCH_BUTTON,
  });
  const SearchBoxTemplate = `
    <input type="text" class="search-bar__input-box" placeholder="${inputPlaceHolder}" alt="search-bar"/>
  `;

  const childComponents = [searchButton, SearchBoxTemplate];

  const searchBarProps = {
    tag: 'form',
    attributes: { class: className },
    eventName: 'submit',
    handler: handleSearchSubmit,
    childComponents,
  };

  return render(searchBarProps);
};

export default SearchBar;
