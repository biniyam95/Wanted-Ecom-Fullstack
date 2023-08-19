//imports
import React from 'react'
import  ReactDOM  from 'react-dom'


//App component
import App from './App';

//Provider
import { Provider } from 'react-redux';

import Store from './store'

//import toastContainer 
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render( 
  <React.StrictMode>
          
    <Provider store={Store}>
        <App />
    </Provider>  
    <ToastContainer /> 
    
  </React.StrictMode>,
  document.getElementById('root')
);


