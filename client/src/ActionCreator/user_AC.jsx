import axios from 'axios'
import {  toast } from 'react-toastify'

import{
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
    PRESERVE_LOGIN_REQUEST, PRESERVE_LOGIN_SUCCESS, PRESERVE_LOGIN_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
  
    EDIT_PROFILE_REQUEST,EDIT_PROFILE_SUCCESS,EDIT_PROFILE_RESET,EDIT_PROFILE_FAIL,

    USER_LIST_REQUEST,USER_LIST_SUCCESS,USER_LIST_FAIL,


  
    CLEAR_ERRORS,
  
} from '../ActionTypes/user'

/* =================================  USER SIDE  ===========================================================================*/


//SIGNUP actioncreator
export const signup= (name,email,password,role) =>async(dispatch)=>{
  try {
      dispatch({type: SIGNUP_REQUEST})

      const config = { headers: {'Content-Type': 'application/json'} }  //for images we use multipart/formdata

      const {data}= await axios.post('/api/v1/signup',{name,email,password,role},config)


      dispatch({type: SIGNUP_SUCCESS ,payload: data.User })

  } 
  catch (error) {
      dispatch({type: SIGNUP_FAIL,payload:error.response.data.message})
  }
 }
 
//LOGIN actioncreator
 export const login= (email,password) =>async(dispatch)=>{
  try {
      dispatch({type: LOGIN_REQUEST})
       const config = { headers: {'Content-Type': 'application/json'} }

      const {data}= await axios.post('/api/v1/login',{email,password},config)

      dispatch({type: LOGIN_SUCCESS ,payload: data.User })

  } 
  catch (error) {
      dispatch({type:LOGIN_FAIL,payload:error.response.data.message})
  }
 }

 //PRESERVE LOGIN actioncreator
 export const preserveLogin= () =>async(dispatch)=>{
  try {
      dispatch({type: PRESERVE_LOGIN_REQUEST})

      const {data}= await axios.get('/api/v1/profile') 


      dispatch({type: PRESERVE_LOGIN_SUCCESS ,payload: data.profileUser })

  } 
  catch (error) {
      dispatch({type:PRESERVE_LOGIN_FAIL,payload:error.response.data.message})
  }
 }

 //LOGOUT actioncreator
 export const logout= () =>async(dispatch)=>{
  try {    
      await axios.post('/api/v1/logout') 


      dispatch({type: LOGOUT_SUCCESS})

  } 
  catch (error) {
      dispatch({type:LOGOUT_FAIL,payload:error.response.data.message})
  }
 }

//PROFILE EDIT actioncreator
export const editProfile= (name,email,password,role) =>async(dispatch)=>{
    try {
        dispatch({type:EDIT_PROFILE_REQUEST})
  
        
        
        const config = { headers: {'Content-Type': 'application/json'} }  
  
        const {data}= await axios.put('/api/v1/profile/edit',{name,email,password,role},config)
  
  
        dispatch({type: EDIT_PROFILE_SUCCESS ,payload: data.success })
  
    } 
    catch (error) {
        dispatch({type: EDIT_PROFILE_FAIL,payload:error.response.data.message})
    }
   }

 //clear errors
export const clearErrors=()=>async (dispatch) => { 
      dispatch({type: CLEAR_ERRORS})
}


/* =================================  ADMIN SIDE  ==========================================================================*/

// Get users List
export const getUserList = () => async (dispatch) => {
    try {

        dispatch({ type: USER_LIST_REQUEST })

        const { data } = await axios.get('/api/v1/admin/user/list')

        dispatch({ type: USER_LIST_SUCCESS, payload: data.userlist })

    } catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.response.data.message })
    }
}