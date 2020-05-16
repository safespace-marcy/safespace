import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Login from './components/Login'
import Landing from './components/Landing'

function App () {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

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
