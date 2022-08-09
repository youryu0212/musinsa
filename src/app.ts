import { appendChild, qs, render } from 'src/utils/dom';
import Header from 'src/layout/header';
import Main from 'src/layout/main';
import { HEIGHT_OFFSET, PRODUCT_TIMER_KEY } from './constants/constants';
import productContext from './context/productProvider';
import Loading from './components/loading/loading';
import { throttling } from './utils/utils';

const { store: productStore, dispatch: dispatchProduct } = productContext;

const renderLoading = () => {
  const $searchResult = qs('.search-result');
  const $loading = Loading();
  appendChild($searchResult, $loading);
};

const removeLoading = () => {
  try {
    qs('.loading').remove();
  } catch (error) {
    return;
  }
};

const renderRemainProduct = () => {
  const { scrollHeight, scrollTop, clientHeight } = qs('.app');
  const { state } = productStore;
  const { waitingRenderingProduct, timer } = state;

  if (!waitingRenderingProduct.length) {
    return;
  }

  if (scrollTop + clientHeight > scrollHeight - HEIGHT_OFFSET) {
    throttling(
      timer,
      PRODUCT_TIMER_KEY,
      () => {
        dispatchProduct({ type: 'RENDER', length: 2, notify: ['RENDER'] });
        removeLoading();
      },
      renderLoading,
      0,
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
