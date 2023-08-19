import './App.css';
import React from 'react'
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import SingleProduct from './components/product/SingleProduct';
import Login from './components/user/Login'
import Signup from './components/user/Signup';
import Profile from './components/user/Profile'

//Preserve Login 
import {preserveLogin} from './ActionCreator/user_AC'
import Store from './store'
import {useEffect} from 'react'

//verifyLogin Route component
import VerifyLoginRoute from './components/customRoutes/VerfiyLoginRoute'
import EditProfile from './components/user/EditProfile';
import Cart from './components/cart/Cart';
import Address from './components/cart/Address';
import DoubleCheck from './components/cart/DoubleCheck';
import PaymentCod from './components/cart/PaymentCod';
import SuccessOrder from './components/cart/SuccessOrder';

import SingleOrder from './components/order/SingleOrder';
import OrderHistory from './components/order/OrderHistory';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import AddProduct from './components/admin/AddProduct';
import EditProduct from './components/admin/EditProduct';
import UserList from './components/admin/UserList';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';

function App() {
  useEffect(() => {
    Store.dispatch(preserveLogin())
  }, [])
  
  return (
    <BrowserRouter>
    
    <div className='App'>
      <Header/>
      
      <Routes>   
      {/* <div className="container container-fluid"></div> */}  
          <Route exact path='/' element={<Home />} />
          <Route path="/search/:keyword" element={<Home/>} />
          <Route exact path='/product/:id' element={ <SingleProduct />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/signup' element={ <Signup />} />
           {/* <VerifyLoginRoute exact path='/profile' element={ <Profile />} /> */}
           <Route exact path='/profile' element={ <Profile />} />
           <Route exact path='/profile/edit' element={ <EditProfile />} />
           <Route exact path="/cart" element={<Cart/>}  />
           
            <Route exact path="/address" element={<Address/>}  /> 
{/* <Route exact path="/deliveryAddress" element={<DeliveryAddress/>}  /> */} 
           <Route exact path="/doublecheck" element={<DoubleCheck/>}  /> 
           <Route exact path="/payment" element={<PaymentCod/>}  /> 
           <Route exact path="/order/success" element={<SuccessOrder/>}  /> 
           <Route exact path="/order/history" element={<OrderHistory/>}  /> 
           <Route exact path="/order/:id" element={<SingleOrder/>}  /> 
           {/* <Route exact path="/confirmOrder" element={<ConfirmOrder/>}  /> */}
        <Route exact path="/admin/product/list" element={<ProductList/>}  /> 
         

          {/* <Route path="/profile" element={<VerifyLoginRoute element={<Profile />} />}/> */}
          
         <Route exact path="/admin/dashboard" element={<Dashboard/>}  />  
         <Route exact path="/admin/product/add" element={<AddProduct/>}  />  
         <Route exact path="/admin/product/edit/:id" element={<EditProduct/>}  />  
         <Route exact path="/admin/user/list" element={<UserList/>}  />  
         <Route exact path="/admin/order/list" element={<OrderList/>}  />  
         <Route exact path="/admin/order/update/:id" element={<UpdateOrder/>}  />  
          
      </Routes>
      
      {/* <Footer/> */}
    </div>



    </BrowserRouter>
  ) 
}

export default App;
