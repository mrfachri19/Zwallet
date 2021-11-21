import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Sidehome from "components/module/sidehome";
import Layout from "components/Layout";
import axios from "utils/axios";
import Image from "next/image";
import user from "/public/assets/user.png";
import cookie from "js-cookie";
import edit from "/public/assets/edit.png";
import { useSelector, useDispatch } from "react-redux";
import Footer from "components/module/Footer";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export default function Profile(props) {
  const router = useRouter();
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

  const handleClickProfile = () => {
    router.push("/main/personal-info");
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
                  <div className="text-center">
                    <Image
                      src={user}
                      alt="profile"
                      width="80px"
                      height="80px"
                    />

                    <div className="mt-3" style={{ cursor: "pointer" }}>
                      <Image src={edit} alt="edit" width="16px" />
                      <span className="open-sans-600 text-secondary ms-2">
                        Edit
                      </span>
                    </div>

                    <input
                      type="file"
                      id="file"
                      name="image"

                      // style={{ display: "none" }}
                    />
                    <h6>Nama User</h6>
                    <p>No telp User</p>
                  </div>
                  <div className="borderprofiles">
                    <ul className="list-group pt-20">
                      <button
                        type="button"
                        className="list-group-item list-group-item-action "
                        onClick={handleClickProfile}
                      >
                        <div className="row">
                          <div className="col-sm-11">Personal Information</div>
                          <div className="col-sm-1">
                            <i className="">
                              <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                          </div>
                        </div>
                      </button>
                      <button
                        type="button"
                        className="list-group-item list-group-item-action "
                      >
                        <div className="row">
                          <div className="col-sm-11">Change Password</div>
                          <div className="col-sm-1">
                            <i className="">
                              <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                          </div>
                        </div>
                      </button>
                      <button
                        type="button"
                        className="list-group-item list-group-item-action "
                      >
                        <div className="row">
                          <div className="col-sm-11">Change Pin</div>
                          <div className="col-sm-1">
                            <i className="">
                              <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                          </div>
                        </div>
                      </button>
                      <button
                        type="button"
                        className="list-group-item list-group-item-action "
                      >
                        <div className="row">
                          <div className="col-sm-11">LogOut</div>
                        </div>
                      </button>
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
