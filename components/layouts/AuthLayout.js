/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

export default function AuthLayout(props) {
  return (
    <>
      <Head>
        <title> {props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="row g-0">
        <div className="col-0 col-md-7 d-none d-md-block p-0">
          <div className="layout__overlay">
            <img
              src="../assets/images/logo/zwallet2.png"
              alt="logo"
              height="40px"
            />
            <img
              src="../assets/images/auth/auth.png"
              alt="logo"
              width="512px"
              style={{ marginTop: "38px" }}
            />

            <h5
              className="text-white nunito-700"
              style={{ marginTop: "12px", marginBottom: "30px" }}
            >
              App that Covering Banking Needs.
            </h5>

            <p
              className="text-white nunito-400"
              style={{
                lineHeight: "23px",
                fontSize: "16px",
              }}
            >
              Zwallet is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in Zwallet everyday with worldwide
              users coverage.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-5 p-0 d-flex align-items-center mt-5 mt-md-0">
          {props.children}
        </div>
      </div>
    </>
  );
}
