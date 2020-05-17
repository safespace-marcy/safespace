import React from 'react'
import Card from 'react-bootstrap/Card'

function Post (props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>{props.data.content}</Card.Text>
        <Card.Link href='#'>Like</Card.Link>
        <Card.Link href='#'>Comment</Card.Link>
      </Card.Body>
    </Card>
  )
}

export default Post
