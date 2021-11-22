import {
  LOGGED_USER_INFO_FAIL,
  LOGGED_USER_INFO_REQUEST,
  LOGGED_USER_INFO_SUCCESS,
  PROFILE_PICTURE_UPLOAD_FAIL,
  PROFILE_PICTURE_UPLOAD_REQUEST,
  PROFILE_PICTURE_UPLOAD_SUCCESS,
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
import { updateObject } from "../../utility";
const initialState = {
  error: null,
  loading: false,
  loggedUserInfo: null,
  registerSuccess: null,
  registerError: null,

  loginError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST: {
      return { loading: true };
    }
    case USER_REGISTER_SUCCESS: {
      return { loading: false, registerSuccess: action.payload };
    }
    case USER_REGISTER_FAIL: {
      return { loading: false, registerError: action.payload };
    }
    case USER_LOGIN_REQUEST: {
      return { loading: true };
    }
    case USER_LOGIN_SUCCESS: {
      return updateObject(state, {
        loading: false,
        loggedUserInfo: action.payload,
      });
    }
    case USER_LOGIN_FAIL: {
      return updateObject(state, {
        loading: false,
        loginError: action.payload,
      });
    }
    case USER_LOGOUT_SUCCESS: {
      return updateObject(state, {
        loading: false,
        loggedUserInfo: null,
      });
    }
    case USER_LOGOUT_FAIL: {
      return updateObject(state, {
        loading: false,
        error: action.payload,
      });
    }

    case PROFILE_PICTURE_UPLOAD_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case PROFILE_PICTURE_UPLOAD_SUCCESS: {
      return updateObject(state, {
        loading: false,
      });
    }
    case PROFILE_PICTURE_UPLOAD_FAIL: {
      return updateObject(state, {
        loading: false,
        error: action.payload,
      });
    }
    case LOGGED_USER_INFO_REQUEST: {
      return { loading: true };
    }
    case LOGGED_USER_INFO_SUCCESS: {
      return updateObject(state, {
        loading: false,
        loggedUserInfo: action.payload,
      });
    }
    case LOGGED_USER_INFO_FAIL: {
      return updateObject(state, {
        loading: false,
        error: action.payload,
      });
    }
    case USER_ERRORS_RESET_REQUEST: {
      return updateObject(state, {
        loading: true,
      });
    }
    case USER_ERRORS_RESET_SUCCESS: {
      return {
        loading: false,
        registerError: null,
        loginError: null,
      };
    }
    case USER_ERRORS_RESET_FAIL: {
      return updateObject(state, {
        loading: false,
      });
    }
    default:
      return state;
  }
};

export { userReducer };
