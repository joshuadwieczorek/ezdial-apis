import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./setting.css";

import { Container, Col, Row } from "react-bootstrap";
import { Button, ButtonGroup } from "react-bootstrap";
// import Footer from "../components/Footer/Footer";

class Settings extends Component {
  render() {
    return (
      <div className="box">
        <Container>
          <Button variant="primary" size="lg" block>
            Contacts
          </Button>

          <Button variant="primary" size="lg" block>
            Library
          </Button>

          <Button variant="primary" size="lg" block>
            Profile
          </Button>

          <Button variant="primary" size="lg" block>
            Back
          </Button>
        </Container>
      </div>
    );
  }
}
export default Settings;
