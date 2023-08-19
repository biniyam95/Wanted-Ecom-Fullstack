import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import {  toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct, getAProduct, clearErrors } from '../../ActionCreator/product_AC'
import { EDIT_PRODUCT_RESET } from '../../ActionTypes/product'
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    
    const [prodImgs, setProdImgs] = useState([]);
    const [oldProdImgs, setOldProdImgs] = useState([]);  
    const [prodImgsPreview, setProdImgsPreview] = useState([]) 

    const categories = [
        'Electronics','Cameras','Laptops','Accessories','Headphones','Food',"Books",'Clothes/Shoes','Beauty/Health','Sports','Outdoor','Home'
    ]

    
    const dispatch = useDispatch()
    const params= useParams()
    const navigate = useNavigate()

    const { error, aProduct } = useSelector(state => state.getAProductReducer)
    const { loading, editError, isEdited } = useSelector(state => state.editProductReducer);

    const productId = params.id;

    useEffect(() => {

        if (aProduct && aProduct._id !== productId) {
            dispatch(getAProduct(productId))
        } else {
            //default setting
            setName(aProduct.name)
            setPrice(aProduct.price)
            setDescription(aProduct.description)
            setCategory(aProduct.category)
            setSeller(aProduct.seller)
            setStock(aProduct.stock)
            setOldProdImgs(aProduct.productImages)
        }

        if (error) {
            toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})

            dispatch(clearErrors())
        }

        if (editError) {
            toast.error(`🦄 ${editError}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})

            dispatch(clearErrors())
        }


        if (isEdited) {
            navigate('/admin/product/list');
            dispatch(getAProduct(productId))
            toast.success(`🦄 Product edited successfully`,{position: "top-right",autoClose: 500,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
            dispatch({ type: EDIT_PRODUCT_RESET })
        }

    }, [dispatch, error,  isEdited,  editError, aProduct, productId, params.id ,navigate])

    //updation submit handler 
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        prodImgs.forEach(item => {
            formData.append('prodImgs', item)
        }) 

        dispatch(editProduct(aProduct._id, formData))
    }

    //Image change handler
    const onImageChange = e => {

        const files = Array.from(e.target.files)

        setProdImgsPreview([]);
        setProdImgs([])
        setOldProdImgs([])

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
            <MetaData title={'Edit Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                          
                            <form className="shadow-lg" onSubmit={submitHandler}  encType='multipart/form-data' >
                                <h1 className="mb-4">Edit Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input type="text" id="name_field" className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input type="text" id="price_field" className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
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
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input type="text" id="seller_field" className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                 <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file' className='custom-file-input' id='customFile'
                                            name='prodImgs'
                                            onChange={onImageChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                 </label>
                                    </div>

                                    {/* existing images */}

                                    {oldProdImgs && oldProdImgs.map(item => (
                                        <img key={item} src={item} alt='Existing Image' className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {/* image preview be it existing or updated */}

                                    {prodImgsPreview.map(item => (
                                        <img src={item} key={item} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button type="submit" id="login_button" className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    EDIT
                            </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default EditProduct
