import React, { useState,useEffect, Fragment } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate,useLocation,Link} from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import {  toast } from 'react-toastify'
//import actionCreators
import {login,clearErrors} from '../../ActionCreator/user_AC'


function Login() {
  //states
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('1234')
    

/* ---------------------------------------------------------------- */
  //hooks
   const dispatch= useDispatch()
   const navigate= useNavigate()
   const location = useLocation()
   
   const redirect = location.state?.redirect || '/'

   const {loading,loggedIn,error,user}= useSelector(state=>state.authReducer)
   
/* ---------------------------------------------------------------- */

useEffect(() => {

  
  
 if(loggedIn) 
  return navigate(redirect)

  if(error) {
   toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 600,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
   dispatch(clearErrors()) 
   return
  
 
}
  

}, [dispatch,navigate,loggedIn,error,redirect]);

//handle functions
const handleSubmit=(e)=>{
    e.preventDefault()
     dispatch(login(email,password))
    console.log(loggedIn,"434")
    console.log(user,"43fgf4")
  
}

  return (
    <Fragment>
      {loading? <Loader/>:(
        <>
        <MetaData title={'login'}/>
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
              />
            </div>

            <Link to="#" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/signup" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
        </>
      )}
    </Fragment>
  )
}

export default Login