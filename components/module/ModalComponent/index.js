import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "..";

export default function ModalComponent({
  show,
  onHide,
  isPin,
  handleTextTopup,
  handleSubmitTopup,
  handleTextPin,
  handleSubmitPin,
  topUpError,
  msgErrorTopUp,
}) {
  return (
    <>
      {isPin ? (
        // [PIN]
        <Modal show={show} onHide={onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Enter PIN to Transfer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="nunito-400 font-secondary">
              Enter your 6 digits PIN for confirmation to continue transferring
              money.
            </p>

            <div style={{ marginTop: "40px", marginBottom: "50px" }}>
              <div className="d-flex gap-3 justify-content-center">
                <div className="">
                  <input
                    className="input__pin"
                    maxLength="1"
                    onChange={handleTextPin}
                    name="1"
                    id="pin-1"
                  />
                </div>
                <div className="">
                  <input
                    className="input__pin"
                    maxLength="1"
                    onChange={handleTextPin}
                    name="2"
                    id="pin-2"
                  />
                </div>
                <div className="">
                  <input
                    className="input__pin"
                    maxLength="1"
                    onChange={handleTextPin}
                    name="3"
                    id="pin-3"
                  />
                </div>
                <div className="">
                  <input
                    className="input__pin"
                    maxLength="1"
                    onChange={handleTextPin}
                    name="4"
                    id="pin-4"
                  />
                </div>
                <div className="">
                  <input
                    className="input__pin"
                    maxLength="1"
                    onChange={handleTextPin}
                    name="5"
                    id="pin-5"
                  />
                </div>
                <div className="">
                  <input
                    className="input__pin"
                    maxLength="1"
                    onChange={handleTextPin}
                    name="6"
                    id="pin-6"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              name="Continue"
              width="170px"
              handleClick={handleSubmitPin}
            />
          </Modal.Footer>
        </Modal>
      ) : (
        // [TOP UP]
        <Modal show={show} onHide={onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Topup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="nunito-400 font-secondary">
              Enter the amount of money, and click submit
            </p>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              onChange={handleTextTopup}
              className="nunito-700 font-primary"
              style={{
                height: "70px",
                width: "100%",
                textAlign: "center",
                fontSize: "42px",
                marginTop: "40px",
                marginBottom: "50px",
                border: "1px solid rgba(169, 169, 169, 0.6)",
                borderRadius: "10px",
                outline: "none",
              }}
            />
            {topUpError && (
              <p
                style={{
                  color: "#ff5b37",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                {msgErrorTopUp}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              name="Submit"
              width="170px"
              handleClick={handleSubmitTopup}
            />
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
