import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React from "react";

function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "login.php",
      data: {
        username,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then(() => {
        setLogin(true);
      })
      .catch(() => {
        e = new Error();
      });
  };

  if (login === true) {
    return (
        <h1 className="display-6">
          {" "}
          Login Successful.
          <a href="index.html"> Click this link to return to Arcadia </a>{" "}
        </h1>
    );
  }

  return (
      <div className="fcf-body">
        <Form onSubmit={(e) => handleSubmit(e)}>
          {/* email */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="fcf-label">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="fcf-input-group"
            />
          </Form.Group>

          {/* password */}
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="fcf-label">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="fcf-input-group"
            />
          </Form.Group>

          {/* submit button */}
          <div className="fcf-form-group">
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
  );
}

export default Login;
