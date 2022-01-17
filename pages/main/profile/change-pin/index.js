import React, { useEffect, useState } from "react";
import MainLayout from "components/layouts/MainLayout";
import { getDataCookie } from "middleware/authorizationPage";
import { Button, ErrorHandling } from "components/module";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updatePin } from "stores/actions/user";
import { useRouter } from "next/router";

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

export default function ChangePin(props) {
  const [pin, setPin] = useState({});
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });
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
    setIsLoading(true);

    dispatch(updatePin(user.data.id, { pin: allPin }))
      .then((res) => {
        setIsSuccess({
          status: true,
          msg: res.value.data.msg,
        });

        setTimeout(() => {
          setIsSuccess({
            status: false,
            msg: "",
          });
          router.push("/profile");
        }, 2000);
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
    <MainLayout
      title="Change PIN"
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
        <h5 className="nunito-700">Change PIN</h5>
        <p
          className="nunito-400 font-secondary"
          style={{
            // width: "40%",
            marginTop: "25px",
            marginBottom: "40px",
            lineHeight: "28px",
          }}
        >
          Enter your current 6 digits Zwallet PIN below to continue to the next
          steps.
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

        {isError.status && <ErrorHandling msg={isError.msg} top="50px" />}
        {isSuccess.status && (
          <ErrorHandling msg={isSuccess.msg} top="50px" isSuccess={true} />
        )}

        <div className="text-center">
          {isLoading ? (
            <Button top="90px" width="75%">
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button
              name="Continue"
              top="90px"
              handleClick={handleSubmit}
              width="75%"
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
