import React, { useState } from "react";
import Link from "next/link";
import axios from "utils/axios";
import { useRouter } from "next/router";
import AuthLayout from "components/layouts/AuthLayout";
import { Input, Button, ErrorHandling } from "components/module";
import { getDataCookie } from "middleware/authorizationPage";
import { Spinner } from "react-bootstrap";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    linkDirect: `${process.env.URL_FRONTEND}reset-password`,
  });

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/auth/forgot-password", form)
      .then((res) => {
        setIsSuccess({
          status: true,
          msg: res.data.msg,
        });

        setTimeout(() => {
          setIsSuccess({
            status: false,
            msg: "",
          });
        }, 3000);
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
    <AuthLayout title="Reset Password">
      <div className="reset__password__header">
        <h1 className="font-black nunito-700" style={{ marginBottom: "30px" }}>
          Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password
          In a Minutes.
        </h1>
        <p className="nunito-400 font-secondary">
          To reset your password, you must type your e-mail and we will send a
          link to your email and you will be directed to the reset password
          screens.
        </p>

        <div className="mt-2">
          <form>
            <Input
              image="../assets/images/auth/mail.png"
              name="email"
              type="text"
              placeholder="Enter your e-mail"
              top="60px"
              handleChange={handleChangeText}
            />

            <div className="d-flex justify-content-end mt-3 link-none">
              <Link href="/login" className="nunito-600">
                Login?
              </Link>
            </div>

            {isError.status && <ErrorHandling msg={isError.msg} top="50px" />}
            {isSuccess.status && (
              <ErrorHandling msg={isSuccess.msg} top="50px" isSuccess={true} />
            )}

            {isLoading ? (
              <Button top="90px" bottom="40px">
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <Button
                name="confirm"
                top="90px"
                bottom="40px"
                handleClick={handleSubmit}
              />
            )}
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
