import { SEARCH_FAIL } from 'src/assets/svg';
import { render } from 'src/utils/dom';

const createSearchFail = () => {
  const searchFailProps = {
    tag: 'div',
    childComponents: [SEARCH_FAIL, '<div>검색 결과 없음</div>'],
  };

  return render(searchFailProps);
};

export default createSearchFail;
