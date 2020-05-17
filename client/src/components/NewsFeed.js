import React from 'react'
import Post from './Post'
import Spinner from 'react-bootstrap/Spinner'

function NewsFeed () {
  const [response, setResponse] = React.useState(null)

  const getPost = async () => {
    const req = await fetch('/posts-community/1')
    const response = await req.json()
    console.log(response)
    setResponse(response)
  }

  React.useEffect(
    () => { getPost() }, []

  )

  console.log('working hoe')
  return (

    response === null ? <h1>Loading</h1>
      : response.map(res => (
        <Post data={res} />
      ))

  )
}

export default NewsFeed
