import { appendChild, createElement, qs } from 'src/utils/dom';
import { go, map } from 'src/utils/utils';
import { ProductType } from '../product';

type ProductInfoType = Pick<ProductType, 'brandName' | 'goodsName' | 'normalPrice' | 'price' | 'saleRate' | 'isSale'>;

const productInfoClassNameList = [
  'product-info__brand',
  'product-info__title',
  'product-info__price-area',
  'product-info__normal-price',
];

const priceAreaClassNameList = ['product-info__price', 'product-info__sale-rate'];
const priceAreaClassName = 'product-info__price-area';

const createElementFromList = map((className) => createElement('div', { class: className }));

const isPriceArea = ({ className }: HTMLElement) => {
  return className === priceAreaClassName;
};

const addPriceAreaInfoElement = map((element) => {
  if (isPriceArea(element)) {
    return go(priceAreaClassNameList, createElementFromList, (priceComponent) => appendChild(element, priceComponent));
  }
  return element;
});

const fillContent = (element, dict) => {
  const { className } = element;

  for (const [targetClassName, content] of dict.entries()) {
    const childElement = qs(`.${targetClassName}`, element);

    if (childElement) {
      childElement.innerHTML = content;
      continue;
    }

    if (className === targetClassName) {
      element.innerHTML = content;
      return element;
    }
  }

  return element;
};

const createProductInfo = ({ brandName, goodsName, normalPrice, price, saleRate, isSale }: ProductInfoType) => {
  const productInfoDict = new Map();
  productInfoDict.set('product-info__brand', brandName);
  productInfoDict.set('product-info__title', goodsName);
  productInfoDict.set('product-info__price', normalPrice);
  productInfoDict.set('product-info__sale-rate', isSale ? saleRate : '');
  productInfoDict.set('product-info__normal-price', isSale ? price : '');

  const components = go(
    productInfoClassNameList,
    createElementFromList,
    addPriceAreaInfoElement,
    map((element) => fillContent(element, productInfoDict)),
  );

  return components;
};

export default createProductInfo;
