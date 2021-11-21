import React from "react";
import Navbar from "../../components/module/Navbar";
import Layout from "../../components/layout";

export default function Profile() {
  return (
    <Layout title="Profile">
      <Navbar />
      <h1>page profile</h1>
      <h3>Link Backend : {process.env.URL_BACKEND}</h3>
      <button className="btn btn-primary">Click Me</button>
    </Layout>
  );
}
