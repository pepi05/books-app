import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Container, Spinner, Table } from "reactstrap";
import { deleteBook, fetchMyBooks } from "../../redux/actions/bookAction";
import { FcPlus } from "react-icons/fc";
import { RiDeleteBin4Line } from "react-icons/ri";

const MyBooks = () => {
  const [books, setBooks] = useState();

  const myBooks = useSelector((state) => state.books.myBooks);

  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  const { loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchMyBooks(token));
  }, []);

  useEffect(() => {
    if (myBooks) {
      setBooks(myBooks);
    }
  }, [myBooks]);

  const onDelete = (bookId, key) => {
    dispatch(deleteBook(bookId, token));
    const data = [...books];
    data.splice(key, 1);
    setBooks(data);
  };

  return (
    <>
      {!loading ? (
        <Container>
          <div className="my-books-container custom-card-headers">
            <h3 style={{ marginRight: "25px" }}>MY BOOKS</h3>
            <Link to="/create">
              <h4>
                <FcPlus />
              </h4>
            </Link>
          </div>

          <Table striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Delete</th>
              </tr>
            </thead>
            {books &&
              books.map((book, key) => {
                return (
                  <>
                    {/* <tbody> */}
                    <tr key={key}>
                      <td>{book.title}</td>
                      <td>{book.category}</td>
                      <td>{book.author}</td>
                      <td>
                        <p>
                          <RiDeleteBin4Line
                            onClick={() => onDelete(book._id, key)}
                          />
                        </p>
                      </td>
                    </tr>
                    {/* </tbody> */}
                  </>
                );
              })}
          </Table>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MyBooks;
