import React, { useState } from "react";
import Layout from "components/Layout";
import { getDataCookie } from "middleware/authorizationPage";
import Auth from "/components/module/Auth";
import Createpin from "/components/module/CreatePin";

// export async function getServerSideProps(context) {
//   const dataCookie = await getDataCookie(context);
//   if (dataCookie.isLogin) {
//     return {
//       redirect: {
//         destination: "/main/home",
//         permanent: false,
//       },
//     };
//   }
//   return { props: {} };
// }

export default function createpin() {
  return (
    <Layout title="Create Pin">
      <div className="row">
        <div className="col-sm-7">
          <Auth />
        </div>
        <div className="col-sm-4">
          <div className="row word">
            <h3>
              Start Accessing Banking Needs With All Devices and All Platforms
              <br />
              With 30.000+ Users
            </h3>
          </div>
          <div className="row word">
            <p>
              Transfering money is eassier than ever, you can access <br />
              Zwallet wherever you are. Desktop, laptop, mobile phone?
              <br /> we cover all of that for you!
            </p>
          </div>
          <Createpin />
        </div>
      </div>
    </Layout>
  );
}
