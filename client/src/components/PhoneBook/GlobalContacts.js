import React, { Component } from "react";
import "./contacts.css";
import { connect } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import Modal from "react-modal";
import Topbar from '../Topbar/Topbar';
import { AddContact, GetContacts, DeleteContact } from "../../API/Contacts";

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
  // const [state, setState] = useState({

  // })
  handleChange = (name, value) => {
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
    console.log(e.target.name);
    e.preventDefault();

    const data = {
      name: this.state.name,
      phone: this.state.phone.toString(),
      symbolSet: this.state.symbolSet,
    };
    this.props.dispatch(AddContact(data));
  }
  confirmDelete = () => {
    this.props.dispatch(DeleteContact(this.state.delId));
    this.setState({ openDelModal: false });
  };
  render() {
    console.log(this.state.symbolSet);
    const { fetched, contacts } = this.props.Contacts;
    // const { optionGroups, valueGroups } = this.state;

    return (
      <>
        <div className="max-width" >
          <Topbar />
          <div className="container mt-4">
            <Button onClick={() => this.props.history.push("/add-contact")}>Add New Contact</Button>
          </div>
          <div className="container mt-4">
            <h3 className="text-center">Admin</h3>
          </div>
          <div className="display-contacts">
            <div className="title">Your Contacts</div>
            {/* <h3 className="text-center">Your Contacts</h3> */}

            <ListGroup variant="flush">
              {fetched &&
                contacts.map((contact) => {
                  return (
                    <ListGroup.Item className="contact-li" key={contact._id}>
                      <div className="contact-main">
                        <div className="contact-info">
                          <div>
                            <span>{contact.name}</span>
                            <span>
                              {contact.symbolSet
                                ? `(${contact.symbolSet})`
                                : ""}
                            </span>
                          </div>
                          <div>
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                        <div className="actions">
                          {/* <span className="edit-button">Edit</span> */}
                          <span
                            className="del-button"
                            onClick={() => {
                              this.setState({
                                openDelModal: true,
                                delId: contact._id,
                              });
                            }}
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                      <div className="contact-devider"></div>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          </div>
        </div>
        <Modal
          isOpen={this.state.openDelModal}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
          {/* <button onClick={this.closeModal}>close</button> */}
          <div>Are you sure you want to delete contact?</div>
          <div className="del-modal-btn-div">
            <button onClick={this.closeModal}>Cancel</button>
            <button onClick={this.confirmDelete}>Delete</button>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({ Contacts }) => ({ Contacts });
export default connect(mapStateToProps)(Contacts);
