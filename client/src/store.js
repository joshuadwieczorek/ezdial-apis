import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Auth from "./Reducers/auth";
import Contacts from "./Reducers/contacts";
import { composeWithDevTools } from 'redux-devtools-extension';

const midderwires = [thunk, logger];

const store = createStore(
  combineReducers({
    Auth,
    Contacts,
  }),
  composeWithDevTools(
    applyMiddleware(...midderwires)
  )
  
);

export default store;
