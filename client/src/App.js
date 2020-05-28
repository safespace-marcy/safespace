import React from "react";
import { UserProvider } from "./contexts/userContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import NavBar from "./components/Navbar";
import Register from "./components/Register";
import Home from "./components/Home";
import NewsFeed from "./components/NewsFeed";
import Communities from "./components/Communities";
import Account from "./components/Account";
import Edit from "./components/Edit";
import OtherUser from "./components/OtherUserAcc";
import { ThemeProvider } from "@gympass/yoga";
import Community from "./components/Community";
import Chat from "./components/Chat";
import CreateCommunity from "./components/CreateCommunity";

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <UserProvider>
          <div>
            <NavBar />
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/news/:type/:id">
                <Community />
              </Route>
              <Route path="/spaces">
                <Communities />
              </Route>
              <Route path="/ex/:id">
                <NewsFeed />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route path="/view/:id">
                <Edit />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/testCom/:id">
                <Community />
              </Route>
              <Route path="/user/:id">
                <OtherUser />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route path="/create-community">
                <CreateCommunity />
              </Route>
              <Route path="/">
                <Landing />
              </Route>
            </Switch>
          </div>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
