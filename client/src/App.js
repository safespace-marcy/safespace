import React from 'react'
import { UserProvider } from './contexts/userContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Landing from './components/Landing'
import NavBar from './components/Navbar'
import Register from './components/Register'
import NewsFeed from './components/NewsFeed'

const App = () => {
  return (
    <Router>
      <UserProvider>
        <div>
          <NavBar />
          <Switch>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route exact path='/'>
              <Landing />
            </Route>
            <Route path='/news'>
              <NewsFeed />
            </Route>
          </Switch>
        </div>
      </UserProvider>
    </Router>
  )
}

export default App
