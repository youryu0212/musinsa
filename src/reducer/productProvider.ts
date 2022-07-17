import { useReducer } from 'src/utils/useReducer';

type ActionType = {
  type: string;
  product?: string;
  length?: number;
};

const productInitState = {
  waitingRenderingProduct: [],
  render: [],
};

const productReducer = (state, action: ActionType) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        waitingRenderingProduct: [...state.waitingRenderingProduct, action.product],
      };
    case 'RENDER':
      const { waitingRenderingProduct } = state;
      let i = 0;
      state.render = [];
      while (i < Math.min(action.length, waitingRenderingProduct.length)) {
        state.render = [...state.render, waitingRenderingProduct[i++]];
      }
      return {
        ...state,
        waitingRenderingProduct: state.waitingRenderingProduct.slice(i),
      };
  }
};

const useProduct = () => useReducer(productReducer, productInitState);
const productContext = useProduct();

export default productContext;
