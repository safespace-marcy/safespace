import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './components/RegisterForm'
import Login from './components/Login'
import Landing from './components/Landing'
import NavBar from './components/Navbar'

function App () {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/'>
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
