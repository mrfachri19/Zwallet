import Link from "next/link";
import React from "react";
import Image from "next/image";
import device from "/public/assets/device.png";
import {
  faArrowUp,
  faGripHorizontal,
  faPlus,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Auth() {
  const deviceImage = {
    width: "30rem",
    marginLeft: "100px",
    paddingTop: "100px",
  };

  return (
    <>
      <div className="bordergroup">
        <ul className="list-group pt-20">
          <li className="list-group-item">
            <i>
              <FontAwesomeIcon icon={faGripHorizontal} />
            </i>
            <Link href="/">Dashboard</Link>
          </li>
          <li className="list-group-item">
            <i>
              <FontAwesomeIcon icon={faArrowUp} />
            </i>
            <Link href="/">Transfer</Link>
          </li>
          <li className="list-group-item">
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            <Link href="/">Top Up</Link>
          </li>
          <li className="list-group-item">
            <i>
              <FontAwesomeIcon icon={faUser} />
            </i>
            <Link href="/">Profile</Link>
          </li>
          <li className="list-group-item">
            <i>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </i>
            <Link href="/">Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
