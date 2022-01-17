/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Input, Button } from "components/module";
import { formatRp } from "utils/formatRp";

function Amount({
  name,
  noTelp,
  balance,
  image,
  handleText,
  handleSubmit,
  handleBack,
  underValue,
  styleUnderValue,
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
        <h5 className="nunito-700">Transfer Money</h5>

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

        <div>
          <p
            className="m-0 nunito-400 font-secondary"
            style={{ fontSize: "16px" }}
          >
            Type the amount you want to transfer and then
          </p>
          <p
            className="m-0 nunito-400 font-secondary"
            style={{ fontSize: "16px" }}
          >
            press continue to the next steps.
          </p>
        </div>

        <div
          className="text-center"
          style={{
            marginTop: "60px",
            marginBottom: "85px",
          }}
        >
          <input
            type="number"
            name="amount"
            placeholder="0.00"
            onChange={handleText}
            className="nunito-700"
            style={{
              height: "86px",
              width: "100%",
              textAlign: "center",
              fontSize: "42px",
              color: `${styleUnderValue ? "#6379f4" : "red"}`,
              border: "none",
              outline: "none",
            }}
          />

          {underValue && (
            <p
              style={{
                color: "#ff5b37",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Minimum {formatRp(10000)} to transfer
            </p>
          )}

          <h5
            className="nunito-700"
            style={{ marginTop: "40px", marginBottom: "60px" }}
          >
            {formatRp(balance)} Available
          </h5>

          <Input
            name="notes"
            type="text"
            placeholder="Add some notes"
            image="../assets/images/transaction/edit.png"
            top="60px"
            width="75%"
            handleChange={handleText}
          />
        </div>

        <div className="d-flex justify-content-end">
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

export default Amount;
