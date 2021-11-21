import React, { useState } from "react";
import Layout from "components/Layout";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { getDataCookie } from "middleware/authorizationPage";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/main/home",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function Signin() {
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
        // if (res.data.data.pin) {
        //   ...
        // } else {
        //   ...
        // }
        router.push("/auth/create-pin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Layout title="Login">
      <div className="container">
        <h1>Login Page</h1>
        <hr />
        <div className="mt-2">
          <form className="card p-5" onSubmit={handleSubmit}>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChangeText}
            />
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChangeText}
            />
            <button className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
