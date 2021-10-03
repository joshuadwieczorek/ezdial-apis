import * as actionTypes from "../Actions/types";

const initialState = {
  fetched: false,
  contacts: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_CONTACTS:
      return {
        ...state,
        fetched: true,
        contacts: payload,
      };
    case actionTypes.ADD_CONTACT:
      return {
        ...state,
        contacts: [payload, ...state.contacts],
      };
    case actionTypes.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => {
          return contact._id !== payload;
        }),
      };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
