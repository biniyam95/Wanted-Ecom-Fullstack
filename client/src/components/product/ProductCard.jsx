import React from 'react'
import {Link} from 'react-router-dom'


function ProductCard({allProducts}) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                          <img
                            className="card-img-top mx-auto"
                            src={allProducts.productImages[0]}
                          />
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">
                              <Link to={`/product/${allProducts._id}`}>{allProducts.name}</Link>
                            </h5>
                            <div className="ratings mt-auto">
                            <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-half-o"></i>
                              <i className="fa fa-star-o"></i>
                              <span id="no_of_reviews">(5 Reviews)</span>
                            </div>
                            <p className="card-text">${allProducts.price}</p>
                            <Link to={`/product/${allProducts._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                          </div>
                        </div>
                      </div>
  )
}

export default ProductCard