/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>zwallet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ background: "white" }}>
        <section
          className="container d-flex justify-content-between"
          style={{ padding: "50px 0px" }}
        >
          <img
            src="../assets/images/logo/zwallet.png"
            alt="logo"
            width="98px"
            height="25px"
          />

          <div>
            {Cookie.get("token") ? (
              <>
                <button
                  style={{
                    background: "#6379F4",
                    borderRadius: "12px",
                    padding: "12px 27px",
                    outline: "none",
                    border: "none",
                    color: "white",
                  }}
                  onClick={() => router.push("/main/home")}
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "12px 27px",
                    outline: "none",
                    border: "2px solid #6379F4",
                    color: "#6379F4",
                    marginRight: "10px",
                  }}
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </button>
                <button
                  style={{
                    background: "#6379F4",
                    borderRadius: "12px",
                    padding: "12px 27px",
                    outline: "none",
                    border: "none",
                    color: "white",
                  }}
                  onClick={() => router.push("/auth/register")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </section>

        {/* HERO */}
        <section
          className="container justify-content-center d-flex gap-5  flex-column flex-md-row"
          style={{ marginBottom: "110px" }}
        >
          <img
            src="../assets/images/landing-page/hero.png"
            alt="hero"
            width="460px"
          />

          <div className=" justify-content-center align-self-center ">
            <h1
              className="nunito-700"
              style={{
                marginBottom: "40px",
                lineHeight: "93px",
                fontSize: "60px",
              }}
            >
              Awesome App <br /> For Saving{" "}
              <span className="font-primary">Time.</span>
            </h1>

            <div className="nunito-400 ">
              We bring you a mobile app for banking problems that
              <br /> oftenly wasting much of your times.
            </div>

            <button
              style={{
                margin: "50px 0px",
                backgroundColor: "#6379f4",
                padding: "16px 0px",
                color: "white",
                border: "none",
                width: "173px",
                borderRadius: "12px",
              }}
              className="nunito-700"
            >
              Try It Free
            </button>

            <p className="nunito-400">Available on</p>

            <div>
              <img
                src="../assets/images/landing-page/playstore.png"
                alt="playstore"
                width="50px"
              />
              <img
                src="../assets/images/landing-page/appstore.png"
                alt="appstore"
                width="50px"
              />
            </div>
          </div>
        </section>

        <section
          style={{ background: "rgba(71, 58, 209, 0.06)", padding: "90px 0px" }}
        >
          <div className="container d-flex justify-content-between flex-column flex-md-row align-items-center">
            <img
              src="../assets/images/landing-page/microsoft.png"
              alt="microsoft"
              width="173px"
            />
            <img
              src="../assets/images/landing-page/dropbox.png"
              alt="dropbox"
              width="173px"
            />
            <img
              src="../assets/images/landing-page/hm.png"
              alt="hm"
              width="173px"
            />
            <img
              src="../assets/images/landing-page/airbnb.png"
              alt="airbnb"
              width="173px"
            />
            <img
              src="../assets/images/landing-page/canon.png"
              alt="canon"
              width="173px"
            />
            <img
              src="../assets/images/landing-page/dell.png"
              alt="dell"
              width="173px"
            />
          </div>
        </section>

        {/* ABOUT */}
        <section
          className="container text-center"
          style={{ padding: "120px 0px" }}
        >
          <h1
            className="nunito-700"
            style={{
              marginBottom: "30px",
              lineHeight: "93px",
              fontSize: "60px",
            }}
          >
            <span className="font-primary">About</span> the Application.
          </h1>

          <p className="nunito-400" style={{ marginBottom: "70px" }}>
            We have some great features from the application and it’s totally
            free to use by all users around the world.
          </p>

          <div className="d-flex gap-5 flex-column flex-md-row">
            <div
              style={{
                background: "#FFFFFF",
                boxShadow: "0px 4px 250px rgba(172, 172, 172, 0.15)",
                borderRadius: "25px",
                padding: "40px 30px 50px 30px",
              }}
            >
              <img
                src="../assets/images/landing-page/phone.png"
                alt="phone"
                width="80px"
              />
              <h5 className="nunito-700" style={{ margin: "30px 0px" }}>
                24/7 Support
              </h5>
              <p className="nunito-400 font-secondary">
                We have 24/7 contact support so you can contact us whenever you
                want and we will respond it.
              </p>
            </div>

            <div
              style={{
                background: "#FFFFFF",
                boxShadow: "0px 4px 250px rgba(172, 172, 172, 0.15)",
                borderRadius: "25px",
                padding: "40px 30px 50px 30px",
              }}
            >
              <img
                src="../assets/images/landing-page/lock.png"
                alt="phone"
                width="80px"
              />
              <h5 className="nunito-700" style={{ margin: "30px 0px" }}>
                Data Privacy
              </h5>
              <p className="nunito-400 font-secondary">
                We make sure your data is safe in our database and we will
                encrypt any data you submitted to us.
              </p>
            </div>

            <div
              style={{
                background: "#FFFFFF",
                boxShadow: "0px 4px 250px rgba(172, 172, 172, 0.15)",
                borderRadius: "25px",
                padding: "40px 30px 50px 30px",
              }}
            >
              <img
                src="../assets/images/landing-page/download.png"
                alt="phone"
                width="80px"
              />
              <h5 className="nunito-700" style={{ margin: "30px 0px" }}>
                Easy Download
              </h5>
              <p className="nunito-400 font-secondary">
                Zwallet is 100% totally free to use it’s now available on Google
                Play Store and App Store.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          style={{ background: "rgba(71, 58, 209, 0.06)", padding: "80px 0px" }}
        >
          <div className="container d-flex align-items-center flex-md-row flex-column gap-5 justify-content-center">
            <img
              src="../assets/images/landing-page/feature.png"
              alt="image"
              width="450px"
            />

            <div>
              <h1
                className="nunito-700"
                style={{
                  marginBottom: "40px",
                  lineHeight: "93px",
                  fontSize: "60px",
                }}
              >
                All The <span className="font-primary">Great</span>
                <br /> Zwallet Features.
              </h1>

              <div
                style={{
                  padding: "25px",
                  background: "#FFFFFF",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                  borderRadius: "25px",
                  marginBottom: "30px",
                }}
              >
                <h5>
                  <span className="font-primary">1.</span> Small Fee
                </h5>
                <p className="m-0 nunito-400 font-secondary">
                  We only charge 5% of every success transaction done in Zwallet
                  app.
                </p>
              </div>

              <div
                style={{
                  padding: "25px",
                  background: "#FFFFFF",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                  borderRadius: "25px",
                  marginBottom: "30px",
                }}
              >
                <h5>
                  <span className="font-primary">2.</span> Data Secured
                </h5>
                <p className="m-0 nunito-400 font-secondary">
                  All your data is secured properly in our system and it’s
                  encrypted.
                </p>
              </div>

              <div
                style={{
                  padding: "25px",
                  background: "#FFFFFF",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                  borderRadius: "25px",
                  marginBottom: "30px",
                }}
              >
                <h5>
                  <span className="font-primary">2.</span> User Friendly
                </h5>
                <p className="m-0 nunito-400 font-secondary">
                  Zwallet come up with modern and sleek design and not
                  complicated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMMENT */}
        <section className="container" style={{ padding: "100px 0px" }}>
          <h1 className="nunito-700 text-center mb-5">
            What Users are <span className="font-primary">Saying.</span>
          </h1>
          <p className="text-center nunito-400 font-secondary mb-5">
            We have some great features from the application and it’s totally
            free to use by all users around the world.
          </p>

          <div className="d-flex flex-md-row flex-column gap-md-5 gap-3">
            <div
              style={{
                borderRadius: "25px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                padding: "50px 30px",
                background: "#fff",
              }}
              className="text-center"
            >
              <img
                src="../assets/images/landing-page/user1.png"
                alt="user"
                width="60px"
              />
              <h5 style={{ margin: "35px 0px" }} className="nunito-700">
                Sherina Chaw
              </h5>
              <p className="nunito-400 font-secondary">
                “I use this app since 2 years ago and this is the best app that
                I’ve ever use in my entire life”
              </p>
            </div>

            <div
              style={{
                borderRadius: "25px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                padding: "50px 30px",
                background: "#fff",
              }}
              className="text-center"
            >
              <img
                src="../assets/images/landing-page/user2.png"
                alt="user"
                width="60px"
              />
              <h5 style={{ margin: "35px 0px" }} className="nunito-700">
                Jessica Mera
              </h5>
              <p className="nunito-400 font-secondary">
                “I use Zwallet to manage all financial needs. It’s super easy to
                use and it’s 100% free app”
              </p>
            </div>

            <div
              style={{
                borderRadius: "25px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                padding: "50px 30px",
                background: "#fff",
              }}
              className="text-center"
            >
              <img
                src="../assets/images/landing-page/user3.png"
                alt="user"
                width="60px"
              />
              <h5 style={{ margin: "35px 0px" }} className="nunito-700">
                Robert Chandler
              </h5>
              <p className="nunito-400 font-secondary">
                “Since I’m using this app, I’m not going to move to another
                similar app. Thank you Zwallet!”
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section style={{ background: "#6379F4", padding: "50px 0px" }}>
          <div className="container">
            <div className="d-flex justify-content-between">
              <div>
                <img src="../assets/images/logo/zwallet2.png" alt="logo" />
                <p className="nunito-400 text-white py-5 m-0 w-50">
                  Simplify financial needs and saving much time in banking needs
                  with one single app.
                </p>
              </div>

              <div></div>
            </div>

            <hr style={{ color: "white" }} />

            <div className="d-flex justify-content-between nunito-400 text-white pt-3">
              <p>2020 Zwallet. All right reserved.</p>

              <div className="d-flex flex-md-row flex-column gap-md-5">
                <p>+62898987676</p>
                <p>pay.zwallet@gmail.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
