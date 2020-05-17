import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Landing from './components/Landing'
import NavBar from './components/Navbar'
import Post from './components/Card'
import Spinner from 'react-bootstrap/Spinner';

function NewsFeed () {
  const [response, setResponse] = React.useState(null)
  
  const getPost = async() =>{
    const req = await fetch('/posts-community/1')
    const response = req.json()
    setResponse(response)
  }

  React.useEffect(
    getPost(),[]
  )

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/'>
            <Landing />
          </Route>
        </Switch>
      </div>
      {response === null ? <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
      </Spinner>
      :response.map(res => (
      <Post data={res} />
      ))}
    </Router>
  )
}

export default NewsFeed