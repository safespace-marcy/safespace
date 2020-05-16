import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Landing from './components/Landing'
import NavBar from './components/NavBar'

function App () {
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
    </Router>
  )
}

export default App
