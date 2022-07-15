import createSearchBar from 'src/components/searchBar/searchBar';
import createMainLogo from 'src/components/mainLogo/mainLogo';
import createFilterArea from './components/filterArea/filterArea';
import createSelectedArea from './components/selectedArea/selectedArea';
import { render } from './utils/dom';

const MainLogo = createMainLogo({
  className: 'logo',
});

const FilterArea = createFilterArea();

const SelectedArea = createSelectedArea();

const SearchBar = createSearchBar({
  className: 'search-bar',
  inputPlaceHolder: '상품명 검색',
});

const childComponents = [MainLogo, FilterArea, SelectedArea, SearchBar];

const headerProps = {
  tag: 'header',
  childComponents,
};

const createHeader = () => {
  return render(headerProps);
};

export default createHeader;
