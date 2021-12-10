import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { baseUrl } from "../../shared";
import { Logout } from "../../API/auth";
import { Link } from "react-router-dom";
import { errorToast, successToast } from "../../utils/toasts";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import FilledInput from '@material-ui/core/FilledInput';
import {
  Box,
  InputLabel,
  Typography as MuiTypography,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  FormControl,
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
import InputAdornment from '@material-ui/core/InputAdornment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from "../FormsUI/TextField";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CallIcon from '@material-ui/icons/Call';

// import PickerScroll from "react-mobile-picker-scroll";
// import { Form } from "react-bootstrap";

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Symbols from '../../API/symbols'
import symbols from "../../API/symbols";
import TouchAppIcon from '@material-ui/icons/TouchApp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textField: {
      width: '25ch',
    }
  })
);

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

const DialTextField = styled(TextField)``;

const Typography = styled(MuiTypography)``;

interface IDialSearch
{
  symbolLocation1: String,
  symbolLocation2: String,
  symbolLocation3: String,
  symbolLocation1TF: String,
  symbolLocation2TF: String,
  symbolLocation3TF: String,
  open:boolean,
  tabValue: number,
  activeField: string,
  dialEnabled: boolean
}
const he = require('he');
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class DialPage1 extends React.Component<any, IDialSearch> {



  symbolTypes = [
    {name: "Emoji", type: "emoji"},
    {name: "Alphabet", type: "alphabet"},
    {name: "Numeric", type: "numeric"}
  ];

  symbols = {
    emoji: [],
    alphabet: [],
    numeric: [],
  };

  allSymbols = {};

  symbolsApi = symbols;

  constructor(props: any) {

    super(props);

    this.state = {
      symbolLocation1: "",
      symbolLocation2: "",
      symbolLocation3: "",
      symbolLocation1TF: "",
      symbolLocation2TF: "",
      symbolLocation3TF: "",
      open: false,
      tabValue: 0,
      activeField: "",
      dialEnabled: false
    };

    this.handleTabChange = this.handleTabChange.bind(this)
    //this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onDialFieldChange = this.onDialFieldChange.bind(this)
    //this.onSymbolSelect = this.onSymbolSelect.bind(this)
  }

  handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    // @ts-ignore
    this.setState({tabValue: newValue})
  };

  handleOpen(activeFieldId: any) {
    // @ts-ignore
    this.setState({ activeField : activeFieldId});
    // @ts-ignore
    this.setState({ open : true});
  }

  handleClose(event: any) {
    // @ts-ignore
    this.setState({ open : false});
  }

  async componentDidMount() {
    // @ts-ignore
    let allSymbols = await this.symbolsApi.getAll();
    if(allSymbols === undefined || allSymbols === null) return;
    allSymbols.forEach((symbol: any) => {

      // @ts-ignore
      this.allSymbols[symbol._id] = symbol.symbol;

      if (symbol.type === "alphabet")
        // @ts-ignore
        this.symbols.alphabet.push(symbol)

      if (symbol.type === "emoji")
          // @ts-ignore
        this.symbols.emoji.push(symbol)

      if (symbol.type === "numeric")
          // @ts-ignore
        this.symbols.numeric.push(symbol)
    })
  }

  a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  onDialFieldChange(event: any) {

  }

  onSymbolSelect(symbolId: any) {

    const field = this.state.activeField;
    const activeFieldTF = field+"TF";

    // @ts-ignore
    const symbol = he.decode(this.allSymbols[symbolId]);

    // @ts-ignore
    this.setState({ [field]: symbolId });
    // @ts-ignore
    this.setState({ [activeFieldTF]: symbol });
    // @ts-ignore
    this.setState({ tabValue: 0 });

    if (this.state.symbolLocation1 != "" && this.state.symbolLocation2 != "" && this.state.symbolLocation3 != "")  {
      // @ts-ignore
      this.setState({dialEnabled: true})
    }
    else  {
      // @ts-ignore
      this.setState({dialEnabled: false})
    }

    this.handleClose(this)
  }


  render() {
    return (<Wrapper>
      <div className="text-center info-text">
        <h4>Dial page</h4>
      </div>

      <div>

        <Grid container spacing={3} style={{
          backgroundColor: "white",
          textAlign:"center",
        }}>
          <Grid item  xs={4} sm={4} id="symbolLocation1" onClick={() => this.handleOpen("symbolLocation1")}>
            <Paper style={{
              fontSize:"3em",
              color: "#000000",
              cursor:"pointer",
              width: "100px",
              height: "100px"
            }}
            variant={"outlined"}
            square={true}
            elevation={1}>
              {!this.state.symbolLocation1TF ?
                  <TouchAppIcon
                      style={{
                        fontSize:"1.5em",
                        color: "#000000",
                        cursor:"pointer"
                      }}/> : this.state.symbolLocation1TF}
            </Paper>
          </Grid>
          <Grid item  xs={4} sm={4} id="symbolLocation2" onClick={() => this.handleOpen("symbolLocation2")}>
            <Paper style={{
              textAlign:"center",
              fontSize:"3em",
              cursor:"pointer",
              width: "100px",
              height: "100px"
            }}
             variant={"outlined"}
             square={true}
             elevation={1}>
              {!this.state.symbolLocation2TF ?
                  <TouchAppIcon
                      style={{
                        fontSize:"1.5em",
                        color: "#000000",
                        cursor:"pointer"
                      }}/> : this.state.symbolLocation2TF}
            </Paper>
          </Grid>
          <Grid item  xs={4} sm={4} id="symbolLocation3" onClick={() => this.handleOpen("symbolLocation3")}>
            <Paper style={{
              textAlign:"center",
              fontSize:"3em",
              cursor:"pointer",
              width: "100px",
              height: "100px"
            }}
             variant={"outlined"}
             square={true}
             elevation={1}>
              {!this.state.symbolLocation3TF ?
                  <TouchAppIcon
                      style={{
                        fontSize:"1.5em",
                        color: "#000000",
                        cursor:"pointer"
                      }}/> : this.state.symbolLocation3TF}
            </Paper>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container spacing={1}>
          <Grid item xs>
            <Box>
              <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth={true}
                  style={{fontSize: "2em"}}
                  disabled={!this.state.dialEnabled}
              >
                <CallIcon style={{fontSize: "1.5em"}}/>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>

      <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            width: "80%",
            position: "absolute",
            backgroundColor: "#ffffff",
            height: "80%",
            marginLeft: "9%",
            marginTop: "9%"
          }}
      >
        <Box>
          <Paper >
            <Tabs
                value={this.state.tabValue}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
                aria-label="full width tabs example"
            >
              <Tab label="Numbers" {...this.a11yProps(0)}  />
              <Tab label="Alphabets" {...this.a11yProps(1)}  />
              <Tab label="Emojis" {...this.a11yProps(2)}  />
            </Tabs>
            <TabPanel value={this.state.tabValue} index={0}>
              {this.symbols.numeric.map((symbol) => (
                  <Button
                      id={symbol['_id']}
                      key={symbol['_id']}
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{
                        margin: "2px",
                        fontSize: "2em"
                      }}
                      onClick={() => this.onSymbolSelect(symbol['_id'])}
                      value={symbol['_id']}
                  >{symbol['symbol']}</Button>
              ))}
            </TabPanel>
            <TabPanel value={this.state.tabValue} index={1}>
              {this.symbols.alphabet.map((symbol) => (
                  <Button
                      id={symbol['_id']}
                      key={symbol['_id']}
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{
                        margin: "2px",
                        fontSize: "2em"
                      }}
                      onClick={() => this.onSymbolSelect(symbol['_id'])}
                      value={symbol['_id']}
                  >{symbol['symbol']}</Button>
              ))}
            </TabPanel>
            <TabPanel value={this.state.tabValue} index={2}>
              {this.symbols.emoji.map((symbol) => (
                  <Button
                      id={symbol['_id']}
                      key={symbol['_id']}
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{
                        margin: "2px",
                        fontSize: "2em"
                      }}
                      onClick={() => this.onSymbolSelect(symbol['_id'])}
                      value={symbol['_id']}
                  >{he.decode(symbol['symbol'])}</Button>
              ))}
            </TabPanel>
          </Paper>
        </Box>
      </Modal>
    </Wrapper>);
  }


}

const mapStateToProps = ({ Contacts, Auth }: any) => ({ Contacts, Auth });
export default connect(mapStateToProps)(DialPage1);
