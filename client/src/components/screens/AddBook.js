import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { createBook } from "../../redux/actions/bookAction";

const AddBook = () => {
  const [values, setValues] = useState({
    title: "",
    category: "",
    description: "",
    author: "",
    formData: new FormData(),
  });
  const { formData } = values;
  const token = localStorage.getItem("jwt");

  const history = useHistory();

  const dispatch = useDispatch();

  const bookCreateHandler = (event) => {
    event.preventDefault();

    dispatch(createBook(token, formData));
    history.push("/my-books");
  };

  const handleChange = (name) => (event) => {
    let value;
    switch (name) {
      case "image":
        value = event.target.files[0];
        break;
      default:
        value = event.target.value;
    }
    setValues({ ...values, [name]: value });
    formData.set(name, value);
  };

  return (
    <div className="custom-card-headers">
      <Container style={{ width: "70%" }}>
        <h3>ADD NEW BOOK</h3>
        <Form
          onSubmit={bookCreateHandler}
          enctype="multipart/form-data"
          method="POST"
        >
          <Row>
            <Col xs={12} md={4}>
              <Card>
                <CardBody>
                  <CardTitle>
                    <h6>Book image</h6>
                  </CardTitle>

                  <Input type="file" onChange={handleChange("image")} />
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Label for="exampleTitle">Title</Label>
              <Input
                id="exampleTitle"
                name="title"
                placeholder="Enter book title"
                type="text"
                onChange={handleChange("title")}
              />
              <Label for="category">Category</Label>
              <Input
                bsSize="sm"
                className="mb-3"
                type="select"
                id="category"
                onChange={handleChange("category")}
              >
                <option value="" selected disabled hidden>
                  Choose category
                </option>
                <option type="text" value="action">
                  action
                </option>
                <option type="text" value="classic">
                  classic
                </option>
                <option type="text" value="history">
                  history
                </option>
              </Input>
              <Label for="exampleDescription">Description</Label>
              <Input
                id="exampleDescription"
                name="description"
                placeholder="Enter book short description"
                type="text"
                onChange={handleChange("description")}
              />
              <Label for="exampleAuthor">Author</Label>
              <Input
                id="exampleAuthor"
                name="author"
                placeholder="Enter book author name"
                type="text"
                onChange={handleChange("author")}
              />
            </Col>
          </Row>
          <Button type="submit">ADD NEW BOOK</Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddBook;
