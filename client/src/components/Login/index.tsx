import React from "react";
import { Helmet } from "react-helmet";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginUser } from "../../API/auth";
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

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {

    const name = event.target.id;

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
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  my={3}
                  required
                  fullWidth
                  // @ts-ignore
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  fullWidth
                  my={3}
                  placeholder="Password"
                  // @ts-ignore
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
              </Grid>
              <Form.Group controlId="formBasicCheckbox">
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
                //onClick={() => this.handleSubmit()}
              >
                <Typography variant="subtitle1">Login</Typography>
              </Button>
            </Grid>
          </Wrapper>
        </Form>
      </>
    );
  }
}

const mapStateToProps = ({ Auth }: any) => ({ Auth });
export default connect(mapStateToProps)(Login);