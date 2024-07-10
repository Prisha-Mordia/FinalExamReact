import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const getSingleRecord = async () => {
    try {
      let response = await fetch(`http://localhost:8000/user/?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await response.json();
      if (res && res.user) {
        setName(res.user.name);
        setEmail(res.user.email);
        setPhone(res.user.phone);
        setCity(res.user.city);
        setAddress(res.user.address);
      } else {
        toast.error("User not found");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while fetching the user data");
    }
  };

  useEffect(() => {
    getSingleRecord();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:8000/user/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          email,
          phone,
          city,
          address,
        }),
      });
      let res = await response.json();
      if (res) {
        toast.success("User successfully updated");
      } else {
        toast.error("Please try again");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while updating the user");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit User</h2>
      <form onSubmit={handlesubmit} className="border p-4 bg-light rounded">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter phone number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to={`/`} className="btn btn-secondary ml-2">
          View Users
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Edit;
