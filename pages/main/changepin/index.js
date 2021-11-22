import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Sidehome from "components/module/sidehome";
import Layout from "components/Layout";
import Footer from "components/module/Footer";
import CreatePin from "components/module/Createpin";

export default function PersonalInfo(props) {
  // Client Side Rendering

  return (
    <Layout title="Profile">
      <Navbar />
      <div className="container">
        <div className="row content">
          <div className="col-sm-3">
            <Sidehome />
          </div>
          <div className="col-sm-9">
            <div className="row">
              <div className="borderprofile">
                <div className="row">
                  <div className="text-left">
                    <h5>Change Pin</h5>
                    <p>
                      Enter your current 6 digits Zwallet PIN below to
                      <br /> continue to the next steps.
                    </p>
                  </div>
                  <div className="align-center borderpin">
                    <CreatePin />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
