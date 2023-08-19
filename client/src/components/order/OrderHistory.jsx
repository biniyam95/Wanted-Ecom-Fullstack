import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import {  toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderHistory, clearErrors } from '../../ActionCreator/order_AC'

const OrderHistory = () => {

    const dispatch = useDispatch();

    const { loading, error, OrderHistory } = useSelector(state => state.orderHistoryReducer);

    useEffect(() => {
        dispatch(getOrderHistory());

        if (error) {
          toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
            dispatch(clearErrors())
        }
    }, [dispatch, error])

    //setOrders function to config datatable and push corresponding data
    const setOrders = () => {
        const data = {
            columns: [
                { label: 'Order ID', field: 'id', sort: 'asc' },
                { label: 'Num of Items', field: 'numOfItems', sort: 'asc' },
                { label: 'Amount', field: 'amount', sort: 'asc' },
                { label: 'Status', field: 'status', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' }],
            
            rows: []
        }

        console.log(OrderHistory,"&&%%%@@3232")

        OrderHistory.forEach(anOrder => {
            data.rows.push({
                id: anOrder._id,
                numOfItems: anOrder.orderedItems.length,
                amount: `$${anOrder.grandTotal}`,
                status: anOrder.orderStatus && String(anOrder.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{anOrder.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{anOrder.orderStatus}</p>,
                actions:
                    <Link to={`/order/${anOrder._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data;
    }

    return (
        <Fragment>

            <MetaData title={'My Orders'} />

            <h1 className="my-5">My Orders</h1>

            {loading ? <Loader /> : (
                <MDBDataTable data={setOrders()} className="px-3" bordered striped hover/>
            )}

        </Fragment>
    )
}

export default OrderHistory
