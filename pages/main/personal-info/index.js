import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Sidehome from "components/module/sidehome";
import Layout from "components/Layout";
import axios from "utils/axios";
import cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import Footer from "components/module/Footer";
import Link from "next/link";

export default function PersonalInfo(props) {
  // Client Side Rendering
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    // dispatch(getUserById(userState.userProfile.id)).then((res) => {
    //   // console.log(res);
    // });
    getUserProfile();
  }, []);
  const getUserProfile = () => {
    axios
      .get(`/user/profile/${cookie.get("id")}`)
      .then((res) => {
        console.log(res);
        setUserProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // =========
  // Server Side Rendering
  // console.log(props);

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
                    <h6>Personal Information</h6>
                    <p>
                      We got your personal information from the sign <br />
                      up proccess. If you want to make changes on <br />
                      your information, contact our support.
                    </p>
                  </div>
                  <div className="personalinfo">
                    <ul className="list-group pt-20">
                      <li className="list-group-item">
                        <h6>First Name </h6>
                        <p>{userProfile.firstName}</p>
                      </li>
                      <li className="list-group-item">
                        <h6>Last Name </h6>
                        <p>{userProfile.lastName}</p>
                      </li>
                      <li className="list-group-item">
                        <h6> Verified E-mail </h6>
                        <p>{userProfile.email}</p>
                      </li>

                      <li className="list-group-item">
                        <h6>Phone Number</h6>
                        <p>{userProfile.noTelp}</p>
                      </li>
                    </ul>
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
