import { ProductType } from '../product';

type ProductImgType = Pick<ProductType, 'imageUrl' | 'isExclusive' | 'goodsName' | 'isSoldOut'>;

const createProductImg = ({ imageUrl, isExclusive, goodsName, isSoldOut }: ProductImgType) => {
  const components = `
  <div class="product-img ${isSoldOut ? 'sold-out__img' : ''}">
    <img src="${imageUrl}" alt="${goodsName}" />
    ${isExclusive ? `<span class="exclusive">독점</span>` : ''}
    ${isSoldOut ? `<div class="sold-out__text">SOLD OUT</div>` : ''}
  </div>
  `;
  return components;
};

export default createProductImg;
