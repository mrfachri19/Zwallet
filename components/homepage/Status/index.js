/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "components/module";
import { useRouter } from "next/router";
import { formatRp } from "utils/formatRp";
import { formatDate } from "utils/formatDate";

export default function Status({
  name,
  noTelp,
  amount,
  image,
  balance,
  date,
  notes,
  isSuccess,
  msg,
  handleTryAgain,
  handlePdf,
}) {
  const router = useRouter();
  return (
    <div
      style={{
        padding: "30px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRadius: "25px",
        marginTop: "40px",
        marginBottom: "40px",
        background: "#ffffff",
      }}
    >
      <div>
        {isSuccess ? (
          <div className="text-center" style={{ padding: "30px 0px" }}>
            <img
              src="../assets/images/transaction/success.png"
              alt="success"
              width="70px"
            />
            <h5 className="nunito-700" style={{ marginTop: "30px" }}>
              Transfer Success
            </h5>
          </div>
        ) : (
          <div className="text-center" style={{ padding: "30px 0px" }}>
            <img
              src="../assets/images/transaction/failed.png"
              alt="failed"
              width="70px"
            />
            <h5 className="nunito-700" style={{ marginTop: "30px" }}>
              Transfer Failed
            </h5>

            <p
              style={{ marginTop: "20px" }}
              className="nunito-400 font-secondary"
            >
              {msg}
            </p>
          </div>
        )}

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Amount</span>
              <h5 className="nunito-600 mt-2">{formatRp(amount)}</h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Balance Left</span>
              <h5 className="nunito-600 mt-2">{formatRp(balance)}</h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Date & Time</span>
              <h5 className="nunito-600 mt-2">{formatDate(date)}</h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "40px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Notes</span>
              <h5 className="nunito-600 mt-2">{notes}</h5>
            </div>
          </div>
        </div>

        <h5 className="nunito-700">Transfer To</h5>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
            marginBottom: "40px",
          }}
        >
          <div className="d-flex">
            <img
              src={
                image
                  ? `${process.env.URL_BACKEND}uploads/${image}`
                  : "../assets/images/transaction/def.jpeg"
              }
              alt="porfile"
              width="56px"
            />
            <div className="ms-3">
              <h5 className="nunito-600">{name}</h5>
              <span className="nunito-400 font-thrid">{noTelp || "-"}</span>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-end"
          style={{ marginTop: "95px" }}
        >
          {isSuccess ? (
            <>
              <button
                style={{
                  backgroundColor: "rgba(99, 121, 244, 0.15)",
                  padding: "16px 0px",
                  color: "rgba(99, 121, 244, 1)",
                  border: "none",
                  width: "170px",
                  borderRadius: "12px",
                  marginRight: "20px",
                }}
                onClick={handlePdf}
              >
                <img
                  src="../assets/images/transaction/download.png"
                  alt="icon"
                  width="22px"
                />
                <span className="nunito-400 ms-2">Download PDF</span>
              </button>
              <Button
                name="Back to Home"
                width="170px"
                handleClick={() => router.push("/home")}
              />
            </>
          ) : (
            <Button
              name="Try Again"
              width="170px"
              handleClick={handleTryAgain}
            />
          )}
        </div>
      </div>
    </div>
  );
}
