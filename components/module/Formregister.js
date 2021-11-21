import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "utils/axios";
import Cookie from "js-cookie";
import Link from "next/link";

export default function Formregister() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", form)
      .then((res) => {
        console.log(res);
        Cookie.set("token", res.data.data.token);
        Cookie.set("id", res.data.data.id);
        // if (res.data.data.pin) {
        //   ...
        // } else {
        //   ...
        // }
        router.push("/auth/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleLogout = () => {
  //   console.log("Logout");
  //   router.push("/login");
  // };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="textbox">
          <i className="fas fa-user"></i>
          <input
            type="firstName"
            className="form-control"
            name="firstName"
            onChange={handleChangeText}
            placeholder=" Enter First Name"
          />
        </div>
        <div className="textbox">
          <i className="fas fa-user"></i>
          <input
            type="lastName"
            className="form-control"
            name="lastName"
            onChange={handleChangeText}
            placeholder="Enter Last Name"
          />
        </div>
        <div className="textbox">
          <i className="fas fa-user"></i>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChangeText}
            placeholder="Enter Email"
          />
        </div>
        <div className="textbox">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChangeText}
            placeholder="Create Password"
          />
        </div>
        <div className="button">
          <button className="btn btn-primary mt-3 mx-auto">Register</button>
        </div>
      </form>
      <div className="row">
        <p>
          Already have an account? <Link href="/auth/signin">Lets Sign In</Link>
        </p>
      </div>
    </>
  );
}
