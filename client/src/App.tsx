import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Login from "./components/Login/Login";
// import Settings from "./components/Settings";
// import DialPage from "./components/DialPage/DialPage";
// import NavBar from "./components/Nav/NavBar";
// import Contacts from "./components/PhoneBook";
// import AddContacts from "./components/PhoneBook/AddContact";
import { connect } from "react-redux";
import { LoadUser } from "./API/auth";
// import "./App.css";
// import PrivateRoute from "./components/Routing/PrivateRoute";
// import Register from "./components/Register/Register";
// import Register from "./pages/RegisterPage";

import { ToastContainer, Slide } from "react-toastify";
import RegisterPage from "./pages/RegisterPage";

// import { GetContacts } from './API/Contacts';
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     run: true,
  //   }
  // }
  // componentDidMount() {

  //   // this.props.dispatch(LoadUser());
  // }
  render() {
    // const { loading, isAuthenticated } = this.props.Auth;

    return (
      <Router>
        <div className="App">
          {/* <ToastContainer
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
          // className={styles.toasst}
          /> */}
          <Switch>
            {/* <PrivateRoute path="/settings" component={Settings} /> */}
            {/* <PrivateRoute path="/contacts" component={Contacts} /> */}
            {/* <PrivateRoute path="/add-contact" component={AddContacts} /> */}
            <Route path="/register" component={RegisterPage} />
            {/* <Route path="/login" component={Login} /> */}
            {/* <Route path="/" component={DialPage} /> */}
            {/* <PrivateRoute path="/" component={DialPage} /> */}
            {/* <Route path="/" component={Login} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

// const mapStateToProps = ({ Auth }) => ({ Auth });
export default App;
// connect(mapStateToProps)(App);
