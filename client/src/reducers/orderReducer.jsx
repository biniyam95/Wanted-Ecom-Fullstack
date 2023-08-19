import {
  GENERATE_ORDER_REQUEST, GENERATE_ORDER_SUCCESS, GENERATE_ORDER_FAIL,
  ORDER_HISTORY_REQUEST,ORDER_HISTORY_SUCCESS,ORDER_HISTORY_FAIL,
  A_ORDER_REQUEST,A_ORDER_SUCCESS,A_ORDER_FAIL,
  ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS,ORDER_LIST_FAIL,
  UPDATE_ORDER_SUCCESS,UPDATE_ORDER_REQUEST,UPDATE_ORDER_FAIL,UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,DELETE_ORDER_SUCCESS,DELETE_ORDER_FAIL,DELETE_ORDER_RESET,
  

  CLEAR_ERRORS
} from '../ActionTypes/order'

/* =================================  USER SIDE  ===============================================================*/


export const generateOrderReducer = (prevState = {}, action) => {
  switch (action.type) {

      case GENERATE_ORDER_REQUEST:  return {...prevState, loading: true }

      case GENERATE_ORDER_SUCCESS:  return { loading: false, orderDetails: action.payload } /* only pass orderDetail contents as payload when dispatching */

      case GENERATE_ORDER_FAIL:   return { loading: false, error: action.payload }

      case CLEAR_ERRORS:  return {...prevState, error: null }

      default:  return prevState
  }
}


//orderhistory
export const orderHistoryReducer = (prevState = { OrderHistory: [] }, action) => {
  switch (action.type) {
      case ORDER_HISTORY_REQUEST:  return { loading: true }

      case ORDER_HISTORY_SUCCESS:  return { loading: false, OrderHistory: action.payload }

      case ORDER_HISTORY_FAIL:  return { loading: false, error: action.payload }

      case CLEAR_ERRORS:    return {...prevState, error: null }

      default:  return prevState
  }
}

export const getaOrderReducer = (prevState = { aOrder: {} }, action) => {
  switch (action.type) {

      case A_ORDER_REQUEST:  return { loading: true }

      case A_ORDER_SUCCESS:  return { loading: false, aOrder: action.payload }

      case A_ORDER_FAIL:  return { loading: false, error: action.payload }

      case CLEAR_ERRORS:  return { ...prevState, error: null }

      default:  return prevState
  }
}

/* =================================  ADMIN SIDE  ===============================================================*/

// order list
 export const orderListReducer = (prevState = { orderList: [] }, action) => {
  switch (action.type) {

      case ORDER_LIST_REQUEST: return { loading: true }

      case ORDER_LIST_SUCCESS: return { loading: false, orderList: action.payload.orderList, totalSpent: action.payload.totalSpent }

      case ORDER_LIST_FAIL:return { loading: false, error: action.payload }

      case CLEAR_ERRORS: return {...prevState, error: null }

      default: return prevState;
  }
}

export const updateOrderReducer = (prevState = {}, action) => {
  switch (action.type) {
      
      case UPDATE_ORDER_REQUEST: return { ...prevState, loading: true}

      case UPDATE_ORDER_SUCCESS: return { ...prevState, loading: false, isUpdated: action.payload }

      case UPDATE_ORDER_FAIL: return { ...prevState, updateError: action.payload }

      case UPDATE_ORDER_RESET: return { ...prevState, isUpdated: false }

      case CLEAR_ERRORS: return { ...prevState, updateError: null }

      default: return prevState
  }
}

export const deleteOrderReducer = (prevState = {}, action) => {
  switch (action.type) {

      
      case DELETE_ORDER_REQUEST: return { ...prevState, loading: true}

      case DELETE_ORDER_SUCCESS: return { ...prevState, loading: false, isDeleted: action.payload }

      case DELETE_ORDER_FAIL: return { ...prevState, deleteError: action.payload }

      case DELETE_ORDER_RESET: return { ...prevState, isDeleted: false }

      case CLEAR_ERRORS: return { ...prevState, deleteError: null }

      default: return prevState
  }
}
