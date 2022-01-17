import React, { useState } from "react";
import axios from "utils/axios";
import AuthLayout from "components/layouts/AuthLayout";
import { Input, Button, ErrorHandling } from "components/module";
import { getDataCookie } from "middleware/authorizationPage";
import { PinSuccess } from "components/molecules";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

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
      token: dataCookie.token,
    },
  };
}

export default function CreatePin(props) {
  const router = useRouter();
  const [pin, setPin] = useState({});
  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    e.preventDefault();

    console.log("SUBMIT PIN");

    setIsLoading(true);

    axios
      .patch(`/user/pin/${Cookie.get("id")}`, { pin: allPin })
      .then((res) => {
        console.log(res);
        router.push("/home");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({
          status: true,
          msg: err.response.data.msg,
        });

        setTimeout(() => {
          setIsError({
            status: false,
            msg: "",
          });
        }, 3000);
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout title="Create Pin">
      <div className="create__pin__header">
        {isSuccess ? (
          <PinSuccess />
        ) : (
          <>
            <h1
              className="font-black nunito-700"
              style={{ marginBottom: "30px" }}
            >
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </h1>
            <p className="nunito-400 font-secondary">
              Create 6 digits pin to secure all your money and your data in
              Zwallet app. Keep it secret and don’t tell anyone about your
              Zwallet account password and the PIN.
            </p>

            <div style={{ marginTop: "50px" }}>
              <div>
                <div className="d-flex gap-3 justify-content-center">
                  <div className="">
                    <input
                      className="input__pin"
                      maxLength="1"
                      onChange={(event) => addPin(event)}
                      name="1"
                      id="pin-1"
                    />
                  </div>
                  <div className="">
                    <input
                      className="input__pin"
                      maxLength="1"
                      onChange={(event) => addPin(event)}
                      name="2"
                      id="pin-2"
                    />
                  </div>
                  <div className="">
                    <input
                      className="input__pin"
                      maxLength="1"
                      onChange={(event) => addPin(event)}
                      name="3"
                      id="pin-3"
                    />
                  </div>
                  <div className="">
                    <input
                      className="input__pin"
                      maxLength="1"
                      onChange={(event) => addPin(event)}
                      name="4"
                      id="pin-4"
                    />
                  </div>
                  <div className="">
                    <input
                      className="input__pin"
                      maxLength="1"
                      onChange={(event) => addPin(event)}
                      name="5"
                      id="pin-5"
                    />
                  </div>
                  <div className="">
                    <input
                      className="input__pin"
                      maxLength="1"
                      onChange={(event) => addPin(event)}
                      name="6"
                      id="pin-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {isError.status && <ErrorHandling msg={isError.msg} top="60px" />}

            {isLoading ? (
              <Button top="30px">
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <Button name="Confirm" top="30px" handleClick={handleSubmit} />
            )}
          </>
        )}
      </div>
    </AuthLayout>
  );
}
