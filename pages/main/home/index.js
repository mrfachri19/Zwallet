import React, { useState, useEffect } from "react";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import MainLayout from "components/layouts/MainLayout";
import { Balance, Dashboard, TransactionHistory } from "components/homepage";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "stores/actions/user";

// SERVER SIDE RENDERING
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
  const history = await axios
    .get(`/transaction/history?page=1&limit=4&filter=WEEK`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      let temp = res.data.data.reverse();
      return temp;
    })
    .catch((err) => {
      console.log(err.response);
      return [];
    });

  const dashboard = await axios
    .get(`/dashboard/${dataCookie.id}`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response);
      return [];
    });

  return {
    props: {
      data: { dataCookie, dashboard, history },
    },
  };
}

function Home(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState(props.data);

  let labelChart = [];
  data.dashboard.listIncome?.map((item) => {
    labelChart.push(item.day);
  });

  let dataChart = [];
  data.dashboard.listIncome?.map((item) => {
    dataChart.push(item.total);
  });

  let dataChartExpense = [];
  data.dashboard.listExpense?.map((item) => {
    dataChartExpense.push(item.total);
  });

  // DASHBOARD
  const [dataDashboard, setDataDashboard] = useState({
    labels: labelChart,
    datasets: [
      {
        label: "# of Income",
        data: dataChart,
        fill: false,
        backgroundColor: "#1EC15F",
        borderColor: "#1EC15F",
        yAxisID: "y-axis-1",
      },
      {
        label: "# of Expense",
        data: dataChartExpense,
        fill: false,
        backgroundColor: "#FF5B37",
        borderColor: "#FF5B37",
        yAxisID: "y-axis-2",
      },
    ],
  });

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          ticks: {
            beginAtZero: true,
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnArea: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    dispatch(getUserProfile(user.data.id));
  }, []);

  return (
    <MainLayout
      title="Home"
      firstName={user.data.firstName}
      lastName={user.data.lastName}
      noTelp={user.data.noTelp}
      image={user.data.image}
    >
      <Balance balance={user.data.balance} noTelp={user.data.noTelp} />
      <div className="row">
        <div className="col-12 col-md-7">
          <Dashboard
            income={data.dashboard.totalIncome}
            expense={data.dashboard.totalExpense}
            // data
            data={dataDashboard}
            options={options}
          />
        </div>
        <div className="col-12 col-md-5">
          <TransactionHistory data={data.history} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
