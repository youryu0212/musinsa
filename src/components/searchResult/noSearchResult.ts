import { render } from 'src/utils/dom';
import createSearchFail from '../searchFail/searchFail';

const createNoSearchResult = () => {
  const $searchFail = createSearchFail();

  return render({
    tag: 'div',
    attributes: { class: 'no-search-result hide' },
    childComponents: $searchFail,
  });
};

export default createNoSearchResult;
