import * as actionTypes from "./types";



// Auth
export const register_success = (payload) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload,
});
export const register_failed = (payload) => ({
  type: actionTypes.REGISTER_FAIL,
  payload,
});
export const login_failed = (payload) => ({
  type: actionTypes.LOGIN_FAIL,
  payload,
});
export const login_success = (payload) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload,
});
export const load_user = (payload) => ({
  type: actionTypes.USER_LOADED,
  payload,
});
export const auth_error = () => ({
  type: actionTypes.AUTH_ERROR,
});
export const logout = () => ({
  type: actionTypes.LOGOUT,
});
export const init_auth = () => ({
  type: actionTypes.INIT_STATE,
});


// Contacts
export const add_contact = (payload) => ({
  type: actionTypes.ADD_CONTACT,
  payload,
});
export const get_contacts = (payload) => ({
  type: actionTypes.GET_CONTACTS,
  payload,
});
export const delete_contact = (payload) => ({
  type: actionTypes.DELETE_CONTACT,
  payload,
});

// Modals

export const handle_sidebar = (payload) => ({
  type: actionTypes.HANDLE_SIDEBAR,
  payload
});

// Notifications
export const new_notification = (payload) => ({
  type: actionTypes.NEW_NOTIFICATION,
  payload
});
export const expire_notification = () => ({
  type: actionTypes.EXPIRE_NOTIFICATION,
});
