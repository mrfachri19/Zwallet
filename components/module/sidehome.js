import Link from "next/link";
import React from "react";

import {
  faArrowUp,
  faGripHorizontal,
  faPlus,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidehome() {
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
            <Link href="/main/home">Dashboard</Link>
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
            <Link href="/main/profile-user">Profile</Link>
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
