/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Line } from "react-chartjs-2";
import { formatRp } from "utils/formatRp";

export default function Dashboard({ income, expense, data, options }) {
  return (
    <div
      style={{
        padding: "30px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRadius: "25px",
        marginTop: "20px",
        marginBottom: "40px",
        background: "#ffffff",
      }}
    >
      <div
        className="d-flex justify-content-between"
        style={{ marginBottom: "50px" }}
      >
        <div>
          <img
            src="../assets/images/transaction/arrow-green.png"
            alt="icon"
            width="28px"
          />
          <p className="nunito-400 font-secondary my-2">Income</p>
          <h5 className="nunito-700">{formatRp(income)}</h5>
        </div>

        <div>
          <img
            src="../assets/images/transaction/arrow-red.png"
            alt="icon"
            width="28px"
          />
          <p className="nunito-400 font-secondary my-2">Expense</p>
          <h5 className="nunito-700">{formatRp(expense)}</h5>
        </div>
      </div>

      <div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
