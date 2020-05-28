import React, { useState, useContext, useEffect } from 'react'
import Post from './Post'
import { UserContext } from '../contexts/userContext'
import { Item } from 'semantic-ui-react'
import { Jumbotron } from 'react-bootstrap'

/**
 * Account Page: Shows all posts for logged in user
 */
function Account () {
  const [posts, setPosts] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/posts-user/${user.id}`)
      const rawPosts = await res.json()
      return setPosts(rawPosts)
    }
    getPost()
  }, [])

  return (
    <div>
      <Jumbotron>
        <h1>Hello, {user.username}</h1>
      </Jumbotron>
      <Item.Group>
        {posts.map((obj, i) => (
          <Post key={i} data={obj} account />
        ))}
      </Item.Group>
    </div>
  )
}

export default Account
