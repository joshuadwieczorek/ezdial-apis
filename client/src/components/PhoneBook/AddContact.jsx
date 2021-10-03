import React, { Component } from "react";
import "./contacts.css";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import PhoneInput from "react-phone-input-2";
import PickerScroll from 'react-mobile-picker-scroll';
import {
  disableBodyScroll,
  enableBodyScroll,
  // clearAllBodyScrollLocks
} from 'body-scroll-lock';

import {
  AddContact,
  GetContacts
} from "../../API/Contacts";
import {
  AddGlobalContact,
} from "../../API/GlobalContacts";
import Topbar from "../Topbar/Topbar";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      symbolSet: "",
      openDelModal: false,
      valueGroups: {
        emoji: "💥",
        alphabet: 'C',
        number: 2,
      },
      optionGroups: {
        emoji: ["😀", "👾", "💥", '😁', '🌹', '😇', '😎'],
        alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', "Z "],
        number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSymbol = this.handleSymbol.bind(this);
  }
  componentDidMount() {
    if (!this.props.Contacts.fetched) {
      this.props.dispatch(GetContacts());
    }
  }

  handlePickerChange = (name, value) => {
    this.setState({
      valueGroups: {
        ...this.state.valueGroups,
        [name]: value
      }
    });
  };
  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }
  handleSymbol(symbolSet) {
    this.setState({ symbolSet: symbolSet });
  }
  closeModal = () => {
    this.setState({ openDelModal: false });
  };
  handleSubmit(e) {

    e.preventDefault();

    const { number, alphabet, emoji } = this.state.valueGroups;
    const symbolSet = `${emoji}${alphabet}${number}`;
    const data = {
      name: this.state.name,
      phone: this.state.phone.toString(),
      symbolSet,
      symbolSetObject: this.state.valueGroups,
    };
    if (this.props.Auth.user.role === "Admin") {
      this.props.dispatch(AddGlobalContact(data, this.props.history.push));
    } else {
      this.props.dispatch(AddContact(data, this.props.history.push));
    }
  }


  disableScroll = (e) => {
    const doc = document.querySelector('#dis-scroll');
    disableBodyScroll(doc);
  }
  enableScroll = (e) => {
    const doc = document.querySelector('#dis-scroll');
    enableBodyScroll(doc);
  }
  render() {
    // console.log(this.state.symbolSet);
    const { fetched, contacts } = this.props.Contacts;
    const { optionGroups, valueGroups } = this.state;

    return (
      <>
        <Topbar path={"/contacts"} />
        <div className="contactBody" onScroll={e => console.log(e)}>
          <h5 className="text-center" >Add New Contact</h5>
          <Form.Group controlId="formBasicName">
            <Form.Label>Symbol Set</Form.Label>
            <div
              onMouseEnter={e => this.disableScroll(e)}
              onMouseLeave={e => this.enableScroll(e)}
              onTouchStart={e => this.disableScroll(e)}
              onTouchEnd={e => this.enableScroll(e)}
              id="dis-scroll">
              <PickerScroll
                optionGroups={optionGroups}
                valueGroups={valueGroups}
                onChange={this.handlePickerChange}
                height={180}
              />
            </div>
            <br />
          </Form.Group>
          <form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <PhoneInput
                id="phone"
                country={"us"}
                enableSearch
                value={this.state.phone}
                onChange={(phone) => this.setState({ phone })}
              />
              <br />
            </Form.Group>
            <Button size="sm" variant="outline-primary" type="submit">
              Add Contact
            </Button>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ Contacts, Auth }) => ({ Contacts, Auth });
export default connect(mapStateToProps)(Contacts);
