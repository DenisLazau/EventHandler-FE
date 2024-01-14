import React from "react";
import FormModel from "../../components/Form";
import NavBar from "../../components/NavBar";

function Event() {
  return (
    <>
      <NavBar
        title="Event"
        btn="Update/Delete"
        classN="btn btn-outline-success"
        path="../pages/EventList/EventList"
      />

      <div className="container-sm">
        <FormModel />
      </div>
    </>
  );
}

export default Event;
