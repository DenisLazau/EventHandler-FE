import React from "react";
import FormModel from "../../components/Form";
import NavBar from "../../components/NavBar";

function Event() {
  return (
    <>
      <NavBar
        title="SignUp"
        btn="Back to Login"
        classN="btn btn-outline-success"
        path="/"
      />

      <div className="container-sm">
        <FormModel />
      </div>
    </>
  );
}

export default Event;
