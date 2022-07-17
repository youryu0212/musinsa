import { appendChild, qs, render } from 'src/utils/dom';
import Header from 'src/layout/header';
import Main from 'src/layout/main';
import { HEIGHT_OFFSET } from './constants/constants';
import productContext from './reducer/productProvider';
import Loading from './components/loading/loading';
import { throttling } from './utils/utils';

const { store: productStore, dispatch: dispatchProduct } = productContext;
const timer = { productThrottling: null };

const renderLoading = () => {
  const $searchResult = qs('.search-result');
  const $loading = Loading();
  appendChild($searchResult, $loading);
};

const removeLoading = () => {
  qs('.loading').remove();
};

const renderRemainProduct = () => {
  const { scrollHeight, scrollTop, clientHeight } = qs('.app');
  const { state } = productStore;
  const { waitingRenderingProduct } = state;
  if (!waitingRenderingProduct.length) {
    return;
  }

  if (scrollTop + clientHeight > scrollHeight - HEIGHT_OFFSET) {
    throttling(
      timer,
      'productThottling',
      () => {
        dispatchProduct({ type: 'RENDER', length: 2, notify: ['RENDER'] });
        removeLoading();
      },
      renderLoading,
      1000,
    );
  }
};

const App = () => {
  const $header = Header();
  const $main = Main();

  const childComponents = [$header, $main];
  const appProps = {
    tag: 'div',
    attributes: { class: 'app' },
    childComponents,
    eventName: 'scroll',
    handler: renderRemainProduct,
  };
  return render(appProps);
};

export default App;
