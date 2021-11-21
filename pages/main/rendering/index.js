import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Layout from "components/Layout";
import axios from "utils/axios";
import cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import { getUserById } from "stores/actions/user";

export default function CSR(props) {
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
  console.log(props);

  return (
    // <Layout title="Rendering With CSR">
    // <Navbar />
    <>
      <h1>Test</h1>
      <h1>{userProfile.firstName}</h1>
    </>
    // </Layout>
  );
}
