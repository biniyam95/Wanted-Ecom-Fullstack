import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import MetaData from '../layout/MetaData'
import {  toast } from 'react-toastify'



import CheckoutSteps from './CheckoutSteps'
import { generateOrder } from '../../ActionCreator/order_AC'


const PaymentCod = () => {

    //hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.authReducer)
    const { cartItems, addressInfo } = useSelector(state => state.cartReducer)
    
    
    console.log(cartItems,"testing cartItems")
    console.log(addressInfo,"testing addressInfo")
    //order details
    const orderDetails = {
        orderedItems: cartItems,
        addressInfo
    }
    //paymentInfo
    const priceInfo = JSON.parse(sessionStorage.getItem('priceInfo'))

    if (priceInfo) {
      orderDetails.totalPrice = priceInfo.totalPrice
      orderDetails.shippingCharge = priceInfo.shippingCharge
      orderDetails.tax = priceInfo.tax
      orderDetails.grandTotal = priceInfo.grandTotal
    }

    
    //handlers
    const submitHandler = async (e) => {
        
          e.preventDefault()

          //document.querySelector('#pay_btn').disabled = truepayment
          document.querySelector('#pay_btn').disabled = true

          dispatch(generateOrder(orderDetails)) // dispatching the action creator to generate a new order
          toast.success(`🦄 order is successful`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})

          navigate('/order/success')

    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            {/* <DeliverySteps address confirmOrder payment /> */}
            <CheckoutSteps address doubleCheck payment />   {/* this component is for the orange color arrow design for each step - address, doublecheck and payment*/}

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                  
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Payment</h1>

                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - ${priceInfo && priceInfo.grandTotal}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default PaymentCod
