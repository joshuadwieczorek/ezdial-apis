import React from "react";
import RegForm from "../components/Registration";
import styled from "styled-components";
import { Box as MuiBox, Paper as MuiPaper } from "@material-ui/core";
import DialPage from "../components/DialPage";

const Box = styled(MuiBox)``;

// const Paper = styled(MuiPaper)`
//   display: flex;
//   justify-content: center;
//   background-image: linear-gradient(to bottom right, #3eb489, #893eb4);
//   // background-color: #3eb489;
//   // #2761a5;
//   // #102372;
// `;

const Dial = () => {
  return (
    <Box>
      {/* <Paper> */}
      <DialPage />
      {/* </Paper> */}
    </Box>
  );
};

export default Dial;
