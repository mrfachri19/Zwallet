import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Sidehome from "components/module/sidehome";
import Layout from "components/Layout";
import axios from "utils/axios";
import cookie from "js-cookie";
import Image from "next/image";
import user from "/public/assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import Footer from "components/module/Footer";

export default function History(props) {
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
    <Layout title="History">
      <Navbar />
      <div className="container">
        <div className="row content">
          <div className="col-sm-3">
            <Sidehome />
          </div>
          <div className="col-sm-9">
            <div className="row">
              <div className="borderbox">
                <div className="row">
                  <Image src={user} alt="user" className="img" />
                  <div className="col-sm-6 user">
                    <div>
                      <h6>fachri maulana</h6>
                    </div>
                    <div>
                      <p>Accept</p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <p>+Rp50.000</p>
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
