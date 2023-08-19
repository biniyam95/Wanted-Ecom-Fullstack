import { 
  ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,
  A_PRODUCT_REQUEST,A_PRODUCT_SUCCESS,A_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL,ADD_PRODUCT_RESET,
  EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL,EDIT_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL,DELETE_PRODUCT_RESET,
 } from "../ActionTypes/product"


export const getAllProductsReducer=(prevState={ allProducts:[] }, action) =>{
  switch(action.type){


    case ALL_PRODUCTS_REQUEST: return{ loading:true, allProducts:[] }
    
    case ALL_PRODUCTS_SUCCESS: return { loading: false, allProducts: action.payload.allProducts,
                                        prodCount: action.payload.prodCount,
                                        prodPerPage: action.payload.prodPerPage,
                                        filteredProdCount: action.payload.filteredProdCount}
                                        
    case ALL_PRODUCTS_FAIL: return { loading:false, error:action.payload }

    //product list- admin side

    case PRODUCT_LIST_REQUEST: return{ loading:true, allProducts:[] }
    
    case PRODUCT_LIST_SUCCESS: return { loading: false, allProducts: action.payload }

    case PRODUCT_LIST_FAIL: return { loading:false, error:action.payload }


    //clearError and default

    case CLEAR_ERRORS: return {...prevState,error: null}

    default: return prevState
  }
}

//single product reducer 
export const getAProductReducer = (prevState={ aProduct:{} }, action) =>{
  switch(action.type){
    
    case A_PRODUCT_REQUEST: return{...prevState,loading:true }
    
    case A_PRODUCT_SUCCESS: return { loading: false, aProduct: action.payload.aProduct,}

    case A_PRODUCT_FAIL: return { ...prevState, error:action.payload }

    case CLEAR_ERRORS: return {...prevState,error: null}

    
    default: return prevState
  }
}

//Add product reducer
export const addProductReducer = (prevState = { newProduct: {} }, action) => {
  switch (action.type) {

      case ADD_PRODUCT_REQUEST: return { ...prevState, loading: true }

      case ADD_PRODUCT_SUCCESS: return { loading: false, newProduct: action.payload.newProduct, 
                                          success: action.payload.success }

      case ADD_PRODUCT_FAIL: return { ...prevState,loading:false, error: action.payload }

      case ADD_PRODUCT_RESET: return { ...prevState, success: false }

      case CLEAR_ERRORS: return { ...prevState, error: null }

      default: return prevState
  }
}

export const editProductReducer = (prevState = {}, action) => {
  switch (action.type) {

      
      case EDIT_PRODUCT_REQUEST: return { ...prevState, loading: true}

      case EDIT_PRODUCT_SUCCESS: return { ...prevState, loading: false, isEdited: action.payload }

      case EDIT_PRODUCT_FAIL: return { ...prevState, editError: action.payload }

      case EDIT_PRODUCT_RESET: return { ...prevState, isEdited: false }

      case CLEAR_ERRORS: return { ...prevState, editError: null }

      default: return prevState
  }
}

export const deleteProductReducer = (prevState = {}, action) => {
  switch (action.type) {

      
      case DELETE_PRODUCT_REQUEST: return { ...prevState, loading: true}

      case DELETE_PRODUCT_SUCCESS: return { ...prevState, loading: false, isDeleted: action.payload }

      case DELETE_PRODUCT_FAIL: return { ...prevState, deleteError: action.payload }

      case DELETE_PRODUCT_RESET: return { ...prevState, isDeleted: false }

      case CLEAR_ERRORS: return { ...prevState, deleteError: null }

      default: return prevState
  }
}

