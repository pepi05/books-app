import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
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
  Spinner,
} from "reactstrap";
import { register, resetUserErrors } from "../../redux/actions/userAction";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorRegisterMessage, setErrorRegisterMessage] = useState("");
  const [successRegisterMessage, setSuccessRegisterMessage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.user.registerError) {
      setSuccessRegisterMessage(null);
      setErrorRegisterMessage(state.user.registerError);
      dispatch(resetUserErrors());
    }
    if (state.user.registerSuccess) {
      setErrorRegisterMessage(null);
      setSuccessRegisterMessage(state.user.registerSuccess);
    }
  }, [state.user]);

  const loading = useSelector((state) => state.user.loading);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(register(name, email, password, confirmPassword));
  };

  return (
    <Container className="login-container">
      {!loading ? (
        <Row>
          <Col sm={12} md={4}>
            <h3>Create your account</h3>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged
            </p>
          </Col>

          <Col sm={12} md={8}>
            <Form className="form" onSubmit={handleFormSubmit}>
              <Row>
                <Col>
                  {" "}
                  <FormGroup>
                    <Label for="exampleName">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="exampleName"
                      placeholder="Enter your name"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  {" "}
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
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
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
                </Col>
                <Col>
                  {" "}
                  <FormGroup>
                    <Label for="exampleConfirmPassword">Confirm Password</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      id="exampleConfirmPassword"
                      placeholder="Confirm your password"
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button>REGISTER</Button>
            </Form>
            {errorRegisterMessage && (
              <div>
                <Alert color="danger">{errorRegisterMessage}</Alert>
              </div>
            )}
            {successRegisterMessage && (
              <div>
                <Alert color="info">{successRegisterMessage}</Alert>
              </div>
            )}
          </Col>
        </Row>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Register;
