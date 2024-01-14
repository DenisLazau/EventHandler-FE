import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { useLocation, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';

const UpdateEventList = () => {
  const [display, setDisplay] = useState("false");
  const [cookies] = useCookies(["member"]);
  const validationSchema = Yup.object().shape({
    ticketType: Yup.string().required(),
  });
  const location = useLocation();
  const data = location.state;

  const formik = useFormik({
    initialValues: {
      ticketType: "free", // Set a default ticketType (you can change it based on your requirements)
    },
    onSubmit: async () => {
      try {
        const memberId = cookies.member.id; // Retrieve memberId from cookies
        const response = await axios.post("http://localhost:5267/api/Ticket", {
          eventId: data.id,
          memberId: memberId,
          Type: formik.values.ticketType,
        });

        if (response.status === 200) {
          // Handle success: Show success message
          toast.success('Ticket booked successfully');
        }
      
        setDisplay("true");
      } catch (error) {
        // Handle API request error: Show an error message
        console.log(error);
        toast.error(`Error booking ticket: ${error.response.data}`);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <NavBar
        title="Update Event List"
        btn="Go Back"
        classN="btn btn-warning"
        path="/pages/EventList/EventList"
      />
      <div className="container-sm text-center">
        {/* Display seats data side by side in separate boxes */}
        <div className="d-flex justify-content-around mb-4">
          <div className="border p-3">
            <h4>VIP</h4>
            <div className="mb-2">Number of VIP Seats: {data.vipSeats.numberOfSeats || 0}</div>
            <div>Price: {data.vipSeats.price || 0}</div>
          </div>
          <div className="border p-3">
            <h4>Free</h4>
            <div className="mb-2">Number of Free Seats: {data.freeSeats.numberOfSeats || 0}</div>
            <div>Price: {data.freeSeats.price || 0}</div>
          </div>
        </div>

        {/* Dropdown for selecting ticket type */}
        <div className="mb-3">
          <label className="form-label">Select Ticket Type</label>
          <select
            id="ticketType"
            name="ticketType"
            className="form-select"
            onChange={formik.handleChange}
            value={formik.values.ticketType}
          >
            <option value="VIP">VIP</option>
            <option value="free">Free</option>
          </select>
          {formik.errors.ticketType && (
            <div className="color-form">{formik.errors.ticketType}</div>
          )}
        </div>

        {/* "Book" button to call CreateTicket endpoint */}
        <button type="button" className="btn btn-success" onClick={formik.handleSubmit}>
          Book Ticket
        </button>

        {/* Display "Go back" link if display is true */}
        {display === "true" && (
          <Link
            to="/pages/EventList/EventList"
            className="btn btn-warning ms-3"
            type="button"
          >
            Go back
          </Link>
        )}
      </div>
    </>
  );
};

export default UpdateEventList;
