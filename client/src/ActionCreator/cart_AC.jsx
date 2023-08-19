import axios from 'axios'
import { ADD_TO_CART, REMOVE_FROM_CART, ADDRESS_SAVE } from '../ActionTypes/cart'


export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)


    dispatch({
        type: ADD_TO_CART, 
        payload: {
            prodId: data.aProduct._id,
            name: data.aProduct.name,
            price: data.aProduct.price,
            stock: data.aProduct.stock,
            quantity: quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems)) 
}


export const removeFromCart = (id) => async (dispatch, getState) => {

    dispatch( { type: REMOVE_FROM_CART, payload: id } )

    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))

}
 

export const addressSave = (addressData) => async (dispatch) => {

    dispatch( { type: ADDRESS_SAVE, payload: addressData } )

    localStorage.setItem('addressInfo', JSON.stringify(addressData))

} 