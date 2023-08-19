import axios from 'axios'

import {
    GENERATE_ORDER_REQUEST,GENERATE_ORDER_SUCCESS,GENERATE_ORDER_FAIL,
    ORDER_HISTORY_REQUEST,ORDER_HISTORY_SUCCESS,ORDER_HISTORY_FAIL,
    A_ORDER_REQUEST,A_ORDER_SUCCESS,A_ORDER_FAIL,
    ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS,ORDER_LIST_FAIL,
    UPDATE_ORDER_SUCCESS,UPDATE_ORDER_REQUEST,UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,DELETE_ORDER_SUCCESS,DELETE_ORDER_FAIL,
   

    CLEAR_ERRORS
} from '../ActionTypes/order'

  /* =================================  USER SIDE  ===============================================================*/


export const generateOrder = (orderDetails) => async (dispatch, getState) => {
    try {

        dispatch({ type: GENERATE_ORDER_REQUEST })

        const config = { headers: {'Content-Type': 'application/json'}}

    const { data } = await axios.post('/api/v1/order/generate', orderDetails, config)
    console.log(data,"data from generate order api")
    console.log(data.newOrder,"new order")

        dispatch({ type: GENERATE_ORDER_SUCCESS, payload: data.newOrder })

    } catch (error) {
        dispatch({ type: GENERATE_ORDER_FAIL, payload: error.response.data.message })
    }
}

// Get curretly logged in user orders
export const getOrderHistory = () => async (dispatch) => {
    try {

        dispatch({ type: ORDER_HISTORY_REQUEST });

        const { data } = await axios.get('/api/v1/orders/history')


        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data.orderHistory })

    } catch (error) {
        dispatch({ type: ORDER_HISTORY_FAIL, payload: error.response.data.message })
    }
}
// Get order details
export const getaOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: A_ORDER_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`)

        console.log(data,"getaOrder data from server")

        dispatch({ type: A_ORDER_SUCCESS, payload: data.aOrder })

    } catch (error) {
        dispatch({ type: A_ORDER_FAIL, payload: error.response.data.message })
    }
}

/* =================================  ADMIN SIDE  ===============================================================*/

//order list (ADMIN)
export const getOrderList = () => async (dispatch) => {
    try {

        dispatch({ type: ORDER_LIST_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/order/list`)

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data})

    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.response.data.message })
    }
}

// update a order (ADMIN)
export const updateOrder = (id, orderStatusData) => async (dispatch) => {
    try {
  
        dispatch({ type: UPDATE_ORDER_REQUEST })
  
        const config = {headers: { 'Content-Type': 'application/json' }}
  
        const { data } = await axios.put(`/api/v1/admin/order/update/${id}`, orderStatusData, config)
  
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success })
  
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message })
    }
  }
  
  // delete a order (ADMIN)
  export const deleteOrder = (id) => async (dispatch) => {
    try {
  
        dispatch({ type: DELETE_ORDER_REQUEST })
  
        const { data } = await axios.delete(`/api/v1/admin/order/delete/${id}`)
  
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success })
  
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message })
    }
  }

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}