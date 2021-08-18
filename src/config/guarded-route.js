import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { ROLE_ADMIN } from '../redux/types';

const roleUserBase = ROLE_ADMIN;

const GuardedRoute = ({ component: Component, ...rest }) => {
  const roleUserState = useSelector(state => state.handleUsers.roleUser);

  return (
    <Route {...rest} render={(props) => (
      roleUserBase === roleUserState
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
}

export default GuardedRoute