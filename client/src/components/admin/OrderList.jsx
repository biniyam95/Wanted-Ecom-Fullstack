import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'

import {  toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderList, deleteOrder, clearErrors } from '../../ActionCreator/order_AC'
import { DELETE_ORDER_RESET } from '../../ActionTypes/order'

const OrderList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, orderList } = useSelector(state => state.orderListReducer);
    const { isDeleted } = useSelector(state => state.deleteOrderReducer)

    useEffect(() => {
        dispatch(getOrderList());

        if (error) {
            toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 600,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})

            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success(`🦄 Order deleted successfully`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
            navigate('/admin/order/list');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch,navigate, error, isDeleted])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                { label: 'Order ID',field: 'id',sort: 'asc' },
                { label: 'No of Items', field: 'numofItems', sort: 'asc' },
                { label: 'Amount', field: 'amount', sort: 'asc' },
                { label: 'Status', field: 'status', sort: 'asc' },
                { label: 'Actions', field: 'actions'},
            ],
            rows: []
        }

        orderList.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderedItems.length,
                amount: `$${order.grandTotal}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <Fragment>
                    <Link to={`/admin/order/update/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'Order List'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Order List</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrderList
