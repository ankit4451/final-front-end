import React from 'react';
import {Redirect,Route} from 'react-router-dom';

const ProtectedHome = ({component: Cmp,...rest}) => (
    <Route
    {...rest}
    render = {(props) => 
        localStorage.getItem('user') ?(
            <Cmp {...props} />
        ):
        <Redirect
        to="/login"
        />
    }
    />
)

export default ProtectedHome;