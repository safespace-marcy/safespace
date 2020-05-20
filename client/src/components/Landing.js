import React, { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { Jumbotron, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Landing = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
      <Jumbotron>
          <h1>Welcome to Safespace!</h1>
          <p>
            This is a safe space for anyone to create a community around their personal experiences, whatever that may be.
          </p>
          <p>
            <LinkContainer to='/register'>
              <Button variant="primary">Create An Account</Button>
            </LinkContainer>
          </p>
        </Jumbotron>

    </div>
  )
}

export default Landing
