import { render } from 'src/utils/dom';
import ProductImg from './productImg/productImg';
import ProductInfo from './productInfo/productInfo';

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

const Product = ({
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
  const $productImg = ProductImg({ imageUrl, isExclusive, goodsName, isSoldOut });
  const $productInfo = ProductInfo({ brandName, goodsName, normalPrice, price, saleRate, isSale });

  const childComponents = [$productImg, $productInfo];
  const productProps = {
    tag: 'div',
    attributes: { class: 'product' },
    childComponents,
  };

  return render(productProps);
};

export default Product;
