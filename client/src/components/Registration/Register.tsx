import React from "react";
import axios from "axios";
// import { Form, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { RegisterUser } from "../../API/auth";
// import "./Register.css";
import { useHistory } from "react-router-dom";
import { Typography, Button, Grid } from "@material-ui/core";
import TextField from "../FormsUI/TextField";

const INITIAL_FORM_STATE = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
  fullName: Yup.string().required("Full name is required."),
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .when("password", {
      is: (val: string | any[]) => !!(val && val.length > 0),
      then: Yup.string().oneOf([Yup.ref("password")], "Passwords must match."),
    })
    .required("You must confirm your password."),
});

const Register = () => {
  return (
    <>
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
          <Typography>Register</Typography>
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Full Name</Typography>
                <TextField type="text" name="fullName"></TextField>
              </Grid>

              <Grid item xs={12}>
                <Typography>Email</Typography>
                <TextField type="email" name="email"></TextField>
              </Grid>

              <Grid item xs={12}>
                <Typography>Password</Typography>
                <TextField type="password" name="password"></TextField>
              </Grid>

              <Grid item xs={12}>
                <Typography>Confirm Password</Typography>
                <TextField type="password" name="confirmPassword"></TextField>
              </Grid>

              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => console.log("signed up")}
              >
                Register
              </Button>
            </Grid>
          </Form>
        </>
      </Formik>
    </>
  );
};
// }

// const mapStateToProps = ({ Auth }) => ({ Auth });
export default Register;
// connect(mapStateToProps)(Register);
