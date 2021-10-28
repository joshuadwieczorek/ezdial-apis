import React from "react";
import RegForm from "../components/Registration";
import styled from "styled-components";
import { Box as MuiBox, Paper as MuiPaper } from "@material-ui/core";

const Box = styled(MuiBox)``;

const Paper = styled(MuiPaper)`
  display: flex;
  justify-content: center;
  background-color: pink;
`;

const Register = () => {
  return (
    <Box>
      <Paper>
        <RegForm />
      </Paper>
    </Box>
  );
};

export default Register;
