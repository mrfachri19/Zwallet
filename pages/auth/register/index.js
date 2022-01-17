import React, { useState } from "react";
import Link from "next/link";
import axios from "utils/axios";
import { useRouter } from "next/router";
import AuthLayout from "components/layouts/AuthLayout";
import { Input, Button, ErrorHandling } from "components/module";
import { getDataCookie } from "middleware/authorizationPage";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "stores/actions/auth";

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

export default function Register() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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

    // dispatch(register(form))
    //   .then((res) => {
    //     console.log(res.action);
    //     router.push("/login");
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     setIsError({
    //       status: true,
    //       msg: auth.msg,
    //     });

    //     setTimeout(() => {
    //       setIsError({
    //         status: false,
    //         msg: "",
    //       });
    //     }, 3000);
    //     setIsLoading(false);
    //   });

    axios
      .post("/auth/register", form)
      .then((res) => {
        toast.success("success registration, check email for verification");
        router.push("/login");
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
    <AuthLayout title="Register">
      <div className="register__header">
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
              image="../assets/images/auth/person.png"
              name="firstName"
              type="text"
              placeholder="Enter your firstname"
              top="60px"
              handleChange={handleChangeText}
            />
            <Input
              image="../assets/images/auth/person.png"
              name="lastName"
              type="text"
              placeholder="Enter your lastname"
              top="40px"
              handleChange={handleChangeText}
            />
            <Input
              image="../assets/images/auth/mail.png"
              name="email"
              type="text"
              placeholder="Enter your e-mail"
              top="40px"
              handleChange={handleChangeText}
            />
            <Input
              image="../assets/images/auth/lock.png"
              name="password"
              type="text"
              placeholder="Create your password"
              isPassword={true}
              top="40px"
              handleChange={handleChangeText}
            />

            {isError.status && <ErrorHandling msg={isError.msg} top="60px" />}

            {isLoading ? (
              <Button top="30px" bottom="40px">
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <Button
                name="Sign Up"
                top="30px"
                bottom="40px"
                handleClick={handleSubmit}
              />
            )}
          </form>

          <p className="text-center font-secondary">
            Already have an account? Let’s
            <span className="link-none-primary">
              <Link href="/login"> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
