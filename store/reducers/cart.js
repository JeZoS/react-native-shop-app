import CartItem from "../../models/cart-item";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../actions/cart";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updatedCartItem,
          },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: newCartItem,
          },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
    case REMOVE_FROM_CART:
      const selectedItem = state.items[action.pid];
      const currentQty = selectedItem.quantity;
      let updated;
      if (currentQty > 1) {
        updated = new CartItem(
          currentQty - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice
        );
        updated = { ...state.items, [action.pid]: updated };
      } else {
        updated = { ...state.items };
        delete updated[action.pid];
      }
      return {
        ...state,
        items: updated,
        totalAmount:
          state.totalAmount - selectedItem.productPrice,
      };
    default:
      return state;
  }
};
