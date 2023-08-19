import React, { useState, useEffect, Fragment } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {  toast } from 'react-toastify'


import { getAllProducts  } from '../ActionCreator/product_AC'
import Loader from './layout/Loader'
import ProductCard from './product/ProductCard'

import Pagination from 'react-js-pagination'



function Home() {
  //states
  const [activePage, setActivePage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const [category, setCategory] = useState('')

   const dispatch= useDispatch()
   const params= useParams()



   const {loading,allProducts,error,prodCount,prodPerPage}= useSelector(state=>state.getAllProductsReducer)
   
   const prodName = params.prodName

   console.log(allProducts,"999")
   console.log(loading,"88")

    useEffect(()=>{
      if(error) return toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})


      dispatch(getAllProducts(activePage,prodName, price, category)) 
    
    },[dispatch,error,activePage,prodName, price, category])

    function setActivePageNo(pageNumber) {
      setActivePage(pageNumber)  
  }

  return (
    <Fragment> 
      {loading?<h1><Loader/></h1> :(
        <>
                  <MetaData title={`All your wishes on one wagon`}/>
                  <h1 id="products_heading">Trending Now</h1>
                  
                  
                  <section id="products" className="container mt-5">
                    <div className='row'>

                      {allProducts && allProducts.map(item=>(
                        <ProductCard key={item._id} allProducts={item}/>
                      ))}
                    
                    </div>
                      
                  </section>

            {/* pagination element */}

                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={activePage}
                                itemsCountPerPage={prodPerPage}
                                totalItemsCount={prodCount}
                                onChange={setActivePageNo} //to change the active page whenever we click on a page
                                itemClass="page-item" linkClass="page-link"
                            />
                        </div>
                   
        </>
      )}  
    </Fragment>
 
    
    
  )
}

export default Home