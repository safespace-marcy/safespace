import React, { useContext, useEffect, useState } from 'react'
import Logout from './Logout'
import { UserContext } from '../contexts/userContext'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { colorPallet } from './Theme'
import { Dropdown } from '@gympass/yoga';

const NavBar = () => {
  const { user } = useContext(UserContext)
  const [communities, setCommunities] = useState(null)

  useEffect(() => {
    const getCommunities = async () => {
      if (user) {
        const req = await fetch(`/communitiesByUser/${user.id}`)
        const list = await req.json()
        console.log(list)
        return list
      }
    }
    getCommunities()
      .then((list) => { setCommunities(list) })
  }, [user])

  console.log(communities)
  return (
    <Navbar style={{ backgroundColor: colorPallet.marvel }} expand='lg'>
      <LinkContainer style={{ color: 'white' }} to={user ? '/home' : '/'}>
        <Navbar.Brand style={{ backgroundColor: 'white' }}><i className='fas fa-feather-alt' /> SAFESPACE</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto' />
        <Nav>
          {user && communities != null? (
            <>
              <LinkContainer style={{ color: 'white' }} to='/account'>
                <Nav.Link>My Account</Nav.Link>
              </LinkContainer>

              <NavDropdown title="Newsfeeds" style={{ color: 'white' }} id="basic-nav-dropdown">
              {communities.map((community) => {
                return <NavDropdown.Item key={community.name}>
                  <LinkContainer to={`/news/member/${community.id}`}>
                    <Nav.Link>
                    {community.name}
                    </Nav.Link>
                  </LinkContainer>  
                </NavDropdown.Item>
                })}
              </NavDropdown>
              
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
