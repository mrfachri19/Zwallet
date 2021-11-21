import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Sidehome from "components/module/sidehome";
import Layout from "components/Layout";
import axios from "utils/axios";
// import { getDataCookie } from "middleware/authorizationPage";
import { Bar } from "react-chartjs-2";
import Image from "next/image";
import user from "/public/assets/user.png";
import cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import Footer from "components/module/Footer";
import Link from "next/link";
// Server Side Rendering
// export async function getServerSideProps(context) {
//   const dataCookie = await getDataCookie(context);
//   if (!dataCookie.isLogin) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }

//   const response = await axios
//     .get(`/user/profile/${cookie.get("id")}`, {
//       headers: {
//         Authorization: `Bearer ${dataCookie.token}`,
//       },
//     })
//     .then((res) => {
//       setData(res.data.data[0]);
//     })
//     .catch((err) => {
//       return [];
//     });
//   return {
//     props: { data: response },
//   };
// }

export default function Home(props) {
  const chart = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Client Side Rendering
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    // dispatch(getUserById(userState.userProfile.id)).then((res) => {
    //   // console.log(res);
    // });
    getUserProfile();
  }, []);
  const getUserProfile = () => {
    axios
      .get(`/user/profile/${cookie.get("id")}`)
      .then((res) => {
        console.log(res);
        setUserProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // =========
  // Server Side Rendering
  // console.log(props);

  return (
    <Layout title="Home">
      <Navbar />
      <div className="container">
        <div className="row content">
          <div className="col-sm-3">
            <Sidehome />
          </div>
          <div className="col-sm-9">
            <div className="row">
              <div className="borderballance">
                <div className="row">
                  <div className="col-sm-9">
                    <div className="row">
                      <p>Balance</p>
                    </div>
                    <div className="row">
                      <h1>{userProfile.balance}</h1>
                    </div>
                    <div className="row">
                      <p>{userProfile.noTelp}</p>
                    </div>
                  </div>
                  <div className="col-sm-3 barballance">
                    <div className="row">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg"
                      >
                        Topup
                      </button>
                    </div>
                    <div className="row">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg mb-9 "
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6">
                <div className="borderchart">
                  <div className="row">
                    <div className="col-sm-6">
                      <div>
                        <p>Income</p>
                      </div>
                      <div>
                        <h6>Rp2.200.000</h6>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div>
                        <p>Expense</p>
                      </div>
                      <div>
                        <h6>Rp1.200.000</h6>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Bar
                      data={chart}
                      width={400}
                      height={200}
                      options={{
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="borderchart">
                  <div className="row">
                    <div className="col-sm-9">
                      <h6>Transaction History</h6>
                    </div>
                    <div className="col-sm-3">
                      <p>
                        <Link href="/main/history">See all</Link>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <Image src={user} alt="user" className="img" />
                    <div className="col-sm-6 user">
                      <div>
                        <h6>fachri maulana</h6>
                      </div>
                      <div>
                        <p>Accept</p>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <p>+Rp50.000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
