import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginUser } from "../../API/auth";
import "./Login.css";
import { useHistory } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.dispatch(LoginUser(data));
  }

  render() {
    const { login_error, isAuthenticated, loading } = this.props.Auth;
    const { msg } = this.state;

    if (!loading && isAuthenticated) {
      return <Redirect to="/dial-page" />;
    }
    return (
      <div className="Style-me">
        <h1>Welcome</h1>
        <Container>
          <Form onSubmit={this.handleSubmit}>
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
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              {/* <Form.Check type="checkbox" label="Check me out" /> */}
              <Form.Text className="text-muted">{login_error}</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className="mr-4">
              Login
            </Button>
            <Button
              variant="success"
              onClick={() => this.props.history.push("/register")}
            >
              Signup
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => ({ Auth });
export default connect(mapStateToProps)(Login);
