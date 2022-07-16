import createSearchBar from 'src/components/searchBar/searchBar';
import createMainLogo from 'src/components/mainLogo/mainLogo';
import createFilterArea from 'src/components/filterArea/filterArea';
import createSelectedArea from 'src/components/selectedArea/selectedArea';
import { render, toggleClassName } from 'src/utils/dom';
import searchFilterContext from 'src/reducer/searchFilterProvider';
import { SEARCH_BAR_OPEN_STATE_NAME } from 'src/constants/constants';

const createHeader = () => {
  const { setObserver } = searchFilterContext;
  const MainLogo = createMainLogo({
    className: 'logo',
  });

  const FilterArea = createFilterArea();

  const SelectedArea = createSelectedArea();

  const SearchBar = createSearchBar({
    className: 'search-bar hide',
    inputPlaceHolder: '상품명 검색',
  });

  setObserver(SEARCH_BAR_OPEN_STATE_NAME, () => {
    const input = SearchBar.querySelector('input');
    input.value = '';
    toggleClassName(SearchBar, 'hide');
  });

  const childComponents = [MainLogo, FilterArea, SelectedArea, SearchBar];

  const headerProps = {
    tag: 'header',
    attributes: { class: 'header' },
    childComponents,
  };

  return render(headerProps);
};

export default createHeader;
