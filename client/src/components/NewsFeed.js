import React, { useState, useEffect } from 'react'
import Post from './Post'
import NewPostModal from './NewPostModal'

function NewsFeed () {
  const [response, setResponse] = useState(null)
  const [newPost, setNewPost] = useState(false)

  const getPost = async () => {
    const req = await fetch('/posts-community/1')
    const response = await req.json()
    setResponse(response)
  }

  useEffect(() => {
    getPost()
  }, [])

  return response === null ? (
    <h1>Loading</h1>
  ) : (
    <>
      <NewPostModal setNewPost={setNewPost} />
      {response.map((res, i) => (
        <Post key={res.title + i} data={res} />
      ))}
    </>
  )
}

export default NewsFeed
