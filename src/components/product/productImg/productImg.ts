import { CANDIDATE_IMG_URL } from 'src/constants/constants';
import { render } from 'src/utils/dom';
import { ProductType } from '../product';

type ProductImgType = Pick<ProductType, 'imageUrl' | 'isExclusive' | 'goodsName' | 'isSoldOut'>;

const handleError = ({ target }) => {
  target.src = CANDIDATE_IMG_URL;
  console.clear();
};

const ProductImg = ({ imageUrl, isExclusive, goodsName, isSoldOut }: ProductImgType) => {
  const $img = render({
    tag: 'img',
    attributes: { class: `product-img ${isSoldOut ? 'sold-out__img' : ''}`, src: imageUrl, alt: goodsName },
    eventName: 'error',
    handler: handleError,
  });
  const $exclusive = isExclusive ? `<span class="exclusive">독점</span>` : '';
  const $soldout = isSoldOut ? `<div class="sold-out__text">SOLD OUT</div>` : '';

  const childComponents = [$img, $exclusive, $soldout];

  return render({
    tag: 'div',
    attributes: { class: `product-img ${isSoldOut ? 'sold-out__img' : ''}` },
    childComponents,
  });
};

export default ProductImg;
