import Product from 'src/components/product/product';
import {
  API_URLS,
  FILTER_KEYWORDS,
  HEIGHT_OFFSET,
  SEARCH_RESULT_STATE_NAME,
  SEARCH_STATE_NAME,
  WIDTH_OFFSET,
} from 'src/constants/constants';
import productContext from 'src/reducer/productProvider';
import searchFilterContext from 'src/reducer/searchFilterProvider';
import { appendChild, qs, qsAll, render } from 'src/utils/dom';
import { fetchData, filter, go, map, pipe, reduce } from 'src/utils/utils';

const { store, setObserver, dispatch } = searchFilterContext;
const { store: productStore, setObserver: setObserverProduct, dispatch: dispatchProduct } = productContext;

const mergeAllProductData = pipe(
  map(({ value }) => value.data),
  map((product) => product.list),
  reduce((a, b) => [...a, ...b]),
);

const checkSpecificCondition = (searchKeywords, condition: string) => {
  return !!filter((searchKeyword) => searchKeyword === condition, searchKeywords).length;
};

const getCurrentSearchFilter = (state) => {
  return go(
    state.words,
    map(({ word }) => word),
  );
};

const getSearchkeyword = (currentSearchkeywords) => {
  return go(
    currentSearchkeywords,
    filter((word) => !FILTER_KEYWORDS.has(word)),
  );
};

const isSoldOut = (productData, currentSearchkeywords, filterKey, filterValue) => {
  return productData[filterValue] && !checkSpecificCondition(currentSearchkeywords, filterKey);
};

const filterProduct = (productData, currentSearchkeywords, filterKey, filterValue) => {
  if (filterKey === '품절포함' && isSoldOut(productData, currentSearchkeywords, filterKey, filterValue)) {
    return false;
  }

  if (!checkSpecificCondition(currentSearchkeywords, filterKey)) {
    return true;
  }

  if (filterKey === '품절포함' || productData[filterValue]) {
    return true;
  }
  return false;
};

const checkFullContentHeight = ($searchResult) => {
  const { x: appX, width: appWidth, y: appY, height: appHeight } = qs('.app').getBoundingClientRect();
  const APP_HEIGHT = appY + appHeight - HEIGHT_OFFSET;
  const APP_WIDTH = appX + appWidth - WIDTH_OFFSET;

  const $productAll = qsAll('.product', $searchResult);
  const $lastProduct = $productAll[$productAll.length - 1];
  const { x, y, width, height } = $lastProduct.getBoundingClientRect();
  if (x + width >= APP_WIDTH && y + height >= APP_HEIGHT) {
    return true;
  }
  return false;
};

const renderProducts = (productsData, $searchResult) => {
  let renderFinishFlag = false;

  const renderProduct = (productData) => {
    const $product = Product(productData);

    if (renderFinishFlag) {
      dispatchProduct({ type: 'ADD', product: $product });
      return;
    }

    appendChild($searchResult, $product);

    if (checkFullContentHeight($searchResult)) {
      renderFinishFlag = true;
    }

    return productsData;
  };

  return map(renderProduct, productsData);
};

// 필터 버튼에 대한 조건 필터
const filterSelectedButton = (productData) => {
  const currentSearchkeywords = getCurrentSearchFilter(store.state);

  for (const [filterKey, filterValue] of FILTER_KEYWORDS.entries()) {
    if (!filterProduct(productData, currentSearchkeywords, filterKey, filterValue)) {
      return false;
    }
  }
  return productData;
};

// 검색 키워드에 대한 조건 필터
const filterSearchKeyword = (productData) => {
  const currentSearchkeywords = getCurrentSearchFilter(store.state);
  const searchKeyword = getSearchkeyword(currentSearchkeywords);
  if (searchKeyword.length) {
    const { goodsName, brandName } = productData;
    const productName = `${goodsName} ${brandName}`;

    for (const keyword of searchKeyword) {
      if (productName.search(keyword) === -1) {
        return false;
      }
    }
  }
  return productData;
};

const filterAllCondition = pipe(filterSearchKeyword, filterSelectedButton);

const renderSearchResult = async () => {
  dispatchProduct({ type: 'RESET' });
  const productsFetchData = await Promise.allSettled(map((url) => fetchData(url), API_URLS));
  const productsData = mergeAllProductData(productsFetchData);

  const $searchResult = qs('.search-result');
  $searchResult.innerHTML = '';

  go(
    productsData,
    map((productData) => filterAllCondition(productData)),
    filter((productData) => !!productData),
    (productsData) => renderProducts(productsData, $searchResult),
    (productsData) =>
      dispatch({ type: 'SEARCH_RESULT', length: productsData.length, notify: [SEARCH_RESULT_STATE_NAME] }),
  );
};

const renderMoreProduct = () => {
  const $searchResult = qs('.search-result');
  const { state } = productStore;
  const { render: renderList } = state;
  go(
    renderList,
    map((element) => appendChild($searchResult, element)),
  );
};

const SearchResult = () => {
  renderSearchResult();
  setObserver(SEARCH_STATE_NAME, renderSearchResult);
  setObserverProduct('RENDER', renderMoreProduct);

  return render({
    tag: 'div',
    attributes: { class: 'search-result' },
  });
};

export default SearchResult;
