import React from 'react'
import { UserProvider } from './contexts/userContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Landing from './components/Landing'
import NavBar from './components/Navbar'
import Register from './components/Register'
import NewsFeed from './components/NewsFeed'
import Communities from './components/Communities'
import { ThemeProvider } from '@gympass/yoga'

const App = () => {
  return (
    <Router>
      <ThemeProvider>
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
              <Route path='/news'>
                <NewsFeed />
              </Route>
              <Route path='/communities'>
                <Communities />
              </Route>
              <Route path='/'>
                <Landing />
              </Route>
            </Switch>
          </div>
        </UserProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
