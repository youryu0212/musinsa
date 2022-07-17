import { render } from 'src/utils/dom';
import SearchFail from '../searchFail/searchFail';

const NoSearchResult = () => {
  const $searchFail = SearchFail();

  return render({
    tag: 'div',
    attributes: { class: 'no-search-result hide' },
    childComponents: $searchFail,
  });
};

export default NoSearchResult;
