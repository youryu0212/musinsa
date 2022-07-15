import { SEARCH_BUTTON } from 'src/assets/svg';
import { render } from 'src/utils/dom';

type SearchBarType = {
  className: string;
  inputPlaceHolder: string;
};

const tag = '[SearchBar]';

const createSearchBar = ({ className, inputPlaceHolder }: SearchBarType) => {
  const SearchBoxTemplate = `
    <input class="search-bar__input-box" placeholder="${inputPlaceHolder}" />
  `;

  const childComponents = [SEARCH_BUTTON, SearchBoxTemplate];

  const handleClick = () => {
    console.log(tag);
  };

  const searchBarProps = {
    tag: 'div',
    attributes: { class: className },
    eventName: 'click',
    handler: handleClick,
    childComponents,
  };

  return render(searchBarProps);
};

export default createSearchBar;
