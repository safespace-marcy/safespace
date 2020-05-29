import React, { useContext, useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { UserContext } from "../contexts/userContext";
import { Redirect } from "react-router-dom";

function Logout({ completed, setCompleted }) {
  const { setUser } = useContext(UserContext);
  const logout = () =>
    fetch("/logout")
      .then(() => setUser(null))
      .then(() => setCompleted(true));

  useEffect(() => {}, []);

  return (
    <>
      {completed && <Redirect to="/" />}
      <Nav.Link onClick={logout}>Logout</Nav.Link>
    </>
  );
}

export default Logout;
