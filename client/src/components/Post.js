import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';

function Post () {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  
  return (
    <Card>
      <Card.Body>
  <Card.Title>${title}</Card.Title>
        <Card.Text>
          ${body}
        </Card.Text>
        <Card.Link href="#">Like</Card.Link>
        <Card.Link href="#">Comment</Card.Link>
      </Card.Body>
    </Card>
  )
}

export default Post