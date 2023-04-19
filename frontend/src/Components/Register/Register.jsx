import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      await axios.post("http://localhost:8080/register", user).then((res) => {
        alert(res.data.message);
       navigate("/login");
      });
    } else {
      alert("invlid input");
    }
  };

  return (
    <div className="register card">
      {console.log("user", user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Enter Your Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Enter Your Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Enter Your Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Your Password"
        onChange={handleChange}
      />
      <button className="btn btn-primary" onClick={register}>
        Register
      </button>
      <h5 className="or">or</h5>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/login")} >
        Login
      </button>
    </div>
  );
};

export default Register;
