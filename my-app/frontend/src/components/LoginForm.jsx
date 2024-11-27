import { useField } from "../hooks";
import { login } from "../requests";
import { setToken } from "../requests";
import { useUserDispatch } from "./UserContext";
import { useErrorDispatch } from "./ErrorContext";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const navigate = useNavigate();
  const username = useField("text");
  const password = useField("password");
  const userDispatch = useUserDispatch();
  const errorDispatch = useErrorDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    navigate("/");
    try {
      const user = await login({
        username: username.input.value,
        password: password.input.value,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      console.log("User", user);
      setToken(user.token);
      userDispatch({ type: "LOGIN", payload: user });
    } catch (exception) {
      console.log(exception);
      errorDispatch({
        type: "UPDATE",
        payload: exception.response.data.error,
      });
      username.reset();
      password.reset();
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control className="input" {...username.input} />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control className="input" {...password.input} />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
