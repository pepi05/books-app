import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { login, resetUserErrors } from "../../redux/actions/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const loggedUser = JSON.parse(localStorage.getItem("loggedUserInfo"));

  useEffect(() => {
    if (loggedUser) {
      history.push("/");
    }
  }, [loggedUser]);

  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.user.loginError) {
      setErrorLoginMessage(state.user.loginError);
      dispatch(resetUserErrors());
    }
  }, [state.user]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container className="login-container">
      <Row>
        <Col sm={12} md={7}>
          <h3>Welcome to City Library</h3>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged
          </p>
        </Col>

        <Col sm={12} md={5}>
          <div>
            <Form className="form" onSubmit={submitFormHandler}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="example@example.com"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter your password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormGroup>
              <Button>LOG IN</Button>
            </Form>
          </div>
        </Col>
      </Row>

      {errorLoginMessage && (
        <div>
          <Alert color="danger">{errorLoginMessage}</Alert>
        </div>
      )}
    </Container>
  );
};

export default Login;
