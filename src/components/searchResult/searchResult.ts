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

const checkSpecificCondition = (productData, condition: string) => {
  return !!filter((productName) => productName === condition, productData).length;
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
  if (productData[filterValue]) {
    return true;
  }
  return false;
};

const renderProducts = (productsData, $searchResult) => {
  const { x, width, y, height } = qs('.app').getBoundingClientRect();
  const APP_HEIGHT = y + height - HEIGHT_OFFSET;
  const APP_WIDTH = x + width - WIDTH_OFFSET;
  let renderFinishFlag = false;
  return map((productData) => {
    const $product = Product(productData);

    if (renderFinishFlag) {
      dispatchProduct({ type: 'ADD', product: $product });
      return;
    }

    appendChild($searchResult, $product);

    const $productAll = qsAll('.product', $searchResult);
    const $lastProduct = $productAll[$productAll.length - 1];
    const { x, y, width, height } = $lastProduct.getBoundingClientRect();
    if (x + width >= APP_WIDTH && y + height >= APP_HEIGHT) {
      renderFinishFlag = true;
    }

    return productsData;
  }, productsData);
};

const renderSearchResult = async () => {
  const { state } = store;
  const productsFetchData = await Promise.allSettled(map((url) => fetchData(url), API_URLS));
  const productsData = mergeAllProductData(productsFetchData);
  const currentSearchkeywords = getCurrentSearchFilter(state);
  const searchKeyword = getSearchkeyword(currentSearchkeywords);

  // 필터 버튼에 대한 조건 필터
  const filterSelectedButton = (productData) => {
    for (const [filterKey, filterValue] of FILTER_KEYWORDS.entries()) {
      if (!filterProduct(productData, currentSearchkeywords, filterKey, filterValue)) {
        return false;
      }
    }
    return productData;
  };

  // 검색 키워드에 대한 조건 필터
  const filterSearchKeyword = (productData) => {
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
