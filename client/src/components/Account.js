import React, { useState, useContext, useEffect } from 'react'
import Post from './Post'
import { UserContext } from '../contexts/userContext'

function Account () {
  const [response, setResponse] = useState([])
  const { user } = useContext(UserContext)


  useEffect(() => {
    const getPost = async () => {
      const req = await fetch(`/posts-user/${user.id}`)
      const data = await req.json()
      return setResponse(data)
    }
    getPost()
  })

  return (
    <div>
      <p>Hello</p>
      {response.map((obj) => (
        <Post data={obj} />
      ))}
    </div>
  )
}

export default Account