// import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import user from "/public/assets/user.png";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "utils/axios";
import { useSelector, useDispatch } from "react-redux";
import cookie from "js-cookie";

export default function Navbar(props) {
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

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded-bottom ">
        <div className="container ">
          <a className="navbar-brand h1" href="">
            Zwallet
          </a>

          <ul className="nav justify-content-end rightside">
            <div className="row">
              <li className="nav-item userimage">
                <Image src={user} alt="user" className="img" />
              </li>
            </div>
            <div className="col">
              <li className="nav-item">
                <div className="name">
                  <h6>
                    {userProfile.firstName} {userProfile.lastName}
                  </h6>
                </div>
                <div className="number">
                  <h6>{userProfile.noTelp}</h6>
                </div>
              </li>
            </div>
            <li className="nav-item">
              <i>
                <FontAwesomeIcon icon={faBell} />
              </i>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
