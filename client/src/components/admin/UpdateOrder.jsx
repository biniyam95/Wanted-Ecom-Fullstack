import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import {  toast } from 'react-toastify'

import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getaOrder, updateOrder, clearErrors } from '../../ActionCreator/order_AC'
import { UPDATE_ORDER_RESET } from '../../ActionTypes/order'

const UpdateOrder = () => {
  //state- order status
    const [status, setStatus] = useState('')

    //hooks
    const dispatch = useDispatch()
    const params= useParams()

    const { loading, aOrder = {} } = useSelector(state => state.getaOrderReducer)
    const { addressInfo, orderedItems, userId, grandTotal, orderStatus } = aOrder
    
    const { updateError, isUpdated } = useSelector(state => state.updateOrderReducer)

    const orderId = params.id;

    useEffect(() => {

        dispatch(getaOrder(orderId))

        if (updateError) {
            toast.error(`🦄 ${updateError}`,{position: "top-right",autoClose: 600,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
            dispatch(clearErrors())
        }


        if (isUpdated) {
          toast.success(`🦄 Order updated successfully`,{position: "top-right",autoClose: 600,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
          dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, updateError, isUpdated, orderId])


    const updateOrderHandler = (orderId) => {

        const formData = new FormData()
        formData.set('status', status)  

        dispatch(updateOrder(orderId, formData))
    }

    const AddressInfo = addressInfo && `${addressInfo.street}, ${addressInfo.city}, ${addressInfo.zip}, ${addressInfo.country}`
    const isPaid=true

    return (
        <Fragment>
            <MetaData title={`Update Order # ${aOrder && aOrder._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5">Order # {aOrder._id}</h2>

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



                                    <h4 className="my-4">Ordered Items:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {orderedItems && orderedItems.map(item => (
                                            <div key={item.product} className="row my-5">
                                                

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(aOrder._id)}>
                                        Update Status
                                    </button>
                                </div>

                            </div>
                        )}
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateOrder
