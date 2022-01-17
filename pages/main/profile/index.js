import MainLayout from "components/layouts/MainLayout";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getDataCookie } from "middleware/authorizationPage";
import { ModalConfirm, ErrorHandling } from "components/module";
import { useSelector, useDispatch } from "react-redux";
import { updateImage, getUserProfile, deleteImage } from "stores/actions/user";

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

export default function Transfer(props) {
  const router = useRouter();
  const inputFile = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // MODAL LOGOUT
  const [showLogout, setShowLogout] = useState(false);

  const handleCloseLogout = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);

  // MODAL DELETE IMAGE
  const [showDeleteImage, setShowDeleteImage] = useState(false);

  const handleCloseDeleteImage = () => setShowDeleteImage(false);
  const handleShowDeleteImage = () => setShowDeleteImage(true);

  const [image, setImage] = useState({ image: "" });
  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const handleUpdateImage = () => {
    if (image === null || !image.image) {
      // notifError("Masukan gambar");
    } else {
      const formData = new FormData();
      for (const data in image) {
        formData.append(data, image[data]);
      }

      // UNTUK MENGECEK DATA DI DALAM FORMDATA
      for (const data of formData.entries()) {
        // [
        //   [property, value],
        //   [],
        // ]
        console.log(data[0] + ", " + data[1]);
      }

      dispatch(updateImage(user.data.id, formData))
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
          }, 3000);
          dispatch(getUserProfile(user.data.id));
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
        });
    }
  };

  const handleDelete = () => {
    dispatch(deleteImage(user.data.id))
      .then((res) => {
        handleCloseDeleteImage();
        setIsSuccess({
          status: true,
          msg: res.value.data.msg,
        });

        setTimeout(() => {
          setIsSuccess({
            status: false,
            msg: "",
          });
        }, 3000);
        dispatch(getUserProfile(user.data.id));
      })
      .catch((err) => {
        handleCloseDeleteImage();
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
      });
  };

  useEffect(() => {
    handleUpdateImage();
  }, [image]);

  return (
    <MainLayout
      title="Profile"
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
        <div
          className="text-center"
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <img
            src={
              user.data.image
                ? `${process.env.URL_BACKEND}uploads/${user.data.image}`
                : "../assets/images/transaction/def.jpeg"
            }
            alt="user"
            width="80px"
            height="80px"
            style={{ borderRadius: "10px", objectFit: "cover" }}
          />

          {/* INPUT IMAGE */}
          <div
            style={{ marginTop: "10px", cursor: "pointer" }}
            onClick={onButtonClick}
          >
            <img
              src="../assets/images/transaction/edit-profile.png"
              alt="user"
              width="11px"
            />

            <span className="nunito-400 font-secondary ms-2">Edit</span>
          </div>

          <button
            className="nunito-400"
            style={{
              marginTop: "10px",
              backgroundColor: "#FF5B37",
              padding: "10px 5px",
              color: "white",
              border: "none",
              width: "130px",
              borderRadius: "12px",
            }}
            onClick={handleShowDeleteImage}
          >
            delete image
          </button>

          <input
            type="file"
            id="file"
            name="image"
            onChange={(e) =>
              setImage({
                image: e.target.files[0],
              })
            }
            ref={inputFile}
            style={{ display: "none" }}
          />

          <div style={{ marginTop: "15px", marginBottom: "50px" }}>
            <h5 className="nunito-700">
              {user.data.firstName} {user.data.lastName}
            </h5>
            <p className="nunito-400 font-secondary">
              {user.data.noTelp || "-"}
            </p>
          </div>

          {isError.status && <ErrorHandling msg={isError.msg} bottom="50px" />}
          {isSuccess.status && (
            <ErrorHandling msg={isSuccess.msg} bottom="50px" isSuccess={true} />
          )}

          <div className="d-flex justify-content-center align-items-center flex-column">
            <div
              style={{
                padding: "18px 20px",
                background: "#E5E8ED",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              className="d-flex justify-content-between align-items-center w-75"
              onClick={() => router.push("/profile/personal-info")}
            >
              <p className="nunito-700 m-0">Personal Information</p>
              <img
                src="../assets/images/transaction/arrow-right.png"
                alt="user"
                width="28px"
                height="28px"
              />
            </div>

            <div
              style={{
                padding: "18px 20px",
                background: "#E5E8ED",
                borderRadius: "10px",
                cursor: "pointer",
                marginTop: "20px",
              }}
              className="d-flex justify-content-between align-items-center w-75"
              onClick={() => router.push("/profile/change-password")}
            >
              <p className="nunito-700 m-0">Change Password</p>
              <img
                src="../assets/images/transaction/arrow-right.png"
                alt="user"
                width="28px"
                height="28px"
              />
            </div>

            <div
              style={{
                padding: "18px 20px",
                background: "#E5E8ED",
                borderRadius: "10px",
                cursor: "pointer",
                marginTop: "20px",
              }}
              className="d-flex justify-content-between align-items-center w-75"
              onClick={() => router.push("/profile/change-pin")}
            >
              <p className="nunito-700 m-0">Change PIN</p>
              <img
                src="../assets/images/transaction/arrow-right.png"
                alt="user"
                width="28px"
                height="28px"
              />
            </div>

            <div
              style={{
                padding: "18px 20px",
                background: "#E5E8ED",
                borderRadius: "10px",
                cursor: "pointer",
                marginTop: "20px",
              }}
              className="d-flex justify-content-between align-items-center w-75"
              onClick={handleShowLogout}
            >
              <p className="nunito-700 m-0">Logout</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL LOGOUT */}
      <ModalConfirm
        isLogout={true}
        msg="Are you sure want to logout?"
        show={showLogout}
        onHide={handleCloseLogout}
        handleClose={handleCloseLogout}
      />

      {/* MODAL DELETE IMAGE */}
      <ModalConfirm
        isLogout={false}
        handleDelete={handleDelete}
        msg="Are you sure want to delete this image?"
        show={showDeleteImage}
        onHide={handleCloseDeleteImage}
        handleClose={handleCloseDeleteImage}
      />
    </MainLayout>
  );
}
