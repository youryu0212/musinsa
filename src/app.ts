import { render } from 'src/utils/dom';
import createHeader from './header';

const tag = '[app]';

const Header = createHeader();

const childComponents = [Header];

const handleClick = () => {
  console.log(tag);
};

const appProps = {
  tag: 'div',
  attributes: { class: 'app' },
  eventName: 'click',
  handler: handleClick,
  childComponents,
};

const createApp = () => render(appProps);

export default createApp;
