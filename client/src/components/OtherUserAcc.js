import React, { useState, useContext, useEffect } from 'react'
import Post from './Post'
import { useParams } from 'react-router-dom'
import { Item } from 'semantic-ui-react'
import { Jumbotron } from 'react-bootstrap'

function OtherUser () {
  const { id } = useParams()
  const [user, setUser] = useState('')
  const [posts, setPosts] = useState([])

  const getUser = async () => {
    const req = await fetch(`/user/${id}`)
    const data = await req.json()
    return setUser(data)
  }
  
  const getPosts = async () => {
    const req = await fetch(`/posts-user/${id}`)
    const data = await req.json()
    return setPosts(data)
  }
  
  useEffect(() => {
    getUser()
    getPosts()
  }, [])

  console.log(user)
  console.log(posts)
  
  return (
    <div>
      <Jumbotron>
        <h1>{user.username}</h1>
      </Jumbotron>
      <Item.Group>
        {posts.map((res, i) => (
          <Post key={i} data={res}/>
        ))}
      </Item.Group>
    </div>
  )
}

export default OtherUser