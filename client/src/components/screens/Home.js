import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { scaleRotate, slide as Menu } from "react-burger-menu";
import { RiCloseLine } from "react-icons/ri";
import {
  createReview,
  fetchAllBooks,
  filterBooks,
  // searchByTitle,
  // sortBooksByRating,
} from "../../redux/actions/bookAction";
import StarRating from "../ui/StarRating";

const Home = () => {
  const [allBooks, setAllBooks] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalBook, setModalBook] = useState({
    image: null,
    title: null,
    category: null,
    author: null,
    description: null,
  });

  const [rating, setRating] = useState([]);

  const [titleSearch, setTitleSearch] = useState();
  const [rateFilter, setRateFilter] = useState();

  const token = localStorage.getItem("jwt");
  const user = useSelector((state) => state.user.loggedUserInfo);

  const toggleModal = (image, title, category, author, description) => {
    setShowModal(!showModal);
    setModalBook({
      image: image,
      title: title,
      category: category,
      author: author,
      description: description,
    });
  };

  const fetchedBooks = useSelector((state) => state.books);
  const loading = useSelector((state) => state.books.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, []);

  useEffect(() => {
    if (fetchedBooks) {
      setAllBooks(fetchedBooks.books);
    }
  }, [fetchedBooks]);

  // useEffect(() => {
  //   if (rateFilter) {
  //     dispatch(sortBooksByRating(rateFilter));
  //   }
  // }, [rateFilter]);

  const reviewBookHandler = async (text, key, bookId) => {
    const userId = user.user._id;
    const ratedBook = rating.find((item) => item.bookId == bookId);

    const newRating = ratedBook.rating;
    dispatch(createReview(newRating, text, userId, token, bookId));
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    const title = titleSearch;
    const rate = rateFilter;

    dispatch(filterBooks(title, rate));

    // dispatch(searchByTitle(query));
  };

  const LOCAL_SERVER = "localhost:5000";
  const HEROKU_SERVER = "library-mk.herokuapp.com";
  return (
    <>
      {!loading ? (
        <Container>
          <Row className="search-container">
            <Col className="sort-rating-column" md={7}>
              <Input
                bsSize="sm"
                className="mb-3"
                type="select"
                id="rate"
                onChange={(e) => setRateFilter(e.target.value)}
                onClick={searchSubmitHandler}
              >
                <option value="" selected disabled hidden>
                  Sort by rating
                </option>
                <option type="number" value={1}>
                  1
                </option>
                <option type="number" value={2}>
                  2
                </option>
                <option type="number" value={3}>
                  3
                </option>
                <option type="number" value={4}>
                  4
                </option>
                <option type="number" value={5}>
                  5
                </option>
              </Input>
              {/* <Button
              className="sort-rating-btn"
              onClick={() => dispatch(sortBooksByRating())}
            >
              Sort by rating
            </Button> */}
            </Col>
            <Col md={5}>
              <Form onSubmit={searchSubmitHandler}>
                <FormGroup>
                  <Label for="exampleEmail" className="search-label">
                    <i>Search book</i>
                  </Label>
                  <Input
                    className="search-title-input"
                    type="text"
                    name="query"
                    placeholder="search by title"
                    onChange={(e) => setTitleSearch(e.target.value)}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row>
            {!allBooks || allBooks.length == 0
              ? "NO BOOKS FOUND"
              : allBooks.map((book, key) => {
                  return (
                    <>
                      <Col sm={12} md={6} lg={4}>
                        <Card
                          key={key}
                          style={{ width: "18rem", marginBottom: "35px" }}
                        >
                          <Link to={`/book/${book.category}`}>
                            {book.category}
                          </Link>

                          <CardImg
                            alt="..."
                            src={`http://${HEROKU_SERVER}/public/files/foldertest/${book.image}`}
                            top
                            height="300px"
                            onClick={() =>
                              toggleModal(
                                book.image,
                                book.title,
                                book.category,
                                book.author,
                                book.description
                              )
                            }
                          ></CardImg>
                          <CardBody>
                            <CardTitle>{book.title}</CardTitle>
                            <Link to={`/books/${book._id}/reviews`}>
                              See all reviews
                            </Link>

                            <p>
                              Book Rating:
                              {book.numReviews > 0 ? (
                                <span> {book.rating}</span>
                              ) : (
                                <span> no rating</span>
                              )}
                            </p>
                            {user && (
                              <>
                                <StarRating
                                  rating={rating}
                                  setRating={setRating}
                                  bookId={book._id}
                                  totalBookRating={book.rating}
                                />
                                {rating.find(
                                  (item) => item.bookId === book._id
                                ) && (
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();

                                      reviewBookHandler(
                                        e.target[0].value,
                                        key,
                                        book._id
                                      );
                                      e.target[0].value = "";
                                    }}
                                  >
                                    <InputGroup>
                                      <Input placeholder="Add review" />
                                    </InputGroup>
                                  </form>
                                )}
                              </>
                            )}
                          </CardBody>
                        </Card>
                      </Col>

                      <Modal
                        isOpen={showModal}
                        backdrop={false}
                        centered={true}
                        // key={key}
                      >
                        <ModalHeader>
                          <div>
                            {" "}
                            <h3 style={{ color: "#10a35c" }}>
                              {" "}
                              {modalBook.title}{" "}
                            </h3>
                          </div>
                          <div>
                            <RiCloseLine onClick={toggleModal} />{" "}
                          </div>
                        </ModalHeader>
                        <ModalBody>
                          <Card>
                            <Row>
                              <Col sm={6}>
                                <img
                                  alt="..."
                                  src={`http://${HEROKU_SERVER}/public/files/foldertest/${modalBook.image}`}
                                  width="100%"
                                ></img>
                                <div className="custom-card-headers">
                                  <h6>
                                    Book author: <span>{modalBook.author}</span>
                                  </h6>
                                  <h6>
                                    Book category:
                                    <span> {modalBook.category} </span>
                                  </h6>
                                </div>
                              </Col>
                              <Col sm={6} className="comments-container">
                                <div className="custom-card-headers">
                                  <h5>Book description</h5>
                                  <CardText>
                                    <span>{modalBook.description}</span>
                                  </CardText>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        </ModalBody>
                      </Modal>
                    </>
                  );
                })}
          </Row>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
