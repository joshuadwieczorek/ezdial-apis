import React from "react";
import styles from "../components/List.module.css";

const ListItem = props => {
  return (
    <li
      className={
        props.num === props.active ? styles.activeItem : styles.listItem
      }
      onClick={props.onClick}
    >
      {props.text}
    </li>
  );
};
export default ListItem;
