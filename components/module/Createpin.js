/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import cookie from "js-cookie";
import axios from "utils/axios";
import { useRouter } from "next/router";

const inputStyle = {
  width: "30px",
  borderRadius: "2px",
  border: "1px solid rgba(169, 169, 169, 0.6)",
  boxShadow: "0px 10px 75px rgba(147, 147, 147, 0.1)",
};

const inputContainer = {
  width: "50%",
  margin: "auto",
};

export default function CreatePin() {
  const router = useRouter();
  const [pin, setPin] = useState({});

  const addPin = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const handleSubmit = (e) => {
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
    console.log(allPin);
    e.preventDefault();
    axios
      .patch(`/user/pin/${cookie.get("id")}`, { pin: allPin })
      .then((res) => {
        console.log(res);
        router.push("/main/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mt-3">
        <div style={inputContainer}>
          <div className="row pin">
            <div className="col-sm-2 pin">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="1"
                id="pin-1"
              />
            </div>
            <div className="col-sm-2 pin">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="2"
                id="pin-2"
              />
            </div>
            <div className="col-sm-2 pin">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="3"
                id="pin-3"
              />
            </div>
            <div className="col-sm-2 pin">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="4"
                id="pin-4"
              />
            </div>
            <div className="col-sm-2 pin">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="5"
                id="pin-5"
              />
            </div>
            <div className="col-sm-2 pin">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="6"
                id="pin-6"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </>
  );
}
