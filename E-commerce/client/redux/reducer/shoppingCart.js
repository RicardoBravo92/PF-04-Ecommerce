import {
  ADD_ITEM,
  DELETE_ITEM,
  GET_ALL_CART,
  GET_TOTAL_PRICE
} from '../actions/actionstype.js' 

const initialState = {
  backUp: [],
  itemsCart: [],
  totalPrice: 0,
}

export default function shoppingCartReducer(state = initialState, action) {
  let itemsCart = state.itemsCart
  let totalPrice = state.totalPrice
  let cart = state.itemsCart
  switch(action.type) {
    case ADD_ITEM :
      const itemCart = state.itemsCart?.find(e => e.product.id === action.payload.id)
      if(itemCart){
        cart = state.itemsCart.map(e => e.product.id === action.payload.id ? {...e, quantity: e.quantity + 1, totalPrice: action.payload.price + e.quantity * e.product.price} : e )
        } else {
          cart = [...state.itemsCart, {product: action.payload, quantity: 1, totalPrice: action.payload.price}] }
      return{
        ...state,
        itemsCart: cart,
      } 
    case DELETE_ITEM:
      const index = itemsCart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let newCart = [...itemsCart];
      if(index >= 0){
        newCart.splice(index,1)
      } else{
        console.warn('Cant remove product')
      }
      return {
        ...state,
        itemsCart: newCart
      }
    case GET_ALL_CART:
      return {
        ...state,
        itemsCart
      }
    case GET_TOTAL_PRICE:
      return {
        ...state,
        itemsCart
      }
    default:
      return state;
  }

}
