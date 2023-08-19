import axios from 'axios'

import { 
  ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, 
  A_PRODUCT_REQUEST, A_PRODUCT_SUCCESS, A_PRODUCT_FAIL,
 
  CLEAR_ERRORS ,

  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL,


} from "../ActionTypes/product"


/* =================================  USER SIDE  ==========================================================================*/

//getAllProducts-action
export const getAllProducts = (activePage = 1, prodName = '', price, category) => async (dispatch) => {
  try {
     dispatch({type: ALL_PRODUCTS_REQUEST}) //loading

     let link = `/api/v1/allProducts?prodName=${prodName}&page=${activePage}&price[lte]=${price[1]}&price[gte]=${price[0]}`

        if (category) 
            link = `/api/v1/allProducts?prodName=${prodName}&page=${activePage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        

        const { data } = await axios.get(link)
     
     
     
     dispatch({type: ALL_PRODUCTS_SUCCESS, payload:data}) // successfully called api .loading stopped
  }
  catch(error){
    dispatch({ type: ALL_PRODUCTS_FAIL, payload:error.response.data.message})
  }
}

//getSingleProduct
export const getAProduct = (id) => async (dispatch) => {
  try {
     dispatch({type: A_PRODUCT_REQUEST}) 
     
     const {data} =await axios.get(`/api/v1/product/${id}`) 
     console.log(data,'8989')
    
     dispatch({type: A_PRODUCT_SUCCESS, payload:data}) 
  }
  catch(error){
    dispatch({
      type: A_PRODUCT_FAIL,
      payload:error.response.data.message
    })
  }
}

//clear errors
export const clearErrors=()=>async (dispatch) => { 
  dispatch({type: CLEAR_ERRORS})
}



/* =================================  ADMIN SIDE  ==========================================================================*/

//product list (ADMIN)
export const getProductList = () => async (dispatch) => {
  try {
     dispatch({type: PRODUCT_LIST_REQUEST}) 
     
     //calling getallproducts api
     const {data} =await axios.get('/api/v1/admin/product/list') 
     console.log(data,'9999')
     
     dispatch({type: PRODUCT_LIST_SUCCESS, payload:data.productList}) 
  }
  catch(error){
    dispatch({ type: PRODUCT_LIST_FAIL, payload:error.response.data.message})
  }
}

//Add Product (ADMIN)
export const addProduct = (productData) => async (dispatch) => {
  try {

      dispatch({ type: ADD_PRODUCT_REQUEST })

      const config = {headers: {'Content-Type': 'multipart/form-data'}}

      const { data } = await axios.post(`/api/v1/admin/product/add`, productData ,config)

      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data })

  } catch (error) {
      dispatch({ type: ADD_PRODUCT_FAIL, payload: error.response.data.message })
  }
}

// edit Product (ADMIN)
export const editProduct = (id, productData) => async (dispatch) => {
  try {

      dispatch({ type: EDIT_PRODUCT_REQUEST })

      const config = {headers: { 'Content-Type': 'multipart/form-data' }}

      const { data } = await axios.put(`/api/v1/admin/product/edit/${id}`, productData, config)

      dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data.success })
      

  } catch (error) {
      dispatch({ type: EDIT_PRODUCT_FAIL, payload: error.response.data.message })
  }
}

// delete Product (ADMIN)
export const deleteProduct = (id) => async (dispatch) => {
  try {

      dispatch({ type: DELETE_PRODUCT_REQUEST })

      const { data } = await axios.delete(`/api/v1/admin/product/delete/${id}`)

      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success })

  } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response.data.message })
  }
}

