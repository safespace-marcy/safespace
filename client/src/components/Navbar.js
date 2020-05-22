import React, { useContext } from 'react'
import Logout from './Logout'
import { UserContext } from '../contexts/userContext'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { colorPallet } from './Theme'

const NavBar = () => {
  const { user } = useContext(UserContext)
  return (
    <Navbar style={{ backgroundColor: colorPallet.marvel }} expand='lg'>
      <LinkContainer style={{ color: 'white' }} to={user ? '/home' : '/'}>
        <Navbar.Brand style={{ backgroundColor: 'white' }}><i className='fas fa-feather-alt' /> SAFESPACE</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto' />
        <Nav>
          {user ? (
            <>
              <LinkContainer style={{ color: 'white' }} to='/account'>
                <Nav.Link>My Account</Nav.Link>
              </LinkContainer>
              <LinkContainer style={{ color: 'white' }} to={`/news/${user.id}`}>
                <Nav.Link>Newfeed</Nav.Link>
              </LinkContainer>
              <LinkContainer style={{ color: 'white' }} to='/spaces'>
                <Nav.Link>Safe Spaces</Nav.Link>
              </LinkContainer>
              <Logout />
            </>
          ) : (
            <>
              <LinkContainer style={{ color: 'white' }} to='/register'>
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
              <LinkContainer style={{ color: 'white' }} to='/login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
