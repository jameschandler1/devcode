import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <Fragment>
    <img
      className="spinner"
      src={spinner}
      style={{ width: "100px", margin: "auto", display: "block", marginTop: "12rem" }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
