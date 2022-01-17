/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ModalComponent } from "components/module";
import axios from "utils/axios";
import { formatRp } from "utils/formatRp";

export default function Balance({ balance, noTelp }) {
  const router = useRouter();

  // TOP UP
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
  const [errTopup, setErrorTopop] = useState({
    show: false,
    msg: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTextTopup = (e) => {
    setData(e.target.value);
  };

  const handleSubmitTopup = () => {
    if (data < 10000) {
      setErrorTopop({
        show: true,
        msg: `Minimal ${formatRp(10000)} to top up`,
      });

      setTimeout(() => {
        setErrorTopop({
          show: false,
          msg: ``,
        });
      }, 3000);
    } else {
      axios
        .post(`/transaction/top-up`, { amount: data })
        .then((res) => {
          window.open(
            res.data.data.redirectUrl,
            "_blank",
            "noreferrer noopenner"
          );
          handleClose();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          marginTop: "40px",
          background: "#6379F4",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <div>
          <p className="text-white nunito-400 m-0">Balance</p>
          <h1
            style={{ marginTop: "10px", marginBottom: "15px" }}
            className="text-white nunito-700"
          >
            {formatRp(balance) || 0}
          </h1>
          <p
            className="text-white nunito-400 m-0"
            style={{ fontSize: "14px", lineHeight: "19px" }}
          >
            {noTelp || "-"}
          </p>
        </div>

        <div>
          <div
            style={{
              padding: "16px 27px",
              border: "1px solid #FFFFFF",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.2)",
              marginBottom: "15px",
              cursor: "pointer",
            }}
            onClick={() => router.push("/main/transfer")}
          >
            <img
              src="../assets/images/transaction/arrow-balance.png"
              alt="img"
              width="28px"
              height="28px"
            />
            <span className="nunito-700 text-white ms-2">Transfer</span>
          </div>

          <div
            style={{
              padding: "16px 27px",
              border: "1px solid #FFFFFF",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
            }}
            onClick={handleShow}
          >
            <img
              src="../assets/images/transaction/plus-balance.png"
              alt="img"
              width="28px"
              height="28px"
            />
            <span className="nunito-700 text-white ms-2">Top Up</span>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <ModalComponent
        show={show}
        onHide={handleClose}
        isPin={false}
        handleTextTopup={handleTextTopup}
        handleSubmitTopup={handleSubmitTopup}
        topUpError={errTopup.show}
        msgErrorTopUp={errTopup.msg}
      />
    </>
  );
}
