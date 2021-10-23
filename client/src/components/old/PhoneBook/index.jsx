import React from 'react';
import { useSelector } from 'react-redux';
import GlobalContacts from './GlobalContacts';
import LocalContacts from './Contacts';
export default function Index(props) {
  const { user } = useSelector(state => state.Auth);
  if (user.role === "Admin") {
    return <GlobalContacts {...props} />
  } else {
    return <LocalContacts {...props} />
  }
}
