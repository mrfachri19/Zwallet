import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "utils/axios";
import Cookie from "js-cookie";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Formlogin() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", form)
      .then((res) => {
        console.log(res);
        Cookie.set("token", res.data.data.token);
        Cookie.set("id", res.data.data.id);
        if (res.data.data.pin) {
          router.push("/main/home");
        } else {
          router.push("/auth/create-pin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="textbox">
          <i>
            <FontAwesomeIcon icon={faEnvelope} />
          </i>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChangeText}
            placeholder="Enter Email"
          />
        </div>
        <div className="textbox">
          <i>
            <FontAwesomeIcon icon={faLock} />
          </i>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChangeText}
            placeholder="Create Password"
          />
        </div>
        <div className="text-end">
          <p className="text-end">
            <Link href="/auth/resetpass">Forgot Password</Link>
          </p>
        </div>
        <div className="button">
          <button className="btn btn-primary mt-3 mx-auto">Login</button>
        </div>
      </form>
      <div className="row">
        <p className="text-center">
          Dont have an account? <Link href="/auth/signup">Lets Sign Up</Link>
        </p>
      </div>
    </>
  );
}
