import React, { useState } from "react";
import Layout from "components/Layout";
import { getDataCookie } from "middleware/authorizationPage";
import Auth from "/components/module/Auth";
import Reset from "/components/module/Reset";

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

export default function Resetpassword() {
  return (
    <Layout title="Reset Password">
      <div className="row">
        <div className="col-sm-7">
          <Auth />
        </div>
        <div className="col-sm-4">
          <div className="row word">
            <h3>
              Start Accessing Banking Needs <br /> With All Devices and All
              Platforms <br />
              With 30.000+ Users
            </h3>
          </div>
          <div className="row word">
            <p>
              Transfering money is eassier than ever,
              <br /> you can access Zwallet wherever you <br />
              are. Desktop, laptop, mobile phone? we <br /> cover all of that
              for you!
            </p>
          </div>
          <Reset />
        </div>
      </div>
    </Layout>
  );
}
