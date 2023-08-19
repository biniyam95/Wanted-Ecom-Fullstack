import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import MetaData from '../layout/MetaData'
import {  toast } from 'react-toastify'

//import DeliverySteps from './DeliverySteps'
import CheckoutSteps from './CheckoutSteps'


//payment ui theme or style
const options = {
    style: {
        base: { fontSize: '16px' },
        invalid: { color: '#9e2146'}
    }
}

const PaymentStripe = () => {

    //hooks
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.authReducer)
    const { cartItems, addressInfo } = useSelector(state => state.cartReducer)
    
    //useEffect
    useEffect(() => {

        if (error) {
            toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
            dispatch(clearErrors())
        }

    }, [dispatch, error])
   
    //order details
    const order = {
        orderItems: cartItems,
        addressInfo
    }
    //paymentInfo
    const paymentInfo = JSON.parse(sessionStorage.getItem('paymentInfo'));
    if (paymentInfo) {
        order.itemsPrice = paymentInfo.itemsPrice
        order.shippingPrice = paymentInfo.shippingPrice
        order.taxPrice = paymentInfo.taxPrice
        order.totalPrice = paymentInfo.totalPrice
    }

    const paymentData = { amount: Math.round(paymentInfo.totalPrice * 100) }
    
    //handlers
    const submitHandler = async (e) => {
        
          e.preventDefault()

          document.querySelector('#pay_btn').disabled = truepayment
          let res;
          
          try {
            const config = {
                headers: { 'Content-Type': 'application/json'}
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            console.log(clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                toast.error(`🦄 ${result.error.message}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
                
                document.querySelector('#pay_btn').disabled = false;
            } 
            else {
                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {
                
                  //---->create a new order---->
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(generateOrder(order))

                    navigate('/success')
                } else {
                    toast.error(`🦄 There is some issue while payment processing`,{position: "top-right",autoClose: 800,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
                }
            }


        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            toast.error(`🦄 ${error.response.data.message}`,{position: "top-right",autoClose: 800,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
        }
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            {/* <DeliverySteps address confirmOrder payment /> */}
            <CheckoutSteps address confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                  
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - ${paymentInfo && paymentInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default PaymentStripe
