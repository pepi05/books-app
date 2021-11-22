import axios from "axios";
import {
  LOGGED_USER_INFO_FAIL,
  LOGGED_USER_INFO_REQUEST,
  LOGGED_USER_INFO_SUCCESS,
  USER_ERRORS_RESET_FAIL,
  USER_ERRORS_RESET_REQUEST,
  USER_ERRORS_RESET_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

const register =
  (name, email, password, confirmPassword) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
        confirm_password: confirmPassword,
      });
      if (data.error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: data.error });
      } else {
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data.message });
      }
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  };

const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/login", {
      email,
      password,
    });
    console.log("data", data.error);
    if (data.error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: data.error });
    } else {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("loggedUserInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

const loggedUserInfo = (userid, token) => async (dispatch) => {
  dispatch({ type: LOGGED_USER_INFO_REQUEST });
  try {
    const { data } = await axios.get(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: LOGGED_USER_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGGED_USER_INFO_FAIL, payload: error.message });
  }
};

const logout = (localStorage) => async (dispatch) => {
  try {
    if (localStorage) {
      localStorage.clear();
    }
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: localStorage });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.message });
  }
};

const resetUserErrors = () => async (dispatch) => {
  dispatch({ type: USER_ERRORS_RESET_REQUEST });
  try {
    dispatch({ type: USER_ERRORS_RESET_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_ERRORS_RESET_FAIL });
  }
};

export { register, login, logout, loggedUserInfo, resetUserErrors };
