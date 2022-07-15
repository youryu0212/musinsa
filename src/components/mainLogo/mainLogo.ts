import { LOGO } from 'src/assets/svg';
import { render } from 'src/utils/dom';

type MainLogoType = {
  className: string;
};

const tag = '[Main Logo]';

const createMainLogo = ({ className }: MainLogoType) => {
  const handleClick = () => {
    console.log(tag);
  };

  const searchFailProps = {
    tag: 'div',
    attributes: { class: className },
    eventName: 'click',
    handler: handleClick,
    childComponents: LOGO,
  };

  return render(searchFailProps);
};

export default createMainLogo;
