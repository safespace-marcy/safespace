import React, { useState, useEffect } from 'react'
import {Card, Spinner} from 'react-bootstrap'


function Communities () {
  const [response, setResponse] = useState([])

  useEffect(() => {
    fetch('/communities')
      .then(res => {
        if (res.status === 200) return res.json()
        return []
      })
      .then((json) => setResponse(json))
  }, [setResponse])

  return response.length === 0 ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <>
      {response.map((res, index) => (
        <Card key={index}>
          <Card.Body>
            <Card.Title>{res.name}</Card.Title>
            <Card.Text>Some Community bio here...</Card.Text>
            <Card.Link href='#'>Join</Card.Link>
            <Card.Link href='#'>Visit</Card.Link>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default Communities
