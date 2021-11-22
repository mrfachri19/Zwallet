import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Sidehome from "components/module/sidehome";
import Layout from "components/Layout";
import axios from "utils/axios";
import cookie from "js-cookie";
// import { useSelector, useDispatch } from "react-redux";
import Footer from "components/module/Footer";
import { useRouter } from "next/router";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PersonalInfo(props) {
  // Client Side Rendering

  const router = useRouter();

  const [formResetPassword, setResetPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const user_id = props.user_id;
  const token = props.user_token;
  const handleChangeFormResetPass = (event) => {
    setResetPassword({
      ...formResetPassword,
      [event.target.name]: event.target.value,
    });
  };

  const handleResetPassword = async (event) => {
    try {
      event.preventDefault();
      const { newPassword, confirmPassword } = formResetPassword;
      const setFormResetPassword = { newPassword, confirmPassword };

      for (const valueReset in setFormResetPassword) {
        if (setFormResetPassword[valueReset] === "") {
          toast.error("Write your new password...");
          return false;
        }
      }
      const response = await props.resetPassword(
        user_id,
        token,
        setFormResetPassword
      );
      toast.success(`${response.value.data.msg}`);
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
      event.target.reset();
      setFormResetPassword({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (
        error.message === "Cannot read properties of undefined (reading 'msg')"
      ) {
        toast.error("Password dont match!");
      }
    }
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // =========
  // Server Side Rendering
  console.log(props);

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
                    <h5>Change Password</h5>
                    <p>
                      You must enter your current password and then <br /> type
                      your new password twice.
                    </p>
                  </div>
                  <div className="personalinfo">
                    <form onSubmit={handleResetPassword}>
                      <div className="textbox">
                        <i>
                          <FontAwesomeIcon icon={faLock} />
                        </i>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={handleChangeFormResetPass}
                          placeholder="Current Password"
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
                          onChange={handleChangeFormResetPass}
                          placeholder="New Password"
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
                          placeholder="Confirm Password"
                        />
                      </div>
                      <div className="button">
                        <button className="btn btn-primary mt-3 mx-auto">
                          Change Password
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
