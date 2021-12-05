import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Container,
  Header,
  Icon,
} from "semantic-ui-react";
import { useUserContext } from "../contextapi";
function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };
    await fetch("http://localhost:4000//v1/signin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUser(Object.values(data)[0]);
        window.localStorage.setItem(
          "user",
          JSON.stringify(Object.values(data)[0])
        );
      })
      .then((data) => {
        setEmail("");
        setPassword("");
      })
      .then(() => {
        navigate("/");
      });
  };
  console.log(user);
  return (
    <Container>
      <Header as="h2" icon>
        <Icon name="settings" />
        Account Settings
        <Header.Subheader></Header.Subheader>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>

        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default Adminlogin;
