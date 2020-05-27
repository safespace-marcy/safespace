import React, { useState, useEffect, useContext } from 'react'
import { Item, Icon, Button, Dropdown } from 'semantic-ui-react'
import { Card, Nav } from 'react-bootstrap'
import { UserContext } from '../contexts/userContext'
import CommentList from './CommentList'
import ReadMoreReact from 'read-more-react'
import { LinkContainer } from 'react-router-bootstrap'

function Post (props) {
  const { user } = useContext(UserContext)
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState(null)
  const [isCommentsShowing, setIsCommentsShowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const dateCreated = new Date(props.data.created_at)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  useEffect(() => {
    const getLikes = async () => {
      const req = await fetch(`/likes/${props.data.id}`)
      const res = await req.json()
      console.log(res)
      setLikes(res)
      for (let i = 0; i < likes.length; i++) {
        if (likes[i].user_id === user.id) {
          return setIsLiked(true)
        }
      }
    }

    getLikes()
  }, [isLiked])

  const [userResponse, setUserResponse] = useState(null)

  const getUser = async () => {
    const req = await fetch(`/user/${props.data.user_id}`)
    const userResponse = await req.json()
    setUserResponse(userResponse)
  }

  useEffect(() => {
    getUser()
  }, [])

  const like = async () => {
    const postLike = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (isLiked === true) {
      const req = await fetch(`/unlike/${props.data.id}/${user.id}`, postLike)
      const res = await req.json()
      setLikes(res)
      setIsLiked(false)
    } else {
      const req = await fetch(`/like/${props.data.id}/${user.id}`, postLike)
      const res = await req.json()
      setLikes(res)
      setIsLiked(true)
    }
  }

  const getComments = async () => {
    if (isCommentsShowing) {
      setIsCommentsShowing(false)
    } else {
      const req = await fetch(`/comments/${props.data.id}`)
      const comments = await req.json()
      console.log(comments)
      setComments(comments)
      setIsCommentsShowing(true)
    }
  }

  return (

    <Item style={{ width: '80%', marginLeft: '10%', marginTop: '30px', border: '2px solid black', padding: '15px', boxShadow: '2px 5px #888888' }}>

      <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      <Item.Content>
        <Item.Header as='a'>{props.data.title}
          {userResponse ? (
            <LinkContainer to={`/user/${userResponse.id}`}>
              <Nav.Link>{userResponse.username}</Nav.Link>
            </LinkContainer>
          ) : ''}
        </Item.Header>
        {props.data.user_id === user.id && <Button floated='right'>
          <Dropdown floated='right' icon='edit'>
            <Dropdown.Menu>
              <Dropdown.Item text='Delete' />
              <Dropdown.Item text='Edit' />
            </Dropdown.Menu>
          </Dropdown>
        </Button>}
        <Item.Meta>
          {months[dateCreated.getMonth()]} {dateCreated.getDate()}, {dateCreated.getFullYear()} {dateCreated.getHours()}:{dateCreated.getMinutes()} {dateCreated.getHours() >= 12 ? 'PM' : 'AM'}
        </Item.Meta>
        <Item.Description>
          <ReadMoreReact
            text={props.data.content}
            min={200}
            max={500}
            ideal={300}
            readMoreText='...See More'
          />
        </Item.Description>
        <Item.Extra>
          <Card.Link>{likes.length}</Card.Link>
          <Card.Link onClick={() => like()}>{isLiked ? 'Un-Like' : 'Like'}</Card.Link>
          <Card.Link onClick={() => getComments()}>Comments</Card.Link>
        </Item.Extra>
        <div>
          {isCommentsShowing && <CommentList data={comments} />}
        </div>
      </Item.Content>
    </Item>

  )
}

export default Post
