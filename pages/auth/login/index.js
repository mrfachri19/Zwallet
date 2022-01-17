import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "components/layouts/AuthLayout";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { getDataCookie } from "middleware/authorizationPage";
import { Input, Button, ErrorHandling } from "components/module";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "stores/actions/auth";
import { getUserProfile } from "stores/actions/user";

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

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState({
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

    dispatch(login(form))
      .then((res) => {
        console.log(res.action);
        dispatch(getUserProfile(res.action.payload.data.data.id));
        if (res.action.payload.data.data.pin) {
          Cookie.set("token", res.action.payload.data.data.token);
          Cookie.set("id", res.action.payload.data.data.id);
          router.push("/main/home");
          setIsLoading(false);
        } else {
          Cookie.set("token", res.action.payload.data.data.token);
          Cookie.set("id", res.action.payload.data.data.id);
          router.push("/auth/create-pin");
          setIsLoading(false);
        }
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
    <AuthLayout title="Login">
      <div className="login__header">
        <h1 className="font-black nunito-700" style={{ marginBottom: "30px" }}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h1>
        <p className="nunito-400 font-secondary">
          Transfering money is eassier than ever, you can access Zwallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
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
            <Input
              image="../assets/images/auth/lock.png"
              name="password"
              type="text"
              placeholder="Enter your password"
              isPassword={true}
              top="70px"
              handleChange={handleChangeText}
            />

            <div className="d-flex justify-content-end mt-3 link-none">
              <Link href="/reset-password" className="nunito-600">
                Forgot password?
              </Link>
            </div>

            {isError.status && <ErrorHandling msg={isError.msg} top="60px" />}

            {isLoading ? (
              <Button top="30px" bottom="40px">
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <Button
                name="Login"
                top="30px"
                bottom="40px"
                handleClick={handleSubmit}
              />
            )}
          </form>

          <p className="text-center font-secondary">
            Don’t have an account? Let’s
            <span className="link-none-primary">
              <Link href="/register"> Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
