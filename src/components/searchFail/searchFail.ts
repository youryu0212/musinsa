import { SEARCH_FAIL } from 'src/assets/svg';
import { render } from 'src/utils/dom';

type SearchFailType = {
  className: string;
};

const tag = '[SearchFail]';

const createSearchFail = ({ className }: SearchFailType) => {
  const handleClick = () => {
    console.log(tag);
  };

  const searchFailProps = {
    tag: 'div',
    attributes: { class: className },
    eventName: 'click',
    handler: handleClick,
    childComponents: [SEARCH_FAIL, '<div>검색 결과 없음</div>'],
  };

  return render(searchFailProps);
};

export default createSearchFail;
