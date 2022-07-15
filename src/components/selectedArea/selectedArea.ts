import { RESET_BUTTON } from 'src/assets/svg';
import { render } from 'src/utils/dom';

const createSelectedArea = () => {
  const selectedFilterArea = `<div class="selected-filter-area"></div>`;
  const childComponents = [selectedFilterArea, RESET_BUTTON];

  const selectedAreaProps = {
    tag: 'div',
    attributes: { class: 'selected-area' },
    childComponents,
  };
  return render(selectedAreaProps);
};

export default createSelectedArea;
