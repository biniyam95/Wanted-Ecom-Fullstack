import React, { Fragment, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import {  toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { getProductList, deleteProduct, clearErrors } from '../../ActionCreator/product_AC'
import { DELETE_PRODUCT_RESET } from '../../ActionTypes/product'

const ProductList = () => {

    
    const navigate= useNavigate()
    const dispatch = useDispatch();

    const { loading, error, allProducts } = useSelector(state => state.getAllProductsReducer);
    const { deleteError, isDeleted } = useSelector(state => state.deleteProductReducer)

    useEffect(() => {
        
        dispatch(getProductList())
        
         if (isDeleted) {
          toast.success(`🦄 Product deleted successfully`,{position: "top-right",autoClose: 500,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})

            navigate('/admin/product/list');
            dispatch({ type: DELETE_PRODUCT_RESET })
        } 

        if (error) {
          toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 500,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
          dispatch(clearErrors())
        }

         if (deleteError) {
          toast.error(`🦄 ${deleteError}`,{position: "top-right",autoClose: 500,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
          dispatch(clearErrors())
        } 


    }, [dispatch, navigate, error, deleteError, isDeleted  ])

    const setProducts = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', sort: 'asc'},
                { label: 'Name', field: 'name', sort: 'asc'},
                { label: 'Category', field: 'category', sort: 'asc'},
                { label: 'Price', field: 'price', sort: 'asc'},
                { label: 'Stock', field: 'stock', sort: 'asc'},
                {  label: 'Actions', field: 'actions' }
              ],
            rows: []
        }

        allProducts.forEach(aProduct => {
            data.rows.push({
                id: aProduct._id,
                name: aProduct.name,
                category:aProduct.category,
                price: `$${aProduct.price}`,
                stock: aProduct.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/edit/${aProduct._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2"  onClick={() => deleteProductHandler(aProduct._id)} >
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

     const deleteProductHandler = (id) => {
       dispatch(deleteProduct(id))
    } 

    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()} className="px-3" bordered striped hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductList
