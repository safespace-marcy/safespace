import React, { useState, useEffect, useContext } from 'react'
import { Item } from 'semantic-ui-react'
import { Card } from 'react-bootstrap'
import { UserContext } from '../contexts/userContext'

function Post (props) {
  const { user } = useContext(UserContext)
  const [likes, setLikes] = useState([])
  const [userLiked, setUserLiked] = useState('Like')
  const dateCreated = new Date(props.data.created_at)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  useEffect(() => {
    const getLikes = async() =>{
      const req = await fetch(`/likes/${props.data.id}`)
      const res = await req.json() 
      setLikes(res)
      for(let i = 0; i < likes.length; i++){
        if(likes[i].user_id === user.id){
          return setUserLiked('Un-Like')
        }
      }
    }
   
  getLikes()
  },[likes])

  const like = async() =>{
    const postLike = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if(userLiked === 'Un-Like'){
      const req = await fetch(`/unlike/${props.data.id}/${user.id}`, postLike) 
      const res = await req.json() 
      setLikes(res)
      setUserLiked('Like')
    }else{ 
      const req = await fetch(`/like/${props.data.id}/${user.id}`, postLike) 
      const res = await req.json() 
      setLikes(res)
      setUserLiked('Un-Like')
    }
  }
  
  const getComments = () =>{
    
  }

  return (
      <Item style={{width:"80%", marginLeft:"10%", marginTop:"30px", border:"2px solid black", padding:"15px", boxShadow:"2px 5px #888888"}}>
        <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Content>
          <Item.Header as='a'>{props.data.title}</Item.Header>
          <Item.Meta>
            {months[dateCreated.getMonth()]} {dateCreated.getDate()}, {dateCreated.getFullYear()} {dateCreated.getHours()}:{dateCreated.getMinutes()} {dateCreated.getHours() >= 12 ? "PM" : "AM"}
          </Item.Meta>
          <Item.Description>
            <p>{props.data.content}</p>
          </Item.Description>
          <Item.Extra>
            <Card.Link>{likes.length}</Card.Link>
            <Card.Link onClick={()=>{like()}} >{userLiked}</Card.Link>
            <Card.Link onClick={()=>{getComments()}}>Comments</Card.Link>
          </Item.Extra>
        </Item.Content>
      </Item>
  )
}

export default Post
