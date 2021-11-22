import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Sidehome from "components/module/sidehome";
import Layout from "components/Layout";
import axios from "utils/axios";
import cookie from "js-cookie";
import Footer from "components/module/Footer";
import { useRouter } from "next/router";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Addphone(props) {
  // Client Side Rendering
  const router = useRouter();
  const [form, setForm] = useState({ noTelp: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/user/profile/${cookie.get("id")}`, form)
      .then((res) => {
        console.log(res);
        router.push("/main/profile-user");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
                    <h5>Add Phone Number</h5>
                    <p>
                      You must enter your current password and then <br /> type
                      your new password twice.
                    </p>
                  </div>
                  <div className="personalinfo">
                    <form onSubmit={handleSubmit}>
                      <div className="textbox">
                        <i>
                          <FontAwesomeIcon icon={faPhoneAlt} />
                        </i>

                        <input
                          type="text"
                          className="form-control"
                          name="noTelp"
                          placeholder="Add Phone Number"
                          onChange={handleChangeText}
                        />
                      </div>

                      <div className="button">
                        <button
                          type="button"
                          className="btn btn-primary mt-3 mx-auto"
                          onClick={handleSubmit}
                        >
                          Add Phone Number
                        </button>
                      </div>
                    </form>
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
