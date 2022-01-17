/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import MainLayout from "components/layouts/MainLayout";
import { getDataCookie } from "middleware/authorizationPage";
import axios from "utils/axios";
import { useRouter } from "next/router";
import { Button } from "components/module";
import { useSelector } from "react-redux";
import { formatRp } from "utils/formatRp";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: { dataCookie },
    },
  };
}

export default function HistoryDetail(props) {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [history, setHistory] = useState([]);

  // // GET USER
  const getHistoryById = () => {
    axios
      .get(`/transaction/history/${router.query.id}`)
      .then((res) => {
        console.log(res.data.data);
        setHistory(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getHistoryById();
  }, []);

  return (
    <MainLayout
      title="Personal Info"
      firstName={user.data.firstName}
      lastName={user.data.lastName}
      noTelp={user.data.noTelp}
      image={user.data.image}
    >
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
        <h5 className="nunito-700">Detail History</h5>

        {history.length > 0 ? (
          <div
            className="text-center"
            style={{
              paddingTop: "50px",
              paddingBottom: "20px",
            }}
          >
            <img
              src={
                history[0].image
                  ? `${process.env.URL_BACKEND}uploads/${history[0].image}`
                  : "../assets/images/transaction/def.jpeg"
              }
              alt="user"
              width="80px"
              height="80px"
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />

            <h5 className="nunito-700 mt-4">
              {history[0].firstName} {history[0].lastName}
            </h5>

            <p className="nunit-400 font-secondary">
              {router.query.type} - {history[0].status}
            </p>

            <h1 className="nunito-700 font-primary">
              {formatRp(history[0].amount)}
            </h1>

            <Button
              name="Back"
              handleClick={() => router.push("/history")}
              width="200px"
              top="20px"
            />
          </div>
        ) : (
          <>
            <h1 className="text-center font-secondary nunito-700">no data</h1>
          </>
        )}
      </div>
    </MainLayout>
  );
}
