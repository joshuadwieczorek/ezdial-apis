import React from "react";
import { TextField as FormikTextField } from "@material-ui/core";
import { useField } from "formik";

const TextField = ({ name, ...otherProps }: any) => {
  const [field, mata] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }
  return <FormikTextField {...configTextField} />;
};

export default TextField;
