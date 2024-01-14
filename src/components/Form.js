import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

function MemberCreationForm() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    membership: Yup.string().required("Membership is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      dateOfBirth: "",
      membership: "",
    },
    onSubmit: (values) => {
      axios.post("http://localhost:5267/api/Member", {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
        dateOfBirth: values.dateOfBirth,
        membership: values.membership,
      });

      formik.resetForm();
    },
    validationSchema: validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          id="firstName"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.errors.firstName ? (
          <div className="color-form">{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          id="lastName"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.errors.lastName ? (
          <div className="color-form">{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          id="username"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username ? (
          <div className="color-form">{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          id="password"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <div className="color-form">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.dateOfBirth}
        />
        {formik.errors.dateOfBirth ? (
          <div className="color-form">{formik.errors.dateOfBirth}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label">Membership</label>
        <input
          type="text"
          id="membership"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.membership}
        />
        {formik.errors.membership ? (
          <div className="color-form">{formik.errors.membership}</div>
        ) : null}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default MemberCreationForm;
