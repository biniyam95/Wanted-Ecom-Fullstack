import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useNavigate } from 'react-router-dom'

import {  toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, clearErrors } from '../../ActionCreator/product_AC'
import { ADD_PRODUCT_RESET } from '../../ActionTypes/product'

const AddProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [prodImgs, setProdImgs] = useState([]);
    const [prodImgsPreview, setProdImgsPreview] = useState([])

    const categories = [
        'Electronics','Cameras','Laptops','Accessories','Headphones','Food',"Books",'Clothes/Shoes',
        'Beauty/Health','Sports','Outdoor','Home'
     ]

    
    const navigate= useNavigate()  
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.addProductReducer);

    useEffect(() => {

        if (error) {
           toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
           dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/product/list');
            toast.success(`🦄 New Product Added `,{position: "top-right",autoClose: 600,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})

            dispatch({ type: ADD_PRODUCT_RESET })
        }

    }, [dispatch,navigate,  error, success])

    //submit handler
    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()

        //setting all submitted states to the formData
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        
        prodImgs.forEach( item=> {
            formData.append('prodImgs', item)
        }) 
        for (let entry of formData.entries()) {
            console.log(entry,"the formData entry");
          }

        dispatch(addProduct(formData)) 
    }

    //Image change handler
    const onImageChange = e => {

        
        const files = Array.from(e.target.files)

        setProdImgsPreview([]);
        setProdImgs([])

        files.forEach(item => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProdImgsPreview(imgArray => [...imgArray, reader.result]) 
                    setProdImgs(imgArray => [...imgArray, reader.result])
                }
            }
            reader.readAsDataURL(item)
        })
    } 


    return (
        <Fragment>
            <MetaData title={'Add New Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                          
                            <form className="shadow-lg" onSubmit={submitHandler}  encType='multipart/form-data' >
                                <h1 className="mb-4">Add New Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input type="text" id="name_field" className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input type="text" id="price_field" className="form-control"
                                           value={price}
                                           onChange={(e) => setPrice(e.target.value)}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" 
                                              value={description} 
                                              onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" 
                                            value={category} 
                                            onChange={(e) => setCategory(e.target.value)}>
                                            {categories.map(category => (
                                                <option key={category} value={category} >{category}</option>
                                            ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input type="number" id="stock_field" className="form-control"
                                           value={stock}
                                           onChange={(e) => setStock(e.target.value)}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input type="text" id="seller_field" className="form-control"
                                           value={seller}
                                           onChange={(e) => setSeller(e.target.value)}/>
                                </div>

                                {/* IMAGES */}
                                 <div className='form-group'>
                                    <label>Upload Product Images</label>

                                    <div className='custom-file'>
                                        <input  type='file' id='customFile' className='custom-file-input' 
                                                name='prodImgs'    
                                                /* name='product_images' */    
                                                multiple
                                                onChange={onImageChange} 
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                     </label>
                                    </div>
                                
                                {/* image preview */}
                                     {prodImgsPreview.map(item => (
                                        <img src={item} key={item} alt="Product Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))} 

                                </div> 


                                <button type="submit" id="login_button" className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    ADD
                                </button>

                            </form>

                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default AddProduct
