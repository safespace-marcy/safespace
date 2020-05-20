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
    <div style={{display:"flex", justifyContent:"center", marginTop:"25px"}}>
      <div style={{textAlign:"center"}}>
        <div>
          {response.map((res, index) => (
            <Card style={{width:"50%", marginBottom:"35px"}} key={index}>
              <Card.Body>
                <Card.Title>{res.name}</Card.Title>
                <Card.Text>{res.description}</Card.Text>
              </Card.Body>
              <div style={{display:"flex", justifyContent:"space-around", marginBottom:"8px"}}>
                <Button style={{width:"20%"}}>Join</Button>
                <Button style={{width:"20%"}} variant="secondary">Visit</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Communities
