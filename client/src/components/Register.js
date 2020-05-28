import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Alert, Form, Container, Card } from "react-bootstrap";
import { Input } from "@gympass/yoga";
import { colorPallet } from "./Theme";
import AvatarGen from "./AvatarGen";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alert, setAlert] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [sprite, setSprite] = useState("female");
  const [seed, setSeed] = useState("safespace");

  async function registerUser() {
    fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: [sprite, seed],
        username: username,
        email: email,
        password: password,
      }),
    });
  }

  function warn(warningText) {
    setAlert(warningText);
    window.setTimeout(() => {
      setAlert(null);
    }, 5000);
  }

  /**
   * Checks user's registration credentials and warns on invalid inputs
   * @param {string} username - The user's chosen tagname
   * @param {string} email - The user's email address
   * @param {string} password - The user's password (to be hashed client-side and server-side)
   */
  const validateInputs = (username, email, password) => {
    const usernameRegex = /\W/i;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (usernameRegex.test(username)) {
      warn(
        "Oops, that username seems wrong. Try removing those special characters!"
      );
      return false;
    }
    if (username.length > 30) {
      warn("Oops, that username seems too long. Try making it shorter!");
      return false;
    }
    if (username.length < 6) {
      warn("Oops, that username seems too short. Try making it longer!");
      return false;
    }
    if (emailRegex.test(email.toLowerCase()) === false) {
      warn("Oops, that email seems wrong. Try typing it again!");
      return false;
    }
    if (password.length < 8) {
      warn("Oops, that password seems wrong. Try making it longer!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs(username, email, password)) {
      registerUser();
      return setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setRedirect(<Redirect to="/login" />);
    }
  }, [isSubmitted]);

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
            Create an account
          </Card.Title>
          <Card.Subtitle
            style={{ textAlign: "center", color: colorPallet.lightMarvel }}
            className="mb-2 "
          >
            Feel free to use an alias
          </Card.Subtitle>
          <Container
            style={{ marginTop: "25px" }}
            className="justify-content-md-center"
            fluid="lg"
          >
            {alert && <Alert variant="warning">{alert}</Alert>}
            <form onSubmit={handleSubmit} className="registerForm">
              <AvatarGen
                sprite={sprite}
                seed={seed}
                setSprite={setSprite}
                setSeed={setSeed}
              />
              <div>
                <Form.Group>
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    label="Username"
                    helper="Username must be longer than 6 characters"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onClean={(cleaned) => setUsername(cleaned)}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="formBasicEmail">
                  <Input
                    style={{ width: "100%" }}
                    type="email"
                    label="Email"
                    helper="Enter an email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onClean={(cleaned) => setEmail(cleaned)}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="formBasicPassword">
                  <Input
                    style={{ width: "100%" }}
                    type="password"
                    label="Password"
                    helper="Enter password longer than 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onClean={(cleaned) => setPassword(cleaned)}
                  />
                </Form.Group>
              </div>
              <div style={{ textAlign: "center" }}>
                <button type="submit" className="btn btn-primary">
                  Create Account
                </button>
              </div>
            </form>
            {isSubmitted && <div>{redirect}</div>}
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
