import React from 'react';
import {  useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LoginBtn = () => {
  const {loginWithRedirect} = useAuth0();
  return (
    <div className="m-1">
      <Button onClick={() => loginWithRedirect()}>
        Log In
      </Button>
    </div>
  )
}

export default LoginBtn;