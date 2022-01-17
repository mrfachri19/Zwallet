import React, { useState, useEffect } from "react";
import MainLayout from "components/layouts/MainLayout";
import { Modal } from "react-bootstrap";
import { Button, ModalComponent } from "components/module";
import {
  SearchReceiver,
  ConfirmationTransfer,
  Amount,
  Status,
} from "components/homepage";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "stores/actions/user";

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

  // GET ALL USER
  const allUser = await axios
    .get(`/user?page=1&limit=10&search=&sort=firstName ASC`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return [];
    });

  return {
    props: {
      data: { dataCookie, allUser },
    },
  };
}

export default function Transfer(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // PIN
  const [pin, setPin] = useState({});

  const handleTextPin = (event) => {
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

  const handleSubmitPin = () => {
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;

    axios
      .get(`/user/pin?pin=${allPin}`)
      .then((res) => {
        console.log(res.data);
        postTransfer();
      })
      .catch((err) => {
        console.log(err.response);
        setIsSuccess(false);
        setMsg(err.response.data.msg);
        continueConfirmation();
        handleClose();
      });
  };

  // USER DATA
  const [data, setData] = useState({
    data: [],
    pagination: {},
  });
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    search: "",
    sort: "firstName ASC",
  });

  const handlePagination = (e) => {
    const selectedPage = e.selected + 1;
    setQuery({
      ...query,
      page: selectedPage,
    });

    axios
      .get(
        `/user?page=${selectedPage}&limit=${query.limit}&search=${query.search}&sort=${query.sort}`
      )
      .then((res) => {
        setData(res.data);
        router.push(
          `/main/transfer?page=${selectedPage}&limit=${query.limit}&search=${query.search}&sort=${query.sort}`
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const changeSearch = (e) => {
    setQuery({
      ...query,
      search: e.target.value,
    });

    axios
      .get(
        `/user?page=${query.page}&limit=${query.limit}&search=${e.target.value}&sort=${query.sort}`
      )
      .then((res) => {
        setData(res.data);
        router.push(
          `/main/transfer?page=${query.page}&limit=${query.limit}&search=${e.target.value}&sort=${query.sort}`
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getAllUser = () => {
    axios
      .get(
        `/user?page=${query.page}&limit=${query.limit}&search=${query.search}&sort=${query.sort}`
      )
      .then((res) => {
        setData(res.data);
        router.push(
          `/main/transfer?page=${query.page}&limit=${query.limit}&search=${query.search}&sort=${query.sort}`
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // GET USER
  const user = useSelector((state) => state.user);

  // did mount
  useEffect(() => {
    getAllUser();
  }, []);

  // did update
  // useEffect(() => {
  //   getAllUser();
  // }, [query.search]);

  // ALUR APP
  const [comp, setComp] = useState({
    isSearch: true,
    isConfirmation: false,
    isStatus: false,
  });

  const continueSearch = (item) => {
    setComp({
      isSearch: false,
      isAmount: true,
      isConfirmation: false,
      isStatus: false,
    });

    setTransferUser(item);
  };

  const continueAmount = () => {
    if (transfer.amount > user.data.balance) {
      return toast.error("Not enought amount");
    } else if (!transfer.amount) {
      return toast.error("Please fill your amount");
    } else if (transfer.amount < 10000) {
      return toast.error(`Minimum ${formatRp(10000)} to transfer`);
    } else {
      setTransfer({
        ...transfer,
        date: new Date().toString(),
      });

      setComp({
        isSearch: false,
        isAmount: false,
        isConfirmation: true,
        isStatus: false,
      });
    }
  };

  const backAmount = () => {
    setComp({
      isSearch: true,
      isAmount: false,
      isConfirmation: false,
      isStatus: false,
    });
  };

  const continueConfirmation = () => {
    setComp({
      isSearch: false,
      isAmount: false,
      isConfirmation: false,
      isStatus: true,
    });
  };

  const backTransfer = () => {
    setTransfer({
      amount: null,
      notes: "",
      date: "",
    });

    setComp({
      isSearch: false,
      isAmount: true,
      isConfirmation: false,
      isStatus: false,
    });
  };

  // TRANSFER DATA
  const [transferUser, setTransferUser] = useState({});
  const [transfer, setTransfer] = useState({
    amount: null,
    notes: "",
    date: "",
  });
  const [redirectPdf, setRedirectPdf] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const postTransfer = () => {
    axios
      .post(`/transaction/transfer`, {
        receiverId: transferUser.id,
        amount: transfer.amount,
        notes: transfer.notes,
      })
      .then((res) => {
        dispatch(getUserProfile(user.data.id));
        setIsSuccess(true);
        continueConfirmation();
        handleClose();

        axios
          .get(`/export/transaction/${res.data.data.id}`)
          .then((res) => {
            setRedirectPdf(res.data.data.url);
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err.response);
        setIsSuccess(false);
        setMsg(err.response.data.msg);
        continueConfirmation();
        handleClose();
      });
  };

  const handlePdf = () => {
    router.push(redirectPdf);
  };

  const handleText = (e) => {
    setTransfer({
      ...transfer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(transfer);
    handleShow();
    // continueConfirmation();
  };

  return (
    <MainLayout
      title="Transfer"
      firstName={user.data.firstName}
      lastName={user.data.lastName}
      noTelp={user.data.noTelp}
      image={user.data.image}
    >
      {comp.isSearch ? (
        <SearchReceiver
          data={data.data}
          handleClick={(item) => continueSearch(item)}
          onChange={changeSearch}
          // pagination
          countPagination={data.pagination.totalPage}
          handlePagination={handlePagination}
        />
      ) : comp.isAmount ? (
        <Amount
          name={`${transferUser.firstName} ${transferUser.lastName}`}
          noTelp={transferUser.noTelp}
          balance={user.data.balance}
          image={transferUser.image}
          handleText={handleText}
          handleSubmit={continueAmount}
          handleBack={backAmount}
          styleUnderValue={
            transfer.amount === null
              ? true
              : transfer.amount < 10000
              ? false
              : true
          }
          underValue={
            transfer.amount === null
              ? false
              : transfer.amount < 10000
              ? true
              : false
          }
        />
      ) : comp.isConfirmation ? (
        <ConfirmationTransfer
          name={`${transferUser.firstName} ${transferUser.lastName}`}
          noTelp={transferUser.noTelp}
          amount={transfer.amount}
          balance={user.data.balance}
          date={transfer.date}
          image={transferUser.image}
          notes={transfer.notes}
          handleSubmit={handleSubmit}
          handleBack={backTransfer}
        />
      ) : (
        <Status
          name={`${transferUser.firstName} ${transferUser.lastName}`}
          noTelp={transferUser.noTelp}
          amount={transfer.amount}
          balance={user.data.balance}
          date={transfer.date}
          image={transferUser.image}
          notes={transfer.notes}
          isSuccess={isSuccess}
          msg={msg}
          handleTryAgain={handleSubmit}
          handlePdf={handlePdf}
        />
      )}

      {/* MODAL */}
      <ModalComponent
        show={show}
        onHide={handleClose}
        isPin={true}
        // PIN
        handleTextPin={handleTextPin}
        handleSubmitPin={handleSubmitPin}
      />
    </MainLayout>
  );
}
