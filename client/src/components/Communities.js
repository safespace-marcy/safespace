import React, { useState, useEffect } from 'react'
import { Card, Spinner, Button } from 'react-bootstrap'

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
    <Spinner animation='border' role='status'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : (
    <div style={{display:"flex", justifyContent:"center"}}>
      <div style={{display:"flex", justifyContent:"space-between", marginTop:"35px"}}>
        {response.map((res, index) => (
          <Card style={{width:"20rem", marginBottom:"15px"}} key={index}>
            <Card.Body>
              <Card.Title>{res.name}</Card.Title>
              <Card.Text>{res.description}</Card.Text>
            </Card.Body>
            <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
              <Button style={{width:"50%", borderRadius:"0px"}}>Join</Button>
              <Button variant="secondary" style={{width:"50%", borderRadius:"0px"}}>Visit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Communities
