import { render } from 'src/utils/dom';
import createHeader from 'src/layout/header';
import createMain from 'src/layout/main';

const tag = '[app]';

const handleClick = () => {
  console.log(tag);
};

const createApp = () => {
  const Header = createHeader();
  const Main = createMain();

  const childComponents = [Header, Main];
  const appProps = {
    tag: 'div',
    attributes: { class: 'app' },
    eventName: 'click',
    handler: handleClick,
    childComponents,
  };
  return render(appProps);
};

export default createApp;
