import axios from "axios";
// import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { LoginUser } from "../../API/auth";
// import "./Login.css";
import { useHistory } from "react-router-dom";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Typography as MuiTypography, Button, Grid } from "@material-ui/core";
import TextField from "../FormsUI/TextField";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Typography = styled(MuiTypography)``;

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters.")
    .required("Password is required."),
});

class Login extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
    };

    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   const name = event.target.name;
  //   this.setState({ [name]: event.target.value });
  // }

  // async handleSubmit(event) {
  //   event.preventDefault();
  //   const data = {
  //     email: this.state.email,
  //     password: this.state.password,
  //   };
  //   this.props.dispatch(LoginUser(data));
  // }

  render() {
    // const { login_error, isAuthenticated, loading } = this.props.Auth;
    // const { msg } = this.state;

    // if (!loading && isAuthenticated) {
    //   return <Redirect to="/dial-page" />;
    // }

    return (
      <>
        <Helmet title="Login" />
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            console.log({ values });
          }}
        >
          {/* <Form onSubmit={this.handleSubmit}> */}
          {/* <Form controlId="formBasicEmail"> */}
          {/* <Form>Email address</Form.Label> */}
          <Form>
            <Wrapper>
              <Grid container spacing={2}>
                <Button
                  variant="outlined"
                  type="button"
                  style={{
                    // backgroundColor: "rgb(16, 35, 114)",
                    backgroundColor: "rgb(62, 180, 137)",
                    borderRadius: 50,
                    marginLeft: "5rem",
                    marginRight: "5rem",
                    padding: "0",
                    marginBottom: "1rem",
                  }}
                  fullWidth
                  onClick={() => console.log("Register button pressed")}
                >
                  <Typography variant="caption">Click to Register</Typography>
                </Button>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    id="username"
                    name="username"
                    label="User Name"
                    fullWidth
                    my={3}
                  ></TextField>
                </Grid>
                {/* </Form.Group> */}

                {/* <Form.Group controlId="formBasicPassword"> */}
                {/* <Form.Label>Password</Form.Label> */}
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    fullWidth
                    my={3}
                  ></TextField>
                </Grid>
                {/* </Form.Group> */}
                {/* <Form.Group controlId="formBasicCheckbox"> */}
                {/* <Form.Check type="checkbox" label="Check me out" /> */}
                {/* <Form.Text className="text-muted">{login_error}</Form.Text> */}
                {/* </Form.Group> */}
                <Button
                  variant="outlined"
                  type="submit"
                  style={{
                    // backgroundColor: "rgb(16, 35, 114)",
                    backgroundColor: "rgb(180, 62, 105)",
                    borderRadius: 50,
                    marginLeft: "3rem",
                    marginRight: "3rem",
                    padding: "0",
                  }}
                  fullWidth
                  onClick={() => console.log("Login button pressed")}
                >
                  <Typography variant="subtitle1">Login</Typography>
                </Button>
              </Grid>
            </Wrapper>
          </Form>
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ Auth }: any) => ({ Auth });
export default connect(mapStateToProps)(Login);
