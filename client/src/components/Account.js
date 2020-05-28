import React, { useState, useContext, useEffect } from 'react'
import Post from './NewPost'
import { UserContext } from '../contexts/userContext'
import { Item } from 'semantic-ui-react'
import { Jumbotron, Button } from 'react-bootstrap'

/**
 * Account Page: Shows all posts for logged in user
 */
function Account () {
  const [posts, setPosts] = useState([])
  const [showing, setShowing] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/posts-user/${user.id}`)
      const rawPosts = await res.json()
      return setPosts(rawPosts)
    }
    getPost()
  }, [showing])

  // incomplete
  return (
    <div>
      {!showing ? <Button onClick={() => setShowing(p => !p)}>Show All My Posts</Button>
        :
      <>
        <Jumbotron>
          <h1>Hello, {user?.username}</h1>
        </Jumbotron>
        <Item.Group>
          {posts?.map((obj, i) => (
            <Post key={i} data={obj} account />
          ))}
        </Item.Group>
      </>}
    </div>
  )
}

export default Account
