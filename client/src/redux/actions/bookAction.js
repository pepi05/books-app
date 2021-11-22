import axios from "axios";

import {
  BOOKS_FILTER_FAIL,
  BOOKS_FILTER_REQUEST,
  BOOKS_FILTER_SUCCESS,
  BOOKS_FIND_BY_TITLE_FAIL,
  BOOKS_FIND_BY_TITLE_REQUEST,
  BOOKS_FIND_BY_TITLE_SUCCESS,
  BOOKS_LIST_FAIL,
  BOOKS_LIST_REQUEST,
  BOOKS_LIST_SUCCESS,
  BOOKS_SORT_BY_RATING_FAIL,
  BOOKS_SORT_BY_RATING_REQUEST,
  BOOKS_SORT_BY_RATING_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_REVIEWS_FETCH_FAIL,
  BOOK_REVIEWS_FETCH_REQUEST,
  BOOK_REVIEWS_FETCH_SUCCESS,
  BOOK_REVIEW_CREATE_FAIL,
  BOOK_REVIEW_CREATE_SUCCESS,
  BOOK_REVIEW_UPDATE_FAIL,
  BOOK_REVIEW_UPDATE_SUCCESS,
  CATEGORY_BOOKS_FETCH_FAIL,
  CATEGORY_BOOKS_FETCH_REQUEST,
  CATEGORY_BOOKS_FETCH_SUCCESS,
  MY_BOOKS_FETCH_FAIL,
  MY_BOOKS_FETCH_REQUEST,
  MY_BOOKS_FETCH_SUCCESS,
} from "../constants/bookConstants";

const fetchAllBooks = () => async (dispatch) => {
  dispatch({ type: BOOKS_LIST_REQUEST });
  try {
    const { data } = await axios.get("/allbooks");
    dispatch({ type: BOOKS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BOOKS_LIST_FAIL, payload: error.message });
  }
};

const fetchByCategoryBooks = (category) => async (dispatch) => {
  dispatch({ type: CATEGORY_BOOKS_FETCH_REQUEST });
  try {
    const { data } = await axios.get(`/books/${category}`);
    dispatch({ type: CATEGORY_BOOKS_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_BOOKS_FETCH_FAIL, payload: error.message });
  }
};

const fetchMyBooks = (token) => async (dispatch) => {
  dispatch({ type: MY_BOOKS_FETCH_REQUEST });
  try {
    const { data } = await axios.get("/mybooks", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    dispatch({ type: MY_BOOKS_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_BOOKS_FETCH_FAIL,
      payload: new Error("You are not logged in"),
    });
  }
};

const createBook = (token, bookData) => async (dispatch) => {
  dispatch({ type: BOOK_CREATE_REQUEST });
  try {
    const { data } = await axios.post("/createbook", bookData, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });
    dispatch({ type: BOOK_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BOOK_CREATE_FAIL, payload: error.message });
  }
};

const deleteBook = (bookId, token) => async (dispatch) => {
  dispatch({ type: BOOK_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/deletebook/${bookId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const filteredData = data.filter((item) => {
      return item._id !== bookId;
    });
    dispatch({ type: BOOK_DELETE_SUCCESS, payload: filteredData });
  } catch (error) {
    dispatch({ type: BOOK_DELETE_FAIL });
  }
};

const createReview =
  (newRating, text, userId, token, bookId) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        "/createreview",
        {
          rate: newRating,
          comment: text,
          postedBy: userId,
          bookId: bookId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const reviewId = data.review._id;
      dispatch({ type: BOOK_REVIEW_CREATE_SUCCESS, payload: data });
      try {
        const { data } = await axios.post(
          `/books/${bookId}/reviews`,
          {
            reviewId,
            rating: newRating,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (error) {
        dispatch({ type: BOOK_REVIEW_CREATE_FAIL });
      }

      dispatch({ type: BOOK_REVIEW_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: BOOK_REVIEW_UPDATE_FAIL });
    }
  };

const getBookReviews = (id) => async (dispatch) => {
  dispatch({ type: BOOK_REVIEWS_FETCH_REQUEST });
  try {
    const { data } = await axios.get(`/books/${id}/reviews`);
    console.log("DATA BOOK REVIEWS", data.book);
    dispatch({ type: BOOK_REVIEWS_FETCH_SUCCESS, payload: data.book });
  } catch (error) {
    dispatch({ type: BOOK_REVIEWS_FETCH_FAIL, payload: error.message });
  }
};

const filterBooks = (title, rate) => async (dispatch) => {
  dispatch({ type: BOOKS_FILTER_REQUEST });
  try {
    const { data } = await axios.post("/books/filter", {
      query: title,
      rate,
    });
    dispatch({ type: BOOKS_FILTER_SUCCESS, payload: data.books });
  } catch (error) {
    dispatch({ type: BOOKS_FILTER_FAIL, payload: error.message });
  }
};

// const sortBooksByRating = (rate) => async (dispatch) => {
//   dispatch({ type: BOOKS_SORT_BY_RATING_REQUEST });
//   try {
//     const { data } = await axios.get(`/books/rating/${rate}`);
//     dispatch({ type: BOOKS_SORT_BY_RATING_SUCCESS, payload: data.books });
//   } catch (error) {
//     dispatch({ type: BOOKS_SORT_BY_RATING_FAIL, payload: error.message });
//   }
// };

// const searchByTitle = (query) => async (dispatch) => {
//   dispatch({ type: BOOKS_FIND_BY_TITLE_REQUEST });
//   try {
//     const { data } = await axios.post("/books/search", {
//       query,
//     });
//     dispatch({ type: BOOKS_FIND_BY_TITLE_SUCCESS, payload: data.books });
//   } catch (error) {
//     dispatch({ type: BOOKS_FIND_BY_TITLE_FAIL, payload: error.message });
//   }
// };

export {
  fetchAllBooks,
  fetchByCategoryBooks,
  fetchMyBooks,
  createBook,
  deleteBook,
  createReview,
  getBookReviews,
  // sortBooksByRating,
  // searchByTitle,
  filterBooks,
};
