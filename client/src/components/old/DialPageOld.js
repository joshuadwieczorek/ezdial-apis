import React, { useState } from "react";
import "../pages/dial-page.css";
import Picker from 'emoji-picker-react';
// import styles from "../components/List.module.css";
// import List from "../components/List/List";
// import Footer from "../components/Footer/Footer";
import PickerScroll from 'react-mobile-picker-scroll';
import { Form } from "react-bootstrap";

const DialPage = () => {
  const [state, setState] = useState({
    valueGroups: {
      title: 'Mr.',
      firstName: 'Micheal',
      secondName: 'Jordan'
    },
    optionGroups: {
      title: [0,1, 2, 3, 4,5,6,7,8,9],
      firstName: ['John', 'Micheal', 'Elizabeth'],
      secondName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
    }
  })
  const handleChange = (name, value) => {
    setState({
      ...state,
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    });
  };
  const { optionGroups, valueGroups } = state;
  return (
    <div className="main-container">
      <Form.Label>Select World</Form.Label>
      <Form.Control as="select">
        <option>Local</option>
        <option>Global</option>
      </Form.Control>
      <PickerScroll
        optionGroups={optionGroups}
        valueGroups={valueGroups}
      onChange={handleChange} 
      />
      <div className="display-container">
        <div className="item1">
          <i className="fas fa-question"></i>
        </div>
        <div className="item2">
          <i className="fas fa-question"></i>
        </div>
        <div className="item3">
          <i className="fas fa-question"></i>
        </div>
      </div>

      <div className="selection-container">
        <button className="button">
          <i className="fas fa-caret-square-up fa-3x"></i>
        </button>
        <button className="button">
          <i className="fas fa-caret-square-up fa-3x"></i>
        </button>
        <button className="button">
          <i className="fas fa-caret-square-up fa-3x"></i>
        </button>
        <div className="dial-row1">1</div>
        <div className="dial-row2">2</div>
        <div className="dial-row3">3</div>
        <button className="button">
          <i className="fas fa-caret-square-down fa-3x"></i>
        </button>
        <button className="button">
          <i className="fas fa-caret-square-down fa-3x"></i>
        </button>
        <button className="button">
          <i className="fas fa-caret-square-down fa-3x"></i>
        </button>
      </div>

      <div className="button-container">
        <button className="button1">
          <i className="fas fa-cog fa-2x"></i>
        </button>
        <button className="button2">Call</button>
        <button className="button3">
          <i className="fas fa-ban fa-2x"></i>
        </button>
      </div>
    </div>
  );
};
export default DialPage;
