import React from 'react'
import { Link } from 'react-router-dom'

//address-confirmOrder-payment
const CheckoutSteps = ({ address, doubleCheck ,payment }) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">
         
         {/* 1st- address */}
            {address ? <Link to='/deliveryAddress' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Address</div>
                <div className="triangle-active"></div></Link>
             : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Address</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

         {/* 2nd- confirmOrder */}
            {doubleCheck ? <Link to='/doublecheck' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Double Check</div>
                <div className="triangle-active"></div></Link>
             : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Double Check</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

         {/* 3rd- payment */}
            {payment ? <Link to='/payment' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div></Link>
             : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Payment</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

        </div>
    )
}

export default CheckoutSteps
