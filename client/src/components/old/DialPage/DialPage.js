import React, { useState, useEffect } from "react";
import "./dial-page.css";
import { connect, useDispatch } from 'react-redux';
import PickerScroll from 'react-mobile-picker-scroll';
import { Form } from 'react-bootstrap';
import { baseUrl } from '../../../shared';
import { Logout } from '../../../API/auth';
import { Link } from 'react-router-dom';
import { errorToast, successToast } from "../../../utils/toasts";

const DialPage = ({
  history,
  Auth: { isAuthenticated }
  // Contacts: { fetched, contacts }
}) => {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [global, setGlobal] = useState(true);
  const [state, setState] = useState({
    valueGroups: {
      emoji: "💥",
      alphabet: 'C',
      number: 2,
    },
    optionGroups: {
      emoji: ["😀", "👾", "💥", '😁', '🌹', '😇', '😎'],
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', "Z "],
      number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  })


  const handleChange = (name, value) => {
    setMsg("");
    setState({
      ...state,
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    });
  };
  const { optionGroups, valueGroups } = state;

  const handleDialClick = async () => {
    try {
      setMsg("");
      const { emoji, alphabet, number } = valueGroups;
      const symbolSet = `${emoji}${alphabet}${number}`;
      // const contact = contacts.find((contact) => (contact.symbolSet === symbolSet));
      let endpoint = `/contact/${symbolSet}`;
      if (global) {
        endpoint = `/global/contact/${symbolSet}`;
      }
      const { data } = await baseUrl.get(endpoint);
      console.log(data);
      if (data) {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', `tel:${data.phone}`);
        anchor.click();
        setMsg(data.phone);
      } else {
        console.log("Phone Number Not Found!")
        setMsg("Phone Number Not Found!");

      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!isAuthenticated && !global) {
      setGlobal(true);
    }
  }, [isAuthenticated]);
  
  const handleSwitch = () => {
    if (!isAuthenticated) {
      return successToast("Please login to swicth to local");
    }
    setGlobal(!global);
  }
  return (
    <div className="full-vh max-width">
      <div className="dial-page-stiky">
        <div className="container">
          <div className="text-center info-text">
            <h4>
              {msg}
            </h4>
          </div>
          <div>
            <Form>
              <Form.Label>Global</Form.Label>
              <Form.Check
                value={"On"}
                onChange={() => handleSwitch()}
                type="switch"

                checked={!global}
                // disabled={!isAuthenticated}
                id="custom-switch"
                label="Local"
              />
            </Form>
          </div>
          <PickerScroll
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            onChange={handleChange}
            height={180}
          />
        </div>
        <div className="button-container">
          <button className="button3" onClick={() => history.push("/contacts")}>
            <i class="far fa-address-book"></i>
          </button>
          <button className="button3">
            <i className="fas fa-cog"></i>
          </button>
          <button className="button2" onClick={handleDialClick}>
            <i class="fas fa-phone-alt"></i>
            &nbsp;&nbsp;Call
            </button>
          <button className="button3" onClick={() => setMsg("")}>
            <i className="fas fa-ban "></i>
          </button>
          {isAuthenticated &&
            <button className="button3" onClick={() => dispatch(Logout())}>
              <i class="fas fa-sign-out-alt"></i>
            </button>
          }
          {!isAuthenticated &&
            <Link to="/login" style={{ display: "contents" }}>
              <button className="button3">
                <i class="fas fa-sign-in-alt"></i>
              </button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ Contacts, Auth }) => ({ Contacts, Auth });
export default connect(mapStateToProps)(DialPage);
