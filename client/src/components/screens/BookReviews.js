import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  Col,
  Container,
  Row,
} from "reactstrap";
import { getBookReviews } from "../../redux/actions/bookAction";

const BookReviews = () => {
  const dispatch = useDispatch();

  const { bookId } = useParams();

  const book = useSelector((state) => state.books.bookReviews);

  useEffect(() => {
    dispatch(getBookReviews(bookId));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          {book && (
            <div>
              {" "}
              <h2>Book Reviews: ({book.numReviews})</h2>{" "}
              <h5 className="mb-2 text-muted">BOOK RATING: {book.rating}</h5>
            </div>
          )}
          {book &&
            book.reviews.map((review) => {
              return (
                <Card>
                  <CardBody>
                    {[...Array(5)].map((star, key) => {
                      return (
                        <label>
                          <FaStar
                            key={key}
                            className="star"
                            color={
                              `${review.rate}` > key ? "#ffc107" : "#e4e5e9"
                            }
                          />
                        </label>
                      );
                    })}
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Posted By: {review.postedBy.email}
                    </CardSubtitle>
                    <CardText>{review.comment}</CardText>
                  </CardBody>
                </Card>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default BookReviews;
