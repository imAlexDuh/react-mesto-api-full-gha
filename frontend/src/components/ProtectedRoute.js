import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, component: Component, ...otherprops}) => {
    return (
        <Route>
            {loggedIn ? <Component {...otherprops} /> : <Redirect to="/sign-in" />}
        </Route>
    )
}

export default ProtectedRoute;