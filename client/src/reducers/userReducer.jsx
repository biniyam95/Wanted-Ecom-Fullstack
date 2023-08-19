import{
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
  PRESERVE_LOGIN_REQUEST, PRESERVE_LOGIN_SUCCESS, PRESERVE_LOGIN_FAIL,
  LOGOUT_SUCCESS, LOGOUT_FAIL,

  EDIT_PROFILE_REQUEST,EDIT_PROFILE_SUCCESS,EDIT_PROFILE_RESET,EDIT_PROFILE_FAIL,

  USER_LIST_REQUEST,USER_LIST_SUCCESS,USER_LIST_FAIL,

  CLEAR_ERRORS,
} from '../ActionTypes/user'

/* =================================  USER SIDE  ==========================================================================*/

//authReducer
export const authReducer=(prevState={ user:{} },action)=>{
  switch(action.type){ 
    //SIGNUP actions 
    case SIGNUP_REQUEST  :  return { loading: true, signedUp:false}
        
    case SIGNUP_SUCCESS  :  return {...prevState, loading:false, signedUp:true,
                                       userSigned:action.payload}

    case SIGNUP_FAIL     :  return {...prevState, loading:false, signedUp:false, 
                                       userSigned:null, error:action.payload}
 
    
    //LOGIN actions
    case LOGIN_REQUEST  :  return {loading: true, loggedIn:false}
        
    case LOGIN_SUCCESS  :  return {...prevState, loading:false, loggedIn:true,
                                      user:action.payload}

    case LOGIN_FAIL     :  return {...prevState, loading:false, loggedIn:false, 
                                      user:null, error:action.payload}
     
                                      
    //PRESERVE LOGIN actions
    case PRESERVE_LOGIN_REQUEST  :  return {loading: true, loggedIn:false}

    case PRESERVE_LOGIN_SUCCESS  :  return {...prevState, loading:false, loggedIn:true,
                                               user:action.payload}

    case PRESERVE_LOGIN_FAIL     :  return { loading:false, loggedIn:false, 
                                             user:null, error:action.payload}
    
    
    //LOGOUT actions
    case LOGOUT_SUCCESS  :  return {...prevState, loading:false, loggedIn:false,
                                       user:null}

    case LOGOUT_FAIL     :  return {...prevState, error:action.payload }
    
    //clear errors
    case CLEAR_ERRORS   :  return {...prevState, error:null} 

    default             :  return prevState
  }
}

//profile update
export const profileReducer = (prevState = {}, action) => {
  switch (action.type) {
      //update profile
      case EDIT_PROFILE_REQUEST:  return {...prevState, loading: true}

      case EDIT_PROFILE_SUCCESS:  return {...prevState, loading: false, isUpdated: action.payload}

      case EDIT_PROFILE_RESET:    return {...prevState, isUpdated: false}

      case EDIT_PROFILE_FAIL:     return {...prevState, loading: false, error: action.payload }

      
      //clear error
      case CLEAR_ERRORS:  return {...prevState, error: null }

      default:  return prevState;
  
}
}

/* =================================  ADMIN SIDE  ==========================================================================*/


 export const userListReducer = (prevState = { userList: [] }, action) => {
  switch (action.type) {

      case USER_LIST_REQUEST :   return { ...prevState, loading: true}

      case USER_LIST_SUCCESS :   return { ...prevState, loading: false, userList: action.payload }

      case USER_LIST_FAIL :      return {...prevState, loading: false, error: action.payload }

      case CLEAR_ERRORS :  return {...prevState, error: null}

      default :  return prevState;
  }
} 