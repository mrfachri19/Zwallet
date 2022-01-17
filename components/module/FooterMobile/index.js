/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { ModalComponent, ModalConfirm } from "..";

export default function FooterMobile() {
  const router = useRouter();

  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // MODAL LOGOUT
  const [showLogout, setShowLogout] = useState(false);

  const handleCloseLogout = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);

  // TOP UP
  const [data, setData] = useState("");

  const handleTextTopup = (e) => {
    setData(e.target.value);
  };

  const handleSubmitTopup = () => {
    axios
      .post(`/transaction/top-up`, { amount: data })
      .then((res) => {
        console.log(res.data);
        router.push(res.data.data.redirectUrl);
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // SIDEBAR
  const handleDashboard = () => {
    router.push("/home");
  };

  const handleTranfer = () => {
    router.push("/transfer");
  };

  const handleTopup = () => {
    handleShow();
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const isActive = (path) => {
    return router.pathname.includes(path);
  };

  return (
    <div className="footer__mobile__wrapper">
      <div className="d-flex gap-5 justify-content-between">
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleDashboard}
        >
          {isActive("/main/home") ? (
            <>
              <img
                src="../assets/images/sidebar/grid-active.png"
                alt="img"
                width="28px"
                height="28px"
              />
            </>
          ) : (
            <>
              <img
                src="../assets/images/sidebar/grid.png"
                alt="img"
                width="28px"
                height="28px"
              />
            </>
          )}
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleTranfer}
        >
          {isActive("/main/transfer") ? (
            <>
              <img
                src="../assets/images/sidebar/arrow-active.png"
                alt="img"
                width="28px"
                height="28px"
              />
            </>
          ) : (
            <>
              <img
                src="../assets/images/sidebar/arrow.png"
                alt="img"
                width="28px"
                height="28px"
              />
            </>
          )}
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleTopup}
        >
          <img
            src="../assets/images/sidebar/plus.png"
            alt="img"
            width="28px"
            height="28px"
          />
        </div>
        <div
          className="d-flex gap-3"
          style={{
            cursor: "pointer",
          }}
          onClick={handleProfile}
        >
          {isActive("/main/profile") ? (
            <>
              <img
                src="../assets/images/sidebar/user-active.png"
                alt="img"
                width="28px"
                height="28px"
              />
            </>
          ) : (
            <>
              <img
                src="../assets/images/sidebar/user.png"
                alt="img"
                width="28px"
                height="28px"
              />
            </>
          )}
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={() => handleShowLogout()}
        >
          <img
            src="../assets/images/sidebar/logout.png"
            alt="img"
            width="28px"
            height="28px"
          />
        </div>
      </div>

      {/* MODAL */}
      <ModalComponent
        show={show}
        onHide={handleClose}
        isPin={false}
        handleTextTopup={handleTextTopup}
        handleSubmitTopup={handleSubmitTopup}
      />

      {/* MODAL LOGOUT */}
      <ModalConfirm
        isLogout={true}
        msg="Are you sure want to logout?"
        show={showLogout}
        onHide={handleCloseLogout}
        handleClose={handleCloseLogout}
      />
    </div>
  );
}
