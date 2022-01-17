import React, { useEffect, useState } from "react";
import MainLayout from "components/layouts/MainLayout";
import { getDataCookie } from "middleware/authorizationPage";
import { Modal, Spinner } from "react-bootstrap";
import { Button, ErrorHandling } from "components/module";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, updateProfile } from "stores/actions/user";

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

export default function PersonalInfo(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // MODAL
  const [show, setShow] = useState(false);
  const [showFirstName, setShowFirstName] = useState(false);
  const [showLastName, setShowLastName] = useState(false);

  const handleCloseTelp = () => setShow(false);
  const handleShowTelp = () => setShow(true);

  const handleCloseFirstName = () => setShowFirstName(false);
  const handleShowFirstName = () => setShowFirstName(true);

  const handleCloseLastName = () => setShowLastName(false);
  const handleShowLastName = () => setShowLastName(true);

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });

  const [noTelp, setNoTelp] = useState(user.data.noTelp);
  const [firstName, setFirstName] = useState(user.data.firstName);
  const [lastName, setLastName] = useState(user.data.lastName);

  const [isLoading, setIsLoading] = useState(false);

  const handleTextNoTelp = (e) => {
    setNoTelp(e.target.value);
  };

  const handleTextFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleTextLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    dispatch(updateProfile(user.data.id, { noTelp: noTelp }))
      .then((res) => {
        setIsLoading(false);
        handleCloseTelp();
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
        setIsLoading(false);
      });
  };

  const handleSubmitFirstName = () => {
    setIsLoading(true);

    dispatch(updateProfile(user.data.id, { firstName: firstName }))
      .then((res) => {
        setIsLoading(false);
        handleCloseFirstName();
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
        setIsLoading(false);
      });
  };

  const handleSubmitLastName = () => {
    setIsLoading(true);

    dispatch(updateProfile(user.data.id, { lastName: lastName }))
      .then((res) => {
        setIsLoading(false);
        handleCloseLastName();
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
        setIsLoading(false);
      });
  };

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
        <h5 className="nunito-700">Personal Info</h5>
        <p
          className="nunito-400 font-secondary w-100"
          style={{
            marginTop: "25px",
            marginBottom: "40px",
            lineHeight: "28px",
          }}
        >
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </p>

        <div
          className="d-flex justify-content-between"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">First Name</span>
              <h5 className="nunito-600 mt-2">{user.data.firstName}</h5>
            </div>
          </div>

          <div
            className="align-self-center nunito-400 font-primary"
            onClick={handleShowFirstName}
            style={{ cursor: "pointer" }}
          >
            Manage
          </div>
        </div>

        <div
          className="d-flex justify-content-between"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Last Name</span>
              <h5 className="nunito-600 mt-2">{user.data.lastName}</h5>
            </div>
          </div>

          <div
            className="align-self-center nunito-400 font-primary"
            onClick={handleShowLastName}
            style={{ cursor: "pointer" }}
          >
            Manage
          </div>
        </div>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Verified E-mail</span>
              <h5 className="nunito-600 mt-2 font-secondary">
                {user.data.email}
              </h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-between"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Phone Number</span>
              <h5 className="nunito-600 mt-2">{user.data.noTelp || "-"}</h5>
            </div>
          </div>
          <div
            className="align-self-center nunito-400 font-primary"
            onClick={handleShowTelp}
            style={{ cursor: "pointer" }}
          >
            Manage
          </div>
        </div>
      </div>

      {/* UPDATE FIRSTNAME */}
      <Modal show={showFirstName} onHide={handleCloseFirstName} centered>
        <Modal.Header closeButton>
          <Modal.Title>First Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="nunito-400 font-secondary">
            Enter first name to update your profile
          </p>
          <input
            type="text"
            name="firstName"
            value={firstName}
            placeholder="Input First Name ..."
            onChange={handleTextFirstName}
            className="nunito-700 font-primary"
            style={{
              height: "70px",
              width: "100%",
              textAlign: "center",
              fontSize: "20px",
              marginTop: "40px",
              marginBottom: "50px",
              border: "1px solid rgba(169, 169, 169, 0.6)",
              borderRadius: "10px",
              outline: "none",
            }}
          />

          {isError.status && <ErrorHandling msg={isError.msg} top="50px" />}
          {isSuccess.status && (
            <ErrorHandling msg={isSuccess.msg} top="50px" isSuccess={true} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <Button width="170px">
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button
              name="Submit"
              width="170px"
              handleClick={handleSubmitFirstName}
            />
          )}
        </Modal.Footer>
      </Modal>

      {/* UPDATE LASTNAME */}
      <Modal show={showLastName} onHide={handleCloseLastName} centered>
        <Modal.Header closeButton>
          <Modal.Title>Last Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="nunito-400 font-secondary">
            Enter last name to update your profile
          </p>
          <input
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Input Last Name ..."
            onChange={handleTextLastName}
            className="nunito-700 font-primary"
            style={{
              height: "70px",
              width: "100%",
              textAlign: "center",
              fontSize: "20px",
              marginTop: "40px",
              marginBottom: "50px",
              border: "1px solid rgba(169, 169, 169, 0.6)",
              borderRadius: "10px",
              outline: "none",
            }}
          />

          {isError.status && <ErrorHandling msg={isError.msg} top="50px" />}
          {isSuccess.status && (
            <ErrorHandling msg={isSuccess.msg} top="50px" isSuccess={true} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <Button width="170px">
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button
              name="Submit"
              width="170px"
              handleClick={handleSubmitLastName}
            />
          )}
        </Modal.Footer>
      </Modal>

      {/* UPDATE NO TELP */}
      <Modal show={show} onHide={handleCloseTelp} centered>
        <Modal.Header closeButton>
          <Modal.Title>Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="nunito-400 font-secondary">
            Enter phone number to update your profile
          </p>
          <input
            type="number"
            name="noTelp"
            value={noTelp}
            placeholder="Input Phone Number ..."
            onChange={handleTextNoTelp}
            className="nunito-700 font-primary"
            style={{
              height: "70px",
              width: "100%",
              textAlign: "center",
              fontSize: "20px",
              marginTop: "40px",
              marginBottom: "50px",
              border: "1px solid rgba(169, 169, 169, 0.6)",
              borderRadius: "10px",
              outline: "none",
            }}
          />

          {isError.status && <ErrorHandling msg={isError.msg} top="50px" />}
          {isSuccess.status && (
            <ErrorHandling msg={isSuccess.msg} top="50px" isSuccess={true} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <Button width="170px">
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button name="Submit" width="170px" handleClick={handleSubmit} />
          )}
        </Modal.Footer>
      </Modal>
    </MainLayout>
  );
}
