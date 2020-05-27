import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import ReadMoreReact from 'read-more-react';
import { Item } from 'semantic-ui-react'
import { Card, Nav } from 'react-bootstrap'

function Post (props) {
  const dateCreated = new Date(props.data.created_at)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [userResponse, setUserResponse] = useState(null)

  const getUser = async () => {
    const req = await fetch(`/user/${props.data.user_id}`)
    const userResponse = await req.json()
    setUserResponse(userResponse)
    console.log(userResponse)
  }

  useEffect(() => {
    getUser()
  },[])

  return (
      <Item style={{width:"80%", marginLeft:"10%", marginTop:"30px", border:"2px solid black", padding:"15px", boxShadow:"2px 5px #888888"}}>
        {userResponse ? (
          <LinkContainer style={{ color: 'white' }} to={`/user/${userResponse.id}`}>
            <Nav.Link><h6 class="card-subtitle mb-2 text-muted">{userResponse.username}</h6></Nav.Link>
          </LinkContainer>
        ) : ''}
        <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Content>
          <Item.Header as='a'>{props.data.title}</Item.Header>
          <Item.Meta>
            {months[dateCreated.getMonth()]} {dateCreated.getDate()}, {dateCreated.getFullYear()} {dateCreated.getHours()}:{dateCreated.getMinutes()} {dateCreated.getHours() >= 12 ? "PM" : "AM"}
          </Item.Meta>
          <Item.Description>
            <ReadMoreReact
              text={props.data.content}
              min={200}
              max={500}
              ideal={300}
              readMoreText="...See More"
            />
          </Item.Description>
          <Item.Extra>
            <Card.Link href="#">Like</Card.Link>
            <Card.Link href="#">Comments</Card.Link>
          </Item.Extra>
        </Item.Content>
      </Item>
  )
}

export default Post
