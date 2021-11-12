import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
// import PickerScroll from "react-mobile-picker-scroll";
// import { Form } from "react-bootstrap";
import { baseUrl } from "../../shared";
import { Logout } from "../../API/auth";
import { Link } from "react-router-dom";
import { errorToast, successToast } from "../../utils/toasts";
import styled from "styled-components";
import {
  Typography as MuiTypography,
  TextField,
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PlayCircleFilledOutlinedIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  // max-width: 300px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Typography = styled(MuiTypography)``;

const DialPage = ({
  history,
  Auth: { isAuthenticated },
}: // Contacts: { fetched, contacts }
any) => {
  ////////
  const classes = useStyles();
  const [media, setMedia] = React.useState("");
  const [media1, setMedia1] = React.useState("");
  const [media2, setMedia2] = React.useState("");
  const handleMedia = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMedia(event.target.value as string);
    setMedia1(event.target.value as string);
    setMedia2(event.target.value as string);
  };
  ////////

  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [global, setGlobal] = useState(true);
  const [state, setState] = useState({
    valueGroups: {
      emoji: "💥",
      alphabet: "C",
      number: 2,
    },
    optionGroups: {
      emoji: ["😀", "👾", "💥", "😁", "🌹", "😇", "😎"],
      alphabet: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z ",
      ],
      number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  });

  const handleChange = (name: any, value: any) => {
    setMsg("");
    setState({
      ...state,
      valueGroups: {
        ...valueGroups,
        [name]: value,
      },
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
        const anchor = document.createElement("a");
        anchor.setAttribute("href", `tel:${data.phone}`);
        anchor.click();
        setMsg(data.phone);
      } else {
        console.log("Phone Number Not Found!");
        setMsg("Phone Number Not Found!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isAuthenticated && !global) {
      setGlobal(true);
    }
  }, [isAuthenticated]);

  const handleSwitch = () => {
    if (!isAuthenticated) {
      return successToast("Please login to switch to local");
    }
    setGlobal(!global);
  };
  return (
    <Wrapper>
      <div className="full-vh max-width">
        <div className="text-center info-text">
          <h4>{msg}</h4>
        </div>
        <div>
          <FormGroup>
            <Typography>Global</Typography>
            <FormControlLabel
              control={
                <Switch
                  value={"On"}
                  onChange={() => handleSwitch()}
                  type="switch"
                  checked={!global}
                  id="custom-switch"
                  // disabled={!isAuthenticated}
                />
              }
              label="Local"
            />
          </FormGroup>
        </div>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel>Media</InputLabel>
          <Select
            labelId="mediaPicker"
            id="mediaPicker"
            value={media}
            onChange={handleMedia}
            variant="outlined"
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={10}>😀</MenuItem>
            <MenuItem value={20}>Letters</MenuItem>
            <MenuItem value={30}>Numbers</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel>Media</InputLabel>
          <Select
            labelId="mediaPickerOne"
            id="mediaPickerOne"
            value={media1}
            onChange={handleMedia}
            variant="outlined"
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={10}>😀</MenuItem>
            <MenuItem value={20}>Letters</MenuItem>
            <MenuItem value={30}>Numbers</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel>Media</InputLabel>
          <Select
            labelId="mediaPickerTwo"
            id="mediaPickerTwo"
            value={media2}
            onChange={handleMedia}
            variant="outlined"
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={10}>😀</MenuItem>
            <MenuItem value={20}>Letters</MenuItem>
            <MenuItem value={30}>Numbers</MenuItem>
          </Select>
        </FormControl>
        {/* <PickerScroll
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            onChange={handleChange}
            height={180}
          /> */}
      </div>

      <Button onClick={() => history.push("/contacts")}>
        {/* <Typography>Address Book</Typography> */}
        <ImportContactsOutlinedIcon />
      </Button>
      <Button>
        <SettingsOutlinedIcon />
        {/* <Typography>Settings</Typography> */}
      </Button>
      <Button onClick={handleDialClick}>
        <PlayCircleFilledOutlinedIcon />
        {/* <Typography>Call</Typography> */}
      </Button>
      <Button onClick={() => setMsg("")}>
        <BlockOutlinedIcon />
        {/* <Typography>Cancel</Typography> */}
      </Button>
      {isAuthenticated && (
        <Button onClick={() => dispatch(Logout())}>
          <ExitToAppOutlinedIcon />
          {/* <Typography>Sign Out</Typography> */}
        </Button>
      )}
      {!isAuthenticated && (
        <Link to="/login" style={{ display: "contents" }}>
          <Button className="button3">
            <VpnKeyOutlinedIcon />
            {/* <Typography>Sign In</Typography> */}
          </Button>
        </Link>
      )}
    </Wrapper>
  );
};
const mapStateToProps = ({ Contacts, Auth }: any) => ({ Contacts, Auth });
export default connect(mapStateToProps)(DialPage);
