import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const View = () => {
  const [record, setRecord] = useState([]);

  const getUser = async () => {
    try {
      let all = await fetch(`http://localhost:8000/user/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await all.json();
      setRecord(res.users);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async (id) => {
    try {
      let all = await fetch(`http://localhost:8000/user/?id=${id}`, {
        method: "DELETE",
      });
      let res = await all.json();
      toast.error("Record Deleted");
      getUser();
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((item) => {
                const { _id, name, email, phone, city, address } = item;
                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{city}</td>
                    <td>{address}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(_id)}
                        type="button"
                        className="btn btn-danger btn-sm mr-2"
                      >
                        Delete
                      </button>
                      <Link to={`/edit/${_id}`}>
                        <button className="btn btn-warning btn-sm">Edit</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to={`/add`} className="btn btn-primary">
            Add
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
