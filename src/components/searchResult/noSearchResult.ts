import { SEARCH_FAIL } from 'src/assets/svg';
import { render } from 'src/utils/dom';

const NoSearchResult = () => {
  return render({
    tag: 'div',
    attributes: { class: 'no-search-result hide' },
    childComponents: [SEARCH_FAIL, '<div>검색 결과 없음</div>'],
  });
};

export default NoSearchResult;
