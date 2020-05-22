import React, { useState, useEffect } from 'react'
import { Jumbotron, Tabs, Tab } from 'react-bootstrap'
import Post from './Post'
import { useParams } from 'react-router-dom'
import { Item } from 'semantic-ui-react'

const Community = () => {
  const [posts, setPosts] = useState([])
  const [community, setCommunity] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const getPosts = async () => {
      const req = await fetch(`/posts-community/${id}`)
      const response = await req.json()
      setPosts(response)
    }
    const getCommunity = async() => {
      const req = await fetch(`/communities/${id}`)
      const res = await req.json()
      setCommunity(res)
    }
    getCommunity()
    getPosts()
  },[id])

  return (
    <div>
      <Jumbotron>
        <h1>{community.name}</h1>
        <p>
          {community.description}
        </p>
      </Jumbotron>
      <Tabs defaultActiveKey="newsfeed" transition={false} id="noanim-tab-example">
        <Tab eventKey="newsfeed" title="Newsfeed">
            <Item.Group>
              {posts.map((res, i) => {
                return (
                  <Post key={i} data={res}/>
                )
              })}
            </Item.Group>
        </Tab>
        <Tab eventKey="about" title="About">
          <h1>About Us</h1>
        </Tab>
        <Tab eventKey="admins" title="Admins">
          <h1>List of admins here</h1>
        </Tab>
      </Tabs>




    </div>
  )
}

export default Community
