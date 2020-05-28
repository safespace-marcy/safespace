import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Alert, Form, Button, Container, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Input } from "@gympass/yoga";
import { colorPallet } from "./Theme";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [alert, setAlert] = useState(null);

  const sendCredentials = async (username, password) => {
    const data = { username: username, password: password };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        warn("Invalid Username/Password");
        throw Error("Invalid Username/Password");
      })
      .then((json) => setUser(json))
      .catch((err) => console.log(err));
  };

  function submitForm(e) {
    e.preventDefault();
    sendCredentials(username, password);
    setIsSubmitted(true);
  }

  function redirectToFeed() {
    if (user) {
      return <Redirect to="/spaces" />;
    }
  }

  function warn(warningText) {
    setAlert(warningText);
    window.setTimeout(() => {
      setAlert(null);
    }, 5000);
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    >
      <Card style={{ width: "25rem", border: "0px" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            <h1>S A F E S P A C E</h1>
          </Card.Title>
          <Card.Title
            style={{ textAlign: "center", color: colorPallet.darkMarvel }}
          >
            Log In
          </Card.Title>
          <Card.Subtitle
            style={{ textAlign: "center", color: colorPallet.lightMarvel }}
            className="mb-2"
          >
            Welcome Back!
          </Card.Subtitle>
          <Container
            style={{ marginTop: "25px" }}
            className="justify-content-md-center"
            fluid="lg"
          >
            <Form>
              {alert && <Alert variant="warning">{alert}</Alert>}
              <div>
                <Form.Group>
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onClean={(cleaned) => setUsername(cleaned)}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="formBasicPassword">
                  <Input
                    style={{ width: "100%" }}
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onClean={(cleaned) => setPassword(cleaned)}
                  />
                </Form.Group>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button onClick={submitForm} variant="primary">
                  Log In
                </Button>
              </div>
            </Form>
          </Container>
        </Card.Body>
      </Card>
      {isSubmitted ? redirectToFeed() : ""}
    </div>
  );
};

export default Login;
