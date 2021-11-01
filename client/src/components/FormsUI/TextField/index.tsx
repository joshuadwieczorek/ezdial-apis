import React from "react";
import { InputAdornment, TextField as MuiTextField } from "@material-ui/core";
import { useField } from "formik";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
}));

const FormikTextField = styled(MuiTextField)``;

const TextField = ({ name, ...otherProps }: any) => {
  const [field, mata] = useField(name);

  const classes = useStyles();

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    size: "small",
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  return (
    <FormikTextField
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 50,
      }}
      InputProps={{
        // startAdornment: (
        //   <InputAdornment position="start">
        //     {/* <AccountCircle /> */}
        //   </InputAdornment>
        // ),
        classes: { notchedOutline: classes.noBorder },
      }}
      {...configTextField}
    />
  );
};

export default TextField;
