import { render } from 'src/utils/dom';
import createHeader from 'src/layout/header';
import createMain from 'src/layout/main';
import createLoading from './components/loading/loading';

const createApp = () => {
  const Header = createHeader();
  const Main = createMain();

  const childComponents = [Header, Main];
  const appProps = {
    tag: 'div',
    attributes: { class: 'app' },
    childComponents,
  };
  return render(appProps);
};

export default createApp;
