/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "components/module";
import { formatRp } from "utils/formatRp";
import { formatDate } from "utils/formatDate";

function ConfirmationTransfer({
  name,
  noTelp,
  amount,
  balance,
  date,
  notes,
  image,
  handleSubmit,
  handleBack,
}) {
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

        <h5 className="nunito-700">Details</h5>

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
              <h5 className="nunito-600 mt-2">{formatRp(balance - amount)}</h5>
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
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Notes</span>
              <h5 className="nunito-600 mt-2">{notes || "-"}</h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-end"
          style={{ marginTop: "35px" }}
        >
          <Button
            name="Back"
            handleClick={handleBack}
            width="170px"
            color="gray"
          />
          <div style={{ width: "50px" }}></div>
          <Button name="Continue" handleClick={handleSubmit} width="170px" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationTransfer;
