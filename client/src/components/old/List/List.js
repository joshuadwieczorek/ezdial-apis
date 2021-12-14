import React, { useState } from "react";
import styles from "./List.module.css";
import ListItem from "./ListItem";

const arrOfNumb = [0, 1, 2, 3, 4, 5, 6, 7];
const arrOfColors = ["red,blue,green,violet"];
const arrOfEmoji = ["😀", "👾", "💥"];

const List = (props) => {
  const [active, setActive] = useState(null);
  const handleClick = (num) => {
    setActive(num);
  };
  return (
    <div className="dialOutList">
      <ul id="1st-col">
        {props.listContents.map((item, i) => (
          <ListItem
            text={item}
            num={i}
            active={active}
            onClick={() => handleClick(i)}
          />
        ))}
      </ul>
    </div>
  );
};
export default List;
