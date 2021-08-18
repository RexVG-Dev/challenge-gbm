import React from 'react';
import {  useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteCredentialsUserAction} from '../redux/actions/handle-user';

const LogoutBtn = () => {
  const { logout, isLoading, error } = useAuth0();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
  
    if( !error && !isLoading){
      dispatch (deleteCredentialsUserAction());
    }
    
  }
  return (
    <div className="m-1">
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default LogoutBtn;
