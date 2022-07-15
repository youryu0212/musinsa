import { render } from 'src/utils/dom';

type FilterButtonType = {
  childComponents: string | HTMLElement[];
};

const createFilterButton = ({ childComponents }: FilterButtonType) => {
  const filterProps = {
    tag: 'div',
    attributes: { class: 'filter-btn' },
    childComponents,
  };
  return render(filterProps);
};

export default createFilterButton;
