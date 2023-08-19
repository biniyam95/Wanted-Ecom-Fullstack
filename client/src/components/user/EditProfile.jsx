import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'

import MetaData from '../layout/MetaData'
import {  toast } from 'react-toastify'


import { editProfile, preserveLogin, clearErrors } from '../../ActionCreator/user_AC'
import { EDIT_PROFILE_RESET } from '../../ActionTypes/user'

function EditProfile() {
    //states
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    

    //hooks
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const { user } = useSelector(state => state.authReducer);
    const { error, isUpdated, loading } = useSelector(state => state.profileReducer)

    useEffect(() => {
       
        if (user) {
            setName(user.name);
            setEmail(user.email);          
        }

        if (error) {
            toast.error(`🦄 ${error}`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success(`🦄 profile updated successfully`,{position: "top-right",autoClose: 1000,theme: "dark",hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined})
            dispatch(preserveLogin());

            
            navigate('/profile')

            dispatch({ type: EDIT_PROFILE_RESET})
        }

    }, [dispatch, error, navigate, isUpdated, user])

    //handler function
    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch(editProfile(name,email))
    }

    return (
        <Fragment>
            <MetaData title={'edit Profile'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit} /* encType='multipart/form-data' */>
                        <h1 className="mt-2 mb-5">Edit Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default EditProfile
