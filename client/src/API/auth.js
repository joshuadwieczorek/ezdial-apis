import * as actions from "../Actions/actions";
import { baseUrl } from "../shared";
import { successToast, errorToast } from '../utils/toasts';
import { API_ENDPOINT_USERS, API_ENDPOINT_LOGIN } from '../constants'

export const LoginUser = (cred) => (dispatch) => {
  dispatch(actions.init_auth());
  baseUrl
    .post(API_ENDPOINT_LOGIN, cred)
    .then((res) => {
      if (res.status === 200) {
        successToast("You are now Logged in!");
        dispatch(actions.login_success(res.data));
      }
    })
    .catch((err) => {
        errorToast(err.response.data.message)
        err.response && dispatch(actions.login_failed(err.response.data.message));
    });
};

export const RegisterUser = (cred) => (dispatch) => {
    console.log(cred)
  dispatch(actions.init_auth());
  baseUrl
    .post(API_ENDPOINT_USERS, cred.data)
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        successToast("Registration Successful!");
        dispatch(
          actions.register_success({ message: "User registered successfully" })
        );
        dispatch(actions.login_success(res.data));
        console.log(res.data);
      }
    })
    .catch((err) => {
        errorToast(err.response.data.message)
      err.response &&
        dispatch(actions.register_failed(err.response.data.message));
    });
};
export const LoadUser = () => (dispatch) => {
  // dispatch(actions.load_user({ _id: "5f01a5879a24c4022c55759b" }));
  baseUrl
    .get("/users/authenticate")
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(actions.load_user(res.data));
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(actions.auth_error());
    });
};

// export const Logout = () => (dispatch) => {
//   baseUrl
//     .get("/auth/logout")
//     .then((res) => {
//       console.log(res);
//       if (res.status === 200) {
//         dispatch(actions.logout());
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch(actions.logout());
//     });
// };
export const Logout = () => (dispatch) => {
  dispatch(actions.logout());
  successToast("Logout Successful!");
};

export const ForgotPassword = (cred, cb) => (dispatch) => {
  // dispatch(actions.init_auth());
  baseUrl
    .post("/auth/forgot_password", cred)
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        // dispatch(actions.login_success(res.data));
        cb(res.data);
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
      // console.log(err.response.data);
      err.response && dispatch(actions.login_failed(err.response.data.message));
    });
};

export const VerifyPassResetToken = (cred, cb) => (dispatch) => {
  // dispatch(actions.init_auth());
  baseUrl
    .post("/auth/verify_pass_reset_token", cred)
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        // dispatch(actions.login_success(res.data));
        cb(res.data);
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
      cb({ success: false });
      // console.log(err.response.data);
      // err.response &&
      // dispatch(actions.login_failed(err.response.data.message));
    });
};
export const ResetPass = (cred, cb) => (dispatch) => {
  // dispatch(actions.init_auth());
  baseUrl
    .post("/auth/reset_password", cred)
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        // dispatch(actions.login_success(res.data));
        cb(res.data);
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
      cb({ success: false });
      // console.log(err.response.data);
      // err.response &&
      // dispatch(actions.login_failed(err.response.data.message));
    });
};
