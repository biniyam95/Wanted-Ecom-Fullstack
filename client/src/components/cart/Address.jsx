import React, { Fragment, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import { useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'

 

import { useDispatch, useSelector } from 'react-redux'
import { addressSave } from '../../ActionCreator/cart_AC' 
import CheckoutSteps from './CheckoutSteps'




function Address () {

  const { addressInfo } = useSelector(state => state.cartReducer)

  //states
  const [street, setStreet] = useState(addressInfo.street)
  const [city, setCity] = useState(addressInfo.city)
  const [zip, setZip] = useState(addressInfo.zip)
  const [phone, setPhone] = useState(addressInfo.phone)
  const [country, setCountry] = useState(addressInfo.country ||'India')
  
  //hooks

  const dispatch = useDispatch()
  const navigate= useNavigate()
   
    //handlers
    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(addressSave({ street, city, phone, zip, country }))
        navigate('/doublecheck')
    }

    return (
        <Fragment>

            <MetaData title={'Delivery Address'} />

             <CheckoutSteps address/>

             

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Address Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Street</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Zip Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                              <option  value='India'>India</option>

                                

                            </select>
                        </div>

                        <button id="shipping_btn" type="submit" className="btn btn-block py-3"
                          >CONTINUE
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Address
