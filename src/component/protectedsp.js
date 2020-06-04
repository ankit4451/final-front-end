import React from 'react';
import {Redirect,Route} from 'react-router-dom';

const ProtectedSP = ({component: Cmp,...rest}) => (
    <Route
    {...rest}
    render = {(props) => 
        localStorage.getItem('user') ?(
            <Cmp {...props} />
        ):
        <Redirect
        to="/"
        />
    }
    />
)

export default ProtectedSP;