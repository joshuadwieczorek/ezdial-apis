import React, { Component } from "react";
import PrivateRoute from "./components/old/Routing/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Paper as MuiPaper } from "@material-ui/core";
import styled from "styled-components";
import Settings from "./components/old/Settings";
// import Contacts from "./components/old/PhoneBook";
// import AddContacts from "./components/old/PhoneBook/AddContact";
import { ToastContainer, Slide } from "react-toastify";
import Contacts from "./components/old/PhoneBook/Contacts";

import Login from "./components/Login";
import Register from "./pages/Register";
import Dial from "./pages/Dial";
// import { LoadUser } from "./API/auth";
// import NavBar from "./components/old/Nav/NavBar";
// import { GetContacts } from './API/Contacts';

const Paper = styled(MuiPaper)`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(to bottom right, #3eb489, #893eb4);
`;

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      run: true,
    };
  }
  componentDidMount() {
    // this.props.dispatch(LoadUser());
  }
  render() {
    // const { loading, isAuthenticated } = this.props.Auth;

    return (
      <Paper>
        <Router>
          <div className="App">
            <ToastContainer
              transition={Slide}
              position="top-left"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              // className={styles.toast}
            />
            <Switch>
              {/* <PrivateRoute path="/add-contact" component={AddContacts} /> */}
              {/* <Route path="/" component={Login} /> */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

              <Route path="/" component={Dial} />
              <PrivateRoute path="/" component={Dial} />
              <PrivateRoute path="/settings" component={Settings} />
              <PrivateRoute path="/contacts" component={Contacts} />
            </Switch>
          </div>
        </Router>
      </Paper>
    );
  }
}

const mapStateToProps = ({ Auth }: any) => ({ Auth });
export default connect(mapStateToProps)(App);
