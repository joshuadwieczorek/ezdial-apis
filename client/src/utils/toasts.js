import React from 'react';
import { toast } from "react-toastify";
import { BiError } from "react-icons/bi";
import { BsCheckAll } from "react-icons/bs";
// import { css } from 'glamor';


export const successToast = (message) =>
  toast.success(
    <span style={{ display: "flex", alignItems: "center" }}>
      <BsCheckAll size="30" style={{ marginRight: "10px" }} />
      {message}
    </span>,
    {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }
  );



export const errorToast = (message) =>
  toast.error(
    <span style={{ display: "flex", alignItems: "center" }}>
      <BiError size="30" style={{ marginRight: "10px" }} />
      {message}
    </span>,
    {
      // className: css({
      //   background: "#D0021B !important",
      // }),
      style: { background: "#D0021B !important" },
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }
  );
