// // import { Form, Button } from "react-bootstrap";
// // import "./Login.css";
// // import { Alert } from "@material-ui/lab";

// import React from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { connect } from "react-redux";
// import { Typography as MuiTypography, Button, Grid } from "@material-ui/core";
// import TextField from "../FormsUI/TextField";
// import styled from "styled-components";
// import { Helmet } from "react-helmet";
// import { Redirect } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col } from "react-bootstrap";
// import { LoginUser } from "../../API/auth";

// const Wrapper = styled.div`
//   display: flex;
//   height: 100vh;
//   max-width: 300px;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

// const Typography = styled(MuiTypography)``;

// const INITIAL_FORM_STATE = {
//   username: "",
//   password: "",
// };

// const FORM_VALIDATION = Yup.object().shape({
//   username: Yup.string().required("Username is required."),
//   password: Yup.string()
//     .min(6, "Password must contain at least 6 characters.")
//     .required("Password is required."),
// });

// class Login extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       // msg: "",
//     };

//     //   this.handleChange = this.handleChange.bind(this);
//     //   this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   // handleChange(event) {
//   //   const name = event.target.name;
//   //   this.setState({ [name]: event.target.value });
//   // }

//   // async handleSubmit(event) {
//   //   event.preventDefault();
//   //   const data = {
//   //     email: this.state.email,
//   //     password: this.state.password,
//   //   };
//   //   this.props.dispatch(LoginUser(data));
//   // }

//   render() {
//     // const { login_error, isAuthenticated, loading } = this.props.Auth;
//     // const { msg } = this.state;

//     // if (!loading && isAuthenticated) {
//     //   return <Redirect to="/dial-page" />;
//     // }

//     return (
//       <>
//         <Helmet title="Login" />
//         <Formik
//           initialValues={{
//             ...INITIAL_FORM_STATE,
//           }}
//           validationSchema={FORM_VALIDATION}
//           // onSubmit={(values) => {
//           //   console.log({ values });
//           // }}
//           onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//             try {
//               //   await dispatch(
//               //     signIn(
//               //       {
//               //         email: values.email.toLowerCase(),
//               //         password: values.password,
//               //       },
//               //       false
//               //     )
//               //   );
//               //   history.push("/");
//             } catch (error) {
//               //   setStatus({ success: false });
//               //   setSubmitting(false);
//               //   if (error.status === 401) {
//               //     setErrors({
//               //       submit: "Username or password is incorrect, unable to login",
//               //     });
//               //   } else {
//               //     setErrors({ submit: error.statusText });
//               //   }
//             }
//             console.log({ values });
//           }}
//         >
//           {({
//             errors,
//             handleBlur,
//             handleChange,
//             handleSubmit,
//             isSubmitting,
//             touched,
//             values,
//           }) => (
//             <Form noValidate onSubmit={handleSubmit}>
//               {/* {errors.submit && (
//                 <Alert mt={2} mb={1} severity="warning">
//                   {errors.submit}
//                 </Alert>
//               )} */}
//               {/* <Form onSubmit={this.handleSubmit}> */}
//               {/* <Form controlId="formBasicEmail"> */}
//               {/* <Form>Email address</Form.Label> */}
//               {/* <Form> */}
//               <Wrapper>
//                 <Grid container spacing={2}>
//                   <Button
//                     variant="outlined"
//                     type="button"
//                     style={{
//                       // backgroundColor: "rgb(16, 35, 114)",
//                       backgroundColor: "rgb(62, 180, 137)",
//                       borderRadius: 50,
//                       marginLeft: "5rem",
//                       marginRight: "5rem",
//                       padding: "0",
//                       marginBottom: "1rem",
//                     }}
//                     fullWidth
//                     onClick={() => console.log("Register button pressed")}
//                   >
//                     <Typography variant="caption">Click to Register</Typography>
//                   </Button>
//                   <Grid item xs={12}>
//                     <TextField
//                       type="text"
//                       id="username"
//                       name="username"
//                       label="User Name"
//                       value={values.username}
//                       error={Boolean(touched.username && errors.username)}
//                       helperText={touched.username && errors.username}
//                       fullWidth
//                       my={3}
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                     />
//                   </Grid>
//                   {/* </Form.Group> */}

