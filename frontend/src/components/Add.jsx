import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Add = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:8000/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          city,
          address,
        }),
      });
      let res = await response.json();
      if (res) {
        toast.success("User successfully created");
        setName("");
        setEmail("");
        setPhone("");
        setCity("");
        setAddress("");
      } else {
        toast.error("Please try again");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New User</h2>
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

export default Add;
