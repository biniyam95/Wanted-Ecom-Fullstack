import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { toast } from 'react-toastify'

import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getaOrder, clearErrors } from '../../ActionCreator/order_AC'

const SingleOrder = () => {

    const dispatch = useDispatch()
    const params= useParams()


    const { loading, error, aOrder = {} } = useSelector(state => state.getaOrderReducer)
    const { addressInfo, orderedItems, userId, grandTotal, orderStatus } = aOrder

    useEffect(() => {
        dispatch( getaOrder(params.id) )

        if (error) {
          toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 500,theme: "light",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
          dispatch(clearErrors())
        }
    }, [dispatch, error, params.id])

    const AddressInfo = addressInfo && `${addressInfo.street}, ${addressInfo.city}, ${addressInfo.zip}, ${addressInfo.country}`

   // const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
   const isPaid=true

    return (
        <Fragment>
            <MetaData title={'single order details'} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order # {aOrder._id}</h1>

                            <h4 className="mb-4">Address Info</h4>
                            <p><b>Name:</b> {userId && userId.name}</p>  
                            <p><b>Phone:</b> {addressInfo && addressInfo.phone}</p>
                            <p className="mb-4"><b>Address:</b>{AddressInfo}</p>
                            <p><b>Amount:</b> ${grandTotal}</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>


                            <h4 className="my-4">Order Status:</h4>
                            <p className={aOrder.orderStatus && String(aOrder.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                            <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {orderedItems && orderedItems.map(item => (
                                    <div key={item.prodId} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src='/images/airpords.jpg' alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.prodId}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>$ {item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default SingleOrder
