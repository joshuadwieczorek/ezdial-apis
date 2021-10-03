import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { RegisterUser } from "../../API/auth";
import "./Register.css";
import { useHistory } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      msg: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  // async handleSubmit(event) {
  //   alert("A name was submitted:");
  //   event.preventDefault();
  //   let { data } = await axios.post("http://localhost:8080/users/login", {
  //     email: this.state.email,
  //     password: this.state.password,
  //   });
  //   this.props.history.push("/dial-page");
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ msg: "" });
    if (this.state.password !== this.state.confirmPass) {
      this.setState({ msg: "Password doesn't match" });
      return;
    }
    const data = {
      firstName: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.dispatch(RegisterUser({ ...this.state }));
  };

  render() {
    const { signup_msg, isAuthenticated, loading } = this.props.Auth;
    const { msg } = this.state;
    if (!loading && isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Style-me">
        <h1>Welcome</h1>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="full name"
                name="name"
                required
                onChange={this.handleChange}
                value={this.state.name}
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                minlength="7"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                required
                minlength="7"
                placeholder="Confirm Password"
                value={this.state.confirmPass}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              {/* <Form.Check type="checkbox" label="Check me out" /> */}
              <Form.Text className="text-muted">{signup_msg}</Form.Text>
              <Form.Text className="text-muted">{msg}</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Signup
            </Button>
            <Button
              variant="success"
              onClick={() => this.props.history.push("/")}
            >
              Login
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => ({ Auth });
export default connect(mapStateToProps)(Register);
