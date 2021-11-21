// import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import user from "/public/assets/user.png";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "utils/axios";

export default function Navbar(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = () => {
    axios
      .get("/user?page=1&limit=2&search=&sort=")
      .then((res) => {
        setData(res.data.data);
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
                  {data.map((item) => (
                    <div key={item.id}>
                      <h6>
                        {item.firstName}
                        {item.lastName}
                      </h6>
                    </div>
                  ))}
                </div>
                <div className="number">+62 890989</div>
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
