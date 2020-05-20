import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/userContext'

import { Link } from 'react-router-dom'

const Home = () => {
    const { user } = useContext(UserContext)
    const [communities, setCommunities] = useState(null)
  
    useEffect(() => {
      getCommunities()
        .then((list) => { setCommunities(list) })
    }, [user])
  
    const getCommunities = async () => {
      if (user) {
        console.log('hi')
        const req = await fetch(`/communitiesByUser/${user.id}`)
        const list = await req.json()
        console.log(list)
        return list
      }
    }
    console.log(user)
   
return (
    <div>{
    communities != null && user != null
    ? communities.map((community) => {
      return <Link to={`/news/${community.id}`}>
        <h1>{community.name}</h1>
             </Link>
    })
    : <h1>Is Loading</h1>}
    </div>
  )
}
  export default Home