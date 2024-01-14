import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

function BookTicket() {
  const [display, setDisplay] = useState("false");

  const validationSchema = Yup.object().shape({
    eventId: Yup.number().required("Event ID is required").positive().integer(),
    memberId: Yup.number().required("Member ID is required").positive().integer(),
    ticketType: Yup.string().required("Ticket Type is required"),
  });

  const location = useLocation();
  const data = location.state;

  const formik = useFormik({
    initialValues: {
      eventId: data.eventId || 0,
      memberId: data.memberId || 0,
      ticketType: "", // Initial value can be set based on your requirements
    },
    onSubmit: (values) => {
      axios.post("http://localhost:5267/api/BookTicket", {
        eventId: values.eventId,
        memberId: values.memberId,
        ticketType: values.ticketType,
      });

      setDisplay("true");
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <NavBar
        title="Book Ticket"
        btn="Go Back"
        classN="btn btn-warning"
        path="/pages/EventList/EventList"
      />
      <div className="container-sm">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Event ID</label>
            <input
              type="number"
              id="eventId"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.eventId}
            />
            {formik.errors.eventId ? (
              <div className="color-form">{formik.errors.eventId}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Member ID</label>
            <input
              type="number"
              id="memberId"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.memberId}
            />
            {formik.errors.memberId ? (
              <div className="color-form">{formik.errors.memberId}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Ticket Type</label>
            <input
              type="text"
              id="ticketType"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.ticketType}
            />
            {formik.errors.ticketType ? (
              <div className="color-form">{formik.errors.ticketType}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-success">
            Book Ticket
          </button>
          {display === "true" ? (
            <Link
              to="/pages/EventList/EventList"
              className="btn btn-warning ms-3"
              type="button"
            >
              Go back
            </Link>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default BookTicket;
