import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  INIT_STATE,
} from "../Actions/types";

const initialState = {
  isAuthenticated: false,
  loading: true,
  login_error: null,
  signup_msg: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        login_error: null,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        login_error: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        signup_msg: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        signup_msg: action.payload.message,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        login_error: action.payload,
        isAuthenticated: false,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");

      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case INIT_STATE:
      return initialState;
    default:
      return state;
  }
}
