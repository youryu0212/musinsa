import SearchBar from 'src/components/searchBar/searchBar';
import MainLogo from 'src/components/mainLogo/mainLogo';
import FilterArea from 'src/components/filterArea/filterArea';
import SelectedArea from 'src/components/selectedArea/selectedArea';
import { render, toggleClassName } from 'src/utils/dom';
import searchFilterContext from 'src/context/searchFilterProvider';
import { SEARCH_BAR_OPEN_STATE_NAME } from 'src/constants/constants';

const Header = () => {
  const { setObserver } = searchFilterContext;
  const $mainLogo = MainLogo({
    className: 'logo',
  });

  const $filterArea = FilterArea();

  const $selectedArea = SelectedArea();

  const $searchBar = SearchBar({
    className: 'search-bar hide',
    inputPlaceHolder: '상품명 검색',
  });

  setObserver(SEARCH_BAR_OPEN_STATE_NAME, () => {
    const input = $searchBar.querySelector('input');
    input.value = '';
    toggleClassName($searchBar, 'hide');
  });

  const childComponents = [$mainLogo, $filterArea, $selectedArea, $searchBar];

  const headerProps = {
    tag: 'header',
    attributes: { class: 'header' },
    childComponents,
  };

  return render(headerProps);
};

export default Header;
