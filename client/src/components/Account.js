import React, { useState, useContext, useEffect } from 'react'
import Post from './Post'
import { UserContext } from '../contexts/userContext'
import { Item } from 'semantic-ui-react'
import { Jumbotron } from 'react-bootstrap'

function Account () {
  const [response, setResponse] = useState([])
  const { user } = useContext(UserContext)


  useEffect(() => {
    const getPost = async () => {
      const req = await fetch(`/posts-user/${user.id}`)
      const data = await req.json()
      return setResponse(data)
    }
    getPost()
  }, [])

  return (
    <div>
      <Jumbotron>
        <h1>Hello, {user.username}</h1>
      </Jumbotron>
      <Item.Group>
        {response.map((obj, i) => (
        <Post key={i} data={obj} />
         ))}
      </Item.Group>
    </div>
  )
}

export default Account
