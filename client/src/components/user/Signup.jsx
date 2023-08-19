import React, { useState,useEffect, Fragment } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'

//import Loader from '../layout/Loader'- not required because we are not fetching anything from the server just posting raw data(except for some validation)
import MetaData from '../layout/MetaData'

import {  toast } from 'react-toastify'
//import actionCreators
import {signup,clearErrors} from '../../ActionCreator/user_AC'

function Signup() {
  //states
  const [name,setName]=useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('user') 
    

  //hooks
   const dispatch= useDispatch()
   const navigate= useNavigate()
   const {loading,signedUp,error}= useSelector(state=>state.authReducer)

useEffect(() => {
  
  if(signedUp)  return navigate('/login')  

  if(error) {
  toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
  dispatch(clearErrors()) 

  return  
}
  

}, [dispatch,navigate,signedUp,error]);

//handle functions
const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(signup(name,email,password,role))
}
  
  return (
    <Fragment>
     
      <MetaData title={'signup'}/>
      <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg"  onSubmit={handleSubmit}>
            <h1 className="mb-3">SIGN UP</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" 
              id="name_field" 
              className="form-control" 
              value={name} onChange={(e)=>setName(e.target.value)}
            />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email} onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password} onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
  
            <button type="submit" id="register_button" className="btn btn-block py-3" disabled={loading?true:false}>
              Sign Up
            </button>
          </form>
		  </div>
    </div>

    </Fragment>
  )
}

export default Signup