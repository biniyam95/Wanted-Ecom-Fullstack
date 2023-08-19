import React, { Fragment } from 'react'
import { useNavigate,Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'

const DoubleCheck = () => {
    //hooks
    const navigate= useNavigate()
    const { cartItems, addressInfo } = useSelector(state => state.cartReducer)
    const { user } = useSelector(state => state.authReducer)

    // Calculate Order Prices
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingCharge = totalPrice > 200 ? 0 : 25
    const tax = Number((0.05 * totalPrice).toFixed(2))
    const grandTotal = (totalPrice + shippingCharge + tax).toFixed(2) 
    
    // handlers
    const goToPayment = () => {
        const finalPrice = {
            totalPrice: totalPrice.toFixed(2),
            shippingCharge,
            tax,
            grandTotal
        }

        sessionStorage.setItem('priceInfo', JSON.stringify(finalPrice))
        navigate('/payment')
    } 


    //render
    return (
        <Fragment>

            <MetaData title={'Double check'} />

            <CheckoutSteps address doubleCheck />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Delivery Address</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {addressInfo.phone}</p>
                    <p className="mb-4"><b>Delivery Address:</b> {`${addressInfo.street}, ${addressInfo.city}, ${addressInfo.zip}, ${addressInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.prodId}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src='' alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.prodId}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${totalPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingCharge}</span></p>
                        <p>Tax:  <span className="order-summary-values">${tax}</span></p>

                        <hr />

                        <p>GrandTotal: <span className="order-summary-values">${grandTotal}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" 
                                onClick={goToPayment} 
                                > go to Payment
                        </button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default DoubleCheck
