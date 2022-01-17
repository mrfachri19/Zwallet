import React from "react";
import { Button } from "..";
import { Modal } from "react-bootstrap";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "stores/actions/auth";

function ModalConfirm({
  msg,
  show,
  onHide,
  handleClose,
  isLogout,
  handleDelete,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout())
      .then((res) => {
        Cookie.remove("token");
        Cookie.remove("id");
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title className="nunito-600">{msg}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div className="d-flex gap-3">
            <Button
              name="Cancel"
              width="100px"
              color="#7A7886"
              handleClick={handleClose}
            />
            <Button
              name={isLogout ? "Logout" : "Delete"}
              width="100px"
              color="#FF5B37"
              handleClick={isLogout ? handleLogout : handleDelete}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
