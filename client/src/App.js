import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Login from './components/Login'
import Landing from './components/Landing'
import Navbar from './components/Navbar'

function App () {
  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
