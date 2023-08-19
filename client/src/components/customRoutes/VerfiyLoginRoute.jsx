import React,{Fragment} from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VerifyLoginRoute = ({ element: Element, ...rest }) => {
  const { loggedIn, loading } = useSelector(state => state.authReducer);


  return (
    <>
        {!loading && (
          <Routes>
            <Route
                {...rest} render={props => {
                    if (!loggedIn)  return <Navigate to='/login' replace />
                    
  
                    
                    return <Element {...props} />
                }}
            />
          </Routes>
            

        )}
    </>
  )
   
  
};

export default VerifyLoginRoute;





