import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";


const Login = () => {

 const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    await axios.post("http://localhost:8080/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
         navigate("/");
    });
  };

  return (
    <div className="login card">
      {console.log("User", user)}
      <h1>Login</h1>
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
      <button className="btn btn-primary" onClick={login}>
        Login
      </button>
      <h5 className="or">or</h5>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/register")}>
        Register
      </button>
    </div>
  );
};

export default Login;
