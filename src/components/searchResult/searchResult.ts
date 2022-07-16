import createProduct from 'src/components/product/product';
import { API_URLS, FILTER_KEYWORDS, SEARCH_RESULT_STATE_NAME, SEARCH_STATE_NAME } from 'src/constants/constants';
import searchFilterContext from 'src/reducer/searchFilterProvider';
import { appendChild, qs, render } from 'src/utils/dom';
import { fetchData, filter, go, map, pipe, reduce } from 'src/utils/utils';

const { store, setObserver, dispatch } = searchFilterContext;

const mergeAllProductData = (productsData) =>
  go(
    productsData,
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
    map((productData) => {
      const Product = createProduct(productData);
      appendChild($searchResult, Product);
    }),
    (productsData) =>
      dispatch({ type: 'SEARCH_RESULT', length: productsData.length, notify: [SEARCH_RESULT_STATE_NAME] }),
  );
};

const createSearchResult = () => {
  renderSearchResult();
  setObserver(SEARCH_STATE_NAME, renderSearchResult);

  return render({
    tag: 'div',
    attributes: { class: 'search-result' },
  });
};

export default createSearchResult;
