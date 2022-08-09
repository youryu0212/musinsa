import { appendChild, createElement, qs, render } from 'src/utils/dom';
import { getWonTemplate, go, map } from 'src/utils/utils';
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

const addPriceAreaInfoElement = map((element: HTMLElement) => {
  if (isPriceArea(element)) {
    return go(priceAreaClassNameList, createElementFromList, (priceComponent) => appendChild(element, priceComponent));
  }
  return element;
});

const fillContent = (element: HTMLElement, dict: Map<string, string>) => {
  const { className } = element;

  go(
    dict,
    map(([targetClassName, content]) => {
      const $childElement = qs(`.${targetClassName}`, element);

      if ($childElement) {
        $childElement.innerHTML = content;
        return;
      }

      if (className === targetClassName) {
        element.innerHTML = content;
        return element;
      }
    }),
  );

  return element;
};

const ProductInfo = ({ brandName, goodsName, normalPrice, price, saleRate, isSale }: ProductInfoType) => {
  const productInfoDict = new Map([
    ['product-info__brand', brandName],
    ['product-info__title', goodsName],
    ['product-info__price', getWonTemplate(normalPrice)],
    ['product-info__sale-rate', isSale ? `${saleRate}%` : ''],
    ['product-info__normal-price', isSale ? getWonTemplate(price) : ''],
  ]);

  const childComponents = go(
    productInfoClassNameList,
    createElementFromList,
    addPriceAreaInfoElement,
    map((element) => fillContent(element, productInfoDict)),
  );

  return render({
    tag: 'div',
    attributes: { class: 'product-info' },
    childComponents,
  });
};

export default ProductInfo;
