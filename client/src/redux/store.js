import { applyMiddleware, combineReducers, createStore } from "redux";
import { bookReducer } from "./reducers/bookReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";

const initialState = {};

const reducer = combineReducers({
  user: userReducer,
  books: bookReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
