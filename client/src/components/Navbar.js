import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavBar = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='#home'>Safespace</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to='/register'>
            <Nav.Link>Sign Up</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/login'>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
