import { render } from 'src/utils/dom';
import createProductImg from './productImg/productImg';
import createProductInfo from './productPriceInfo/productPriceInfo';

export type ProductType = {
  goodsName: string;
  brandName: string;
  imageUrl: string;
  isExclusive: boolean;
  isSale: boolean;
  isSoldOut: boolean;
  linkUrl: string;
  normalPrice: number;
  price: number;
  saleRate: number;
};

const tag = '[product]';

const handleClick = () => {
  console.log(tag);
};

const createProduct = ({
  goodsName,
  brandName,
  imageUrl,
  isExclusive,
  isSale,
  isSoldOut,
  linkUrl,
  normalPrice,
  price,
  saleRate,
}: ProductType) => {
  const ProductImg = createProductImg({ imageUrl, isExclusive, goodsName, isSoldOut });
  const ProductInfo = createProductInfo({ brandName, goodsName, normalPrice, price, saleRate, isSale });

  const childComponents = [ProductImg, ...ProductInfo];
  const productProps = {
    tag: 'div',
    attributes: { class: 'product' },
    childComponents,
    eventName: 'click',
    handler: handleClick,
  };
  console.log(ProductImg, ProductInfo);
  return render(productProps);
};

export default createProduct;
