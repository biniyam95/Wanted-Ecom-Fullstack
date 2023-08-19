import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'

import { getAllProductsReducer,getAProductReducer,addProductReducer,editProductReducer,deleteProductReducer } from './reducers/productReducer'
import {authReducer,profileReducer,userListReducer} from './reducers/userReducer'
import {cartReducer} from './reducers/cartReducer'
import { generateOrderReducer,orderHistoryReducer,getaOrderReducer,orderListReducer,updateOrderReducer,deleteOrderReducer} from './reducers/orderReducer'

const reducer= combineReducers({
  getAllProductsReducer,getAProductReducer,addProductReducer,editProductReducer,deleteProductReducer,
  authReducer,profileReducer,userListReducer,
  cartReducer,
  generateOrderReducer,orderHistoryReducer,
  getaOrderReducer,
  orderListReducer,updateOrderReducer,deleteOrderReducer


})

let initialState = {
  cartReducer:{ 

    cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [],
    
    addressInfo: localStorage.getItem('addressInfo')? JSON.parse(localStorage.getItem('addressInfo')): {}

  },


  
}

console.log(initialState,"!!!!!!!!")


const middlewares= [thunk] 
const Store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlewares))) 

export default Store