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
  BOOK_PHOTO_UPLOAD_FAIL,
  BOOK_PHOTO_UPLOAD_REQUEST,
  BOOK_PHOTO_UPLOAD_SUCCESS,
  BOOK_REVIEWS_FETCH_FAIL,
  BOOK_REVIEWS_FETCH_REQUEST,
  BOOK_REVIEWS_FETCH_SUCCESS,
  BOOK_REVIEW_CREATE_FAIL,
  BOOK_REVIEW_CREATE_REQUEST,
  BOOK_REVIEW_CREATE_SUCCESS,
  BOOK_REVIEW_UPDATE_FAIL,
  BOOK_REVIEW_UPDATE_REQUEST,
  BOOK_REVIEW_UPDATE_SUCCESS,
  CATEGORY_BOOKS_FETCH_FAIL,
  CATEGORY_BOOKS_FETCH_REQUEST,
  CATEGORY_BOOKS_FETCH_SUCCESS,
  MY_BOOKS_FETCH_FAIL,
  MY_BOOKS_FETCH_REQUEST,
  MY_BOOKS_FETCH_SUCCESS,
} from "../constants/bookConstants";

import { updateObject } from "../../utility";

const initialState = {
  loading: false,
  books: null,
  fetchedByCategory: null,
  myBooks: null,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_LIST_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case BOOKS_LIST_SUCCESS: {
      return updateObject(state, {
        loading: false,
        books: action.payload.books,
      });
    }
    case BOOKS_LIST_FAIL: {
      return updateObject(state, {
        loading: false,
        error: action.payload,
      });
    }
    case CATEGORY_BOOKS_FETCH_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case CATEGORY_BOOKS_FETCH_SUCCESS: {
      return updateObject(state, {
        loading: false,
        fetchedByCategory: action.payload.books,
      });
    }
    case CATEGORY_BOOKS_FETCH_FAIL: {
      return updateObject(state, {
        loading: false,
        error: action.payload,
      });
    }
    case MY_BOOKS_FETCH_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case MY_BOOKS_FETCH_SUCCESS: {
      return updateObject(state, {
        loading: false,
        myBooks: action.payload.books,
      });
    }
    case MY_BOOKS_FETCH_FAIL: {
      return updateObject(state, {
        loading: false,
        error: action.payload,
      });
    }
    case BOOK_CREATE_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case BOOK_CREATE_SUCCESS: {
      return updateObject(state, {
        loading: false,
      });
    }
    case BOOK_CREATE_FAIL: {
      return updateObject(state, {
        loading: false,
        error: action.payload,
      });
    }
    case BOOK_PHOTO_UPLOAD_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case BOOK_PHOTO_UPLOAD_SUCCESS: {
      return updateObject(state, {
        loading: false,
      });
    }
    case BOOK_PHOTO_UPLOAD_FAIL: {
      return updateObject(state, {
        loading: false,
      });
    }
    case BOOK_DELETE_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case BOOK_DELETE_SUCCESS: {
      return updateObject(state, {
        loading: false,
        myBooks: action.payload.books,
      });
    }
    case BOOK_DELETE_FAIL: {
      return updateObject(state, {
        loading: false,
      });
    }
    case BOOK_REVIEW_CREATE_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case BOOK_REVIEW_CREATE_SUCCESS: {
      return updateObject(state, {
        loading: false,
        // reviews: action.payload,
      });
    }
    case BOOK_REVIEW_CREATE_FAIL: {
      return updateObject(state, {
        loading: false,
      });
    }
    case BOOK_REVIEW_UPDATE_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case BOOK_REVIEW_UPDATE_SUCCESS: {
      return updateObject(state, {
        loading: false,
      });
    }
    case BOOK_REVIEW_UPDATE_FAIL: {
      return updateObject(state, {
        loading: false,
      });
    }
    case BOOK_REVIEWS_FETCH_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case BOOK_REVIEWS_FETCH_SUCCESS: {
      return updateObject(state, {
        loading: false,
        bookReviews: action.payload,
      });
    }
    case BOOK_REVIEWS_FETCH_FAIL: {
      return updateObject(state, {
        loading: false,
      });
    }
    case BOOKS_FILTER_REQUEST: {
      return updateObject(state, {
        loading: false,
      });
    }
    case BOOKS_FILTER_SUCCESS: {
      return updateObject(state, {
        loading: false,
        books: action.payload,
      });
    }
    case BOOKS_FILTER_FAIL: {
      return updateObject(state, {
        loading: false,
      });
    }
    // case BOOKS_SORT_BY_RATING_REQUEST: {
    //   return updateObject(state, {
    //     loading: true,
    //   });
    // }
    // case BOOKS_SORT_BY_RATING_SUCCESS: {
    //   return updateObject(state, {
    //     loading: true,
    //     books: action.payload,
    //   });
    // }
    // case BOOKS_SORT_BY_RATING_FAIL: {
    //   return updateObject(state, {
    //     loading: false,
    //   });
    // }
    // case BOOKS_FIND_BY_TITLE_REQUEST: {
    //   return updateObject(state, {
    //     loading: true,
    //   });
    // }
    // case BOOKS_FIND_BY_TITLE_SUCCESS: {
    //   return updateObject(state, {
    //     loading: false,
    //     books: action.payload,
    //   });
    // }
    // case BOOKS_FIND_BY_TITLE_FAIL: {
    //   return updateObject(state, {
    //     loading: false,
    //   });
    // }

    default:
      return state;
  }
};

export { bookReducer };
