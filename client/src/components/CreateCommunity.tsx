import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Input, TextArea } from "@gympass/yoga";
import AvatarPicker from "./AvatarGen";

const CreateCommunity = () => {
  const { user }: any = useContext(UserContext);
  const communityValues = {
    communityName: "",
    displayName: "",
    headline: "",
    description: "",
    seed: "safespace",
    sprite: "jdenticon",
  };

  const [values, setValues] = useState(communityValues);
  const [errors, setErrors] = useState([""]);
  const [completed, setCompleted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const newCommunityValues = {
      ...values,
      [name]: value,
    };
    setValues(newCommunityValues);
  };

  // Irregulars
  function setAvatarSeed(value: string) {
    const newCommunityValues = {
      ...values,
      seed: value,
    };
    setValues(newCommunityValues);
  }

  function setAvatarType(value: string) {
    const newCommunityValues = {
      ...values,
      sprite: value,
    };
    setValues(newCommunityValues);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errors = validateInputs(values);
    if (errors.length) return warn(errors);

    const communityData = { ...values };
    const commRes = await fetch("/communities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(communityData),
    });
    const newCommId = await commRes.json();
    setCompleted(true);
  };

  interface Inputs {
    communityName: string;
    displayName: string;
    headline: string;
  }

  function validateInputs(inputs: Inputs) {
    const { communityName, displayName, headline } = inputs;
    const errors = [];
    if (!communityName) {
      errors.push("Choosing a name is mandatory!");
    }

    if (!displayName) {
      errors.push("Please choose a name to represent your comunity");
    }

    // Community name: 32 characters. Alphanumeric and underscore
    if (/\W/gi.test(communityName)) {
      errors.push(
        "Community name must only contain letters, numbers, and underscores!"
      );
    }
    // Display name: 32 characters
    if (displayName.length > 32) {
      errors.push("The display name is limited to 32 characters or less!");
    }
    return errors;
  }

  function warn(errorsArr: string[]) {
    setErrors(errorsArr);
    setTimeout(() => {
      setErrors([]);
    }, 4000);
  }

  const {
    communityName,
    displayName,
    headline,
    description,
    sprite,
    seed,
  } = values;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    >
      <Card style={{ width: "25rem", border: "0px" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            <h1>Create a Community</h1>
          </Card.Title>
          <Container
            style={{ marginTop: "25px" }}
            className="justify-content-md-center"
            fluid="lg"
          >
            <Form onSubmit={handleSubmit}>
              <AvatarPicker
                seed={seed}
                sprite={sprite}
                setSeed={setAvatarSeed}
                setSprite={setAvatarType}
              />
              <div>
                <Form.Group>
                  <Input
                    name="communityName"
                    value={communityName}
                    onChange={handleChange}
                    type="text"
                    label="Community Name"
                    helper="This name is more like a 'username' and so must be unique"
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group>
                  <Input
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    type="text"
                    label="Display Name"
                    helper="This is the name others will see"
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group>
                  <Input
                    name="headline"
                    value={headline}
                    onChange={handleChange}
                    type="text"
                    label="Headline"
                    helper="Briefly summarize your community to attract like-minded people"
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group>
                  <TextArea
                    name="description"
                    value={description}
                    onChange={handleChange}
                    label="Description"
                    helper="Tell everyone what this community is about!"
                  />
                </Form.Group>
              </div>
              <>
                <h3>Description Suggestions</h3>
                <ul>
                  <li>What inspired you to create this community?</li>
                  <li>
                    What should I be looking for if I want to join this
                    community?
                  </li>
                  <li>
                    What rules and guideslines should users follow when posting
                    here?
                  </li>
                </ul>
              </>
              {!!errors.length &&
                errors.map((err) => (
                  <Alert variant="warning" key={err}>
                    {err}
                  </Alert>
                ))}
              <Button type="submit">Create Community</Button>
            </Form>
            {completed && <Redirect to="/" />}
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateCommunity;
