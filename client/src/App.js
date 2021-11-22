import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Profile from "./components/screens/Profile";
import MyBooks from "./components/screens/MyBooks";
import AddBook from "./components/screens/AddBook";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

import ActionBooks from "./components/screens/ActionBooks";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserInfo } from "./redux/actions/userAction";

import BookReviews from "./components/screens/BookReviews";

const App = () => {
  // a
  const [isAuth, setIsAuth] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUserInfo"));

    const userJWT = localStorage.getItem("jwt");

    if (user) {
      dispatch(loggedUserInfo(user.user._id, userJWT));
    } else {
      console.log("YOU ARE NOT LOGGED IN");
    }
  }, []);

  const userInfo = useSelector((state) => state.user.loggedUserInfo);
  useEffect(() => {
    if (userInfo) {
      setIsAuth(true);
    }
  }, [userInfo]);

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/book/:categoryName">
          <ActionBooks />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/books/:bookId/reviews">
          <BookReviews />
        </Route>
        {isAuth ? (
          <Route path="/my-profile">
            <Profile />
          </Route>
        ) : (
          <Redirect to="/" />
        )}
        {isAuth ? (
          <Route path="/my-books">
            <MyBooks />
          </Route>
        ) : (
          <Redirect to="/" />
        )}
        {isAuth ? (
          <Route path="/create">
            <AddBook />
          </Route>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
