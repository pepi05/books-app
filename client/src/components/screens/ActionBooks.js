import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import { fetchByCategoryBooks } from "../../redux/actions/bookAction";

const ActionBooks = () => {
  const [categoryBooks, setCategoryBooks] = useState();

  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.fetchedByCategory);
  // const category = window.location.pathname;
  const { categoryName } = useParams();

  useEffect(() => {
    dispatch(fetchByCategoryBooks(categoryName));
  }, [categoryName]);

  useEffect(() => {
    if (books) {
      setCategoryBooks(books);
    }
  }, [categoryName, books]);

  const LOCAL_SERVER = "localhost:5000";
  const HEROKU_SERVER = "library-mk.herokuapp.com";

  return (
    <Container>
      <Row>
        {categoryBooks &&
          categoryBooks.map((book, key) => {
            return (
              <Col sm={12} md={6} lg={4}>
                <Card
                  key={key}
                  style={{ width: "18rem", marginBottom: "35px" }}
                >
                  <CardImg
                    alt="..."
                    src={`http://${
                      LOCAL_SERVER || HEROKU_SERVER
                    }/public/files/foldertest/${book.image}`}
                    // src={`http://localhost:5000/public/files/foldertest/${book.image}`}
                    top
                    height="300px"
                  ></CardImg>
                  <CardBody>
                    <CardTitle>{book.title}</CardTitle>

                    <p>Book Rating: {book.rating}</p>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default ActionBooks;