//                   {/* <Form.Group controlId="formBasicPassword"> */}
//                   {/* <Form.Label>Password</Form.Label> */}
//                   <Grid item xs={12}>
//                     <TextField
//                       type="password"
//                       id="password"
//                       name="password"
//                       label="Password"
//                       value={values.password}
//                       error={Boolean(touched.password && errors.password)}
//                       helperText={touched.password && errors.password}
//                       fullWidth
//                       my={3}
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                     ></TextField>
//                   </Grid>
//                   {/* </Form.Group> */}
//                   {/* <Form.Group controlId="formBasicCheckbox"> */}
//                   {/* <Form.Check type="checkbox" label="Check me out" /> */}
//                   {/* <Form.Text className="text-muted">{login_error}</Form.Text> */}
//                   {/* </Form.Group> */}
//                   <Button
//                     variant="outlined"
//                     type="submit"
//                     style={{
//                       // backgroundColor: "rgb(16, 35, 114)",
//                       backgroundColor: "rgb(180, 62, 105)",
//                       borderRadius: 50,
//                       marginLeft: "3rem",
//                       marginRight: "3rem",
//                       padding: "0",
//                     }}
//                     fullWidth
//                     onClick={() => console.log("Login button pressed")}
//                     disabled={isSubmitting}
//                   >
//                     <Typography variant="subtitle1">Login</Typography>
//                   </Button>
//                 </Grid>
//               </Wrapper>
//               {/* </Form> */}
//             </Form>
//           )}
//         </Formik>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ Auth }: any) => ({ Auth });
// export default connect(mapStateToProps)(Login);

import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginUser } from "../../API/auth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Typography as MuiTypography, Button, Grid } from "@material-ui/core";
import TextField from "../FormsUI/TextField";

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

class Login extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    const data = {
      // @ts-ignore
      email: this.state.email,
      // @ts-ignore
      password: this.state.password,
    };
    // @ts-ignore
    this.props.dispatch(LoginUser(data));
  }

  render() {
    // @ts-ignore
    const { login_error, isAuthenticated, loading } = this.props.Auth;
    // @ts-ignore
    const { msg } = this.state;

    if (!loading && isAuthenticated) {
      return <Redirect to="/dial-page" />;
    }
    return (
      <>
        <Helmet title="Login" />
        {/* <Container> */}
        <Form onSubmit={this.handleSubmit}>
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
                // @ts-ignore
                onClick={() => this.props.history.push("/register")}
                // onClick={() => console.log("Register button pressed")}
              >
                <Typography variant="caption">Register</Typography>
              </Button>
              {/* <Form.Group controlId="formBasicEmail"> */}
              {/* <Form.Label>Email address</Form.Label> */}
              {/* <Form.Control */}
              <Grid item xs={12}>
                <TextField
                  // type="text"
                  // name="username"
                  // error={Boolean(touched.username && errors.username)}
                  // helperText={touched.username && errors.username}
                  // onBlur={handleBlur}
                  // placeholder="Email"
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  my={3}
                  required
                  fullWidth
                  // @ts-ignore
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Grid>
              {/* </Form.Group> */}

              {/* <Form.Group controlId="formBasicPassword"> */}
              {/* <Form.Label>Password</Form.Label> */}
              {/* <Form.Control */}
              <Grid item xs={12}>
                <TextField
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  // error={Boolean(touched.password && errors.password)}
                  // helperText={touched.password && errors.password}
                  fullWidth
                  my={3}
                  // onBlur={handleBlur}
                  placeholder="Password"
                  // @ts-ignore
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Grid>
              {/* </Form.Group> */}
              <Form.Group controlId="formBasicCheckbox">
                {/* <Form.Check type="checkbox" label="Check me out" /> */}
                <Form.Text className="text-muted">{login_error}</Form.Text>
              </Form.Group>
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
                // onClick={() => console.log("Login button pressed")}
                // @ts-ignore
                onClick={() => this.props.history.push("/")}
              >
                <Typography variant="subtitle1">Login</Typography>
              </Button>
              {/* <Button variant="outlined" type="submit" className="mr-4">
              Login
             </Button>
             <Button
              variant="outlined"
              // @ts-ignore
              onClick={() => this.props.history.push("/register")}
             >
              Signup
             </Button> */}
            </Grid>
          </Wrapper>
        </Form>
        {/* </Container> */}
      </>
    );
  }
}

const mapStateToProps = ({ Auth }: any) => ({ Auth });
export default connect(mapStateToProps)(Login);
