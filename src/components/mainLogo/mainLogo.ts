import { LOGO } from 'src/assets/svg';
import { render } from 'src/utils/dom';

type MainLogoType = {
  className: string;
};

const MainLogo = ({ className }: MainLogoType) => {
  const searchFailProps = {
    tag: 'div',
    attributes: { class: className },
    childComponents: LOGO,
  };

  return render(searchFailProps);
};

export default MainLogo;
