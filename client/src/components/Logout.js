import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import { UserContext } from '../contexts/userContext'

function Logout () {
  const { setUser } = useContext(UserContext)
  const logout = () => fetch('/logout').then(() => setUser(null))

  return <Nav.Link onClick={logout}>Logout</Nav.Link>
}

export default Logout
