import React,{Fragment,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../../App.css'

import { useDispatch, useSelector } from 'react-redux'
import {  toast } from 'react-toastify'

import {logout} from '../../ActionCreator/user_AC'

import {clearErrors} from '../../ActionCreator/user_AC'
import Search from './Search'


function Header() {
   //hooks
   const dispatch = useDispatch()
   const navigate = useNavigate()
   
   const { loading, user, error } = useSelector(state => state.authReducer)

    const {cartItems} =useSelector( state => state.cartReducer)

   const handleLogout=() => {
      dispatch(logout())
      console.log(error,'dfdf')
        toast.success(`🦄 Logged Out`,{position: "top-right",autoClose: 600,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined}) 
   }

   useEffect(() => {
    if (error) {
      toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
      dispatch(clearErrors());
  }
   }, [dispatch,error])

   //Search handler
   const handleSearch = (prodName) => {
    if (prodName.trim()) {
      navigate(`/search/${prodName}`);
    } else {
      navigate('/');
    }
  }
   

  //render
  return (
    <Fragment>
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          
          <Link to='/'><img src="/images/cartIcon.png" style={{marginLeft:50,marginTop:-10}} alt="cartIcon" /><img src="/images/Wanted.png" alt='logo' style={{ width:180,height:30}}/></Link> 
        </div>
      </div>

      {/* SEARCH component */}
      <div className="col-12 col-md-6 mt-2 mt-md-0">
                     <Search onSearch={handleSearch}  />
                </div>
      {/* ends SEARCH component */}

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      {/* cart */}
      <Link to="/cart" style={{ textDecoration: 'none' }} >
        <span id="cart" className="ml-3">Cart</span><span className="ml-1" id="cart_count">{cartItems.length}</span>
      </Link>
        
  {/* ------------------------------------ login / username -----------------------------------------*/}
        
        { user ? (
                  <div className="ml-4 dropdown d-inline">
                      <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                          <figure className="avatar avatar-nav">
                              <img src='/images/zebra.png'  alt='avatar-img' className="rounded-circle"/>
                          </figure>
                          <span>{user && user.name}</span>
                      </Link>

                      <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                        
                        {/* if its admin */}
                          {user && user.role === 'admin' && (
                              <Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link>
                          )}

                          <Link className="dropdown-item" to="/order/history">Orders</Link>
                          <Link className="dropdown-item" to="/profile">Profile</Link>
                          <Link className="dropdown-item text-danger" to="/" onClick={handleLogout}>
                              Logout
                          </Link>

                      </div>


                  </div>

                ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}

      </div>
    </nav>
  </Fragment>
  )
}

export default Header