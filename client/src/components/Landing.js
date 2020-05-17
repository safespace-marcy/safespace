import React, { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

const Landing = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>This is the landing page placeholder!</h1>
      {user && <p>Hello {user.username}</p>}
    </div>
  )
}

export default Landing
