import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateCommunity = () => {
  const [values, setValues] = useState({
    displayName: "",
    headline: "",
    description: "",
    avatarSeed: "",
    avatarType: "jdenticon",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newCommunityValues = {
      ...values,
      [name]: value,
    };
    setValues(newCommunityValues);
  };

  const { displayName, headline, description, avatarType, avatarSeed } = values;

  return (
    <>
      <h2>Update Community Details</h2>
      <Form>
        <Input
          name="displayName"
          value={displayName}
          onChange={handleChange}
          type="text"
          label="Display Name"
          helper="This is the name others will see"
        />
        <br />
        <Input
          name="headline"
          value={headline}
          onChange={handleChange}
          type="text"
          label="Headline"
          helper="Briefly summarize your community to attract like-minded people"
        />
        <br />
        <TextArea
          name="description"
          value={description}
          onChange={handleChange}
          label="Description"
          helper="Tell everyone what this community is about!"
        />
        <>
          <h3>Description Suggestions</h3>
          <ul>
            <li>What inspired you to create this community?</li>
            <li>
              What should I be looking for if I want to join this community?
            </li>
            <li>
              What rules and guideslines should users follow when posting here?
            </li>
          </ul>
        </>
        <Button type="submit">Create</Button>
      </Form>
    </>
  );
};
