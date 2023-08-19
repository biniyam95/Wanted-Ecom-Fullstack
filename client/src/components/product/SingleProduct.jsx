import React,{useEffect,useState,Fragment} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getAProduct,clearErrors} from '../../ActionCreator/product_AC'
import { toast } from 'react-toastify';
import { Carousel } from 'react-bootstrap' 
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import { useParams } from 'react-router-dom'

import { addToCart} from '../../ActionCreator/cart_AC'





function SingleProduct() {
//states
    const [quantity, setQuantity] = useState(1)
   //hooks
   const dispatch= useDispatch()


  
   const {loading,aProduct,error}=useSelector(state=>state.getAProductReducer)
   
   const params= useParams()
   
    useEffect(()=>{
      if(error) {
        toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 1000,theme: "light",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
        dispatch(clearErrors())  
    }

      dispatch(getAProduct(params.id))

    },[dispatch,params.id,error])

 //handle function
 const increaseQty=() =>{
    const count = document.querySelector('.count') 
    if (count.valueAsNumber >= aProduct.stock) return; 

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
 }
 const decreaseQty=() =>{
    const count = document.querySelector('.count') 
    if (count.valueAsNumber <=1 ) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
 }

  //addtocart
 const AddToCartHandler = () => {
    
    dispatch(addToCart(params.id, quantity))

    toast.success(`🦄 Item added to cart`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
}

//render
  return (
    <Fragment>

    {loading?(<Loader/>):(
      <>
         <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                             <Carousel pause='hover'>
                                {aProduct.productImages && aProduct.productImages.map(item => (
                                    <Carousel.Item key={item}>
                                        <img  className="d-block w-100"  src={item} alt='image'  />
                                    </Carousel.Item>
                                ))}
                            </Carousel>            
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{aProduct.name}</h3> 
                <p id="product_id">Product # {aProduct._id}</p>

                <hr/>

                <div className="rating-outer">
                    <div className="rating-inner"></div>
                </div>
                <span id="no_of_reviews">(5 Reviews)</span>

                <hr/>

                <p id="product_price">${aProduct.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                    <input type="number" className="count form-control d-inline" 
                           value={quantity} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={aProduct.stock === 0} onClick={AddToCartHandler}>Add to Cart</button>

                <hr/>

                <hr/>

                <h4 className="mt-2">Description:</h4>
                <p>{aProduct.description}</p>
                <hr/>
                <p>Status: <span id="stock_status" className={aProduct.stock > 0 ? 'greenColor' : 'redColor'}>{aProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
				
				<button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" className="form-control mt-3">

                                        </textarea>

                                        <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
						
            </div>

        </div>

    </div>
    
      </>
    )}
    </Fragment>
    
   
    )
    }

    export default SingleProduct