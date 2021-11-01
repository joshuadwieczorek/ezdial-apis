import axios from "axios";
// import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { RegisterUser } from "../../API/auth";
// import "./Register.css";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import React from "react";
import { Helmet } from "react-helmet";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Typography as MuiTypography, Button, Grid } from "@material-ui/core";
import TextField from "../FormsUI/TextField";
import styled from "styled-components";

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
  email: "",
  password: "",
  confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters.")
    .required("Password is required."),
  confirmPassword: Yup.string().when("password", {
    is: (val: string | any[]) => !!(val && val.length > 0),
    then: Yup.string().oneOf([Yup.ref("password")], "Passwords must match."),
  }),
  // .required("You must confirm your password.")
});

class RegForm extends React.Component {
  constructor(props: any) {
    super(props);
    // this.state = {
    //   email: "",
    //   password: "",
    //   msg: "",
    // };

    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <>
        <Helmet title="Register" />
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            console.log({ values });
          }}
        >
          <>
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
                    <Typography variant="caption">Return to Login</Typography>
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

                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      id="email"
                      name="email"
                      label="Email Address"
                      fullWidth
                      my={3}
                    ></TextField>
                  </Grid>

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

                  <Grid item xs={12}>
                    <TextField
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      fullWidth
                      my={3}
                    ></TextField>
                  </Grid>

                  <Button
                    onClick={() =>
                      console.log(
                        "submit button was clicked & the entered values are showing"
                      )
                    }
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
                  >
                    <Typography variant="subtitle1">Submit</Typography>
                  </Button>
                  {/* <Button
    variant="contained"
    onClick={() => console.log("signed up")}
  >
    Register
  </Button> */}
                </Grid>
              </Wrapper>
            </Form>
          </>
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ Auth }: any) => ({ Auth });
export default connect(mapStateToProps)(RegForm);
