/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "utils/axios";
import { formatRp } from "utils/formatRp";

export default function Navbar(props) {
  const router = useRouter();

  const [data, setData] = useState({});
  const [showNotif, setShowNotif] = useState(false);

  const getNotif = () => {
    axios
      .get(`/transaction/history?page=1&limit=5&filter=WEEK`)
      .then((res) => {
        let temp = res.data.data.reverse();
        setData(temp);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getNotif();
  }, []);

  return (
    <div className="navbar__wrapper">
      <div className="container d-flex justify-content-between align-items-center">
        <img
          src="../assets/images/logo/zwallet.png"
          alt="logo"
          width="98px"
          height="25px"
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        />

        <div className="d-flex gap-4 align-self-center">
          <img
            src={
              props.image
                ? `${process.env.URL_BACKEND}uploads/${props.image}`
                : "../assets/images/transaction/def.jpeg"
            }
            alt="logo"
            width="52px"
            height="52px"
            style={{ borderRadius: "10px", objectFit: "cover" }}
          />
          <div>
            <div className="nunito-700" style={{ fontSize: "18px" }}>
              {props.firstName} {props.lastName}
            </div>
            <div
              className="nunito-400 font-secondary"
              style={{ fontSize: "13px" }}
            >
              {props.noTelp || "-"}
            </div>
          </div>
          <img
            src="../assets/images/transaction/bell.png"
            alt="notification"
            width="24px"
            height="24px"
            className="align-self-center"
            style={{ cursor: "pointer" }}
            onClick={() => setShowNotif(!showNotif)}
          />
        </div>
      </div>

      {showNotif ? (
        <div className="notif__navbar">
          {data?.length > 0 ? (
            <>
              {data?.map((item) => (
                <div key={item.id} className="notif__navbar--item d-flex gap-2">
                  {item.type === "send" ? (
                    <>
                      <div>
                        <img
                          src="../assets/images/transaction/arrow-red.png"
                          alt="icon"
                          width="28px"
                        />
                      </div>
                      <div>
                        <p className="font-secondary nunito-400">Transfer</p>
                        <h5 className="nunito-700">{formatRp(item.amount)}</h5>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <img
                          src="../assets/images/transaction/arrow-green.png"
                          alt="icon"
                          width="28px"
                        />
                      </div>
                      <div>
                        <p className="font-secondary nunito-400">{item.type}</p>
                        <h5 className="nunito-700">{formatRp(item.amount)}</h5>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          ) : (
            <>
              <span className="text-center font-secondary nunito-700">
                no transaction
              </span>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
