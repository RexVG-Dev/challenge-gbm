import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';
import {  useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Profile from './Profile';

const Header = () => {
  const {user}=useAuth0();
  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar><Nav><Link className="nav-link" to={"/"}>Challenge-GMB</Link></Nav> </Navbar>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav><Link className="nav-link" to={"/ipc-graphic"}>IPC Graphic</Link></Nav>
              <Nav><Link className="nav-link" to={"/ipc-detail"}>IPC Details</Link></Nav>
            </Nav>
            <Nav>
              { user ? <LogoutBtn/> : <LoginBtn/>}
              <Profile/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header;
