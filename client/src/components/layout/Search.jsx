import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = ({onSearch}) => {

    const [prodName, setProdName] = useState('')


    //when search button is clicked
    const searchHandler = (e) => {
        e.preventDefault()

        if (prodName.trim()) { 
          onSearch(prodName);
        }
    }

    //render
    return (
        <form onSubmit={searchHandler} >
            <div className="input-group">
                <input type="text" id="search_field" className="form-control"
                    placeholder="Search Product here"
                    onChange={(e) => setProdName(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search
