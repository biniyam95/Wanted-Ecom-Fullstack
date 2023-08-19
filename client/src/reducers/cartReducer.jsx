import { ADD_TO_CART, REMOVE_FROM_CART, ADDRESS_SAVE } from '../ActionTypes/cart'

export const cartReducer = (prevState = { cartItems: [] ,addressInfo: {} }, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const item = action.payload;

            const ItemExist = prevState.cartItems.find(i => i.prodId === item.prodId)

            if (ItemExist) {
                return {
                    ...prevState,
                    cartItems: prevState.cartItems.map(i => i.prodId === ItemExist.prodId ? item : i)
                }
            } else {
                return {
                    ...prevState,
                    cartItems: [...prevState.cartItems, item]
                }
            }

            case REMOVE_FROM_CART:
                return {
                    ...prevState,
                    cartItems: prevState.cartItems.filter(i => i.prodId !== action.payload)
                }
            
             


        case ADDRESS_SAVE: return { ...prevState, addressInfo: action.payload} 


        default: return prevState
    }
}