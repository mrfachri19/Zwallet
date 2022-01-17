/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { formatRp } from "utils/formatRp";

function TransactionHistory({ data }) {
  const router = useRouter();

  const handleHistory = () => {
    router.push("/history");
  };

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
      <div>
        <div className="d-flex justify-content-between mb-2">
          <h5 className="nunito-700">Transaction History</h5>
          <span
            className="nunito-400 font-primary"
            style={{ cursor: "pointer" }}
            onClick={handleHistory}
          >
            See all
          </span>
        </div>

        <div className="d-flex flex-column">
          {data?.length > 0 ? (
            <>
              {data.map((item) => (
                <div key={item.id}>
                  {/* {item.status === "success" ? ( */}
                  <div className="d-flex justify-content-between mt-4">
                    <div className="d-flex">
                      <img
                        src={
                          item.image
                            ? `${process.env.URL_BACKEND}uploads/${item.image}`
                            : "../assets/images/transaction/def.jpeg"
                        }
                        alt="porfile"
                        width="56px"
                        height="56px"
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                      />
                      <div className="ms-3">
                        <h5 className="nunito-600">
                          {item.firstName} {item.lastName}
                        </h5>
                        <span className="nunito-400 font-thrid">
                          {item.type}
                        </span>
                      </div>
                    </div>
                    {item.type === "send" ? (
                      <div
                        className="align-self-center nunito-700"
                        style={{ color: "#FF5B37" }}
                      >
                        -{formatRp(item.amount)}
                      </div>
                    ) : item.type === "topup" ? (
                      <div
                        className="align-self-center nunito-700"
                        style={{ color: "#FF5B37" }}
                      >
                        +{formatRp(item.amount)}
                      </div>
                    ) : (
                      <div
                        className="align-self-center nunito-700"
                        style={{ color: "#1EC15F" }}
                      >
                        +{formatRp(item.amount)}
                      </div>
                    )}
                  </div>
                  {/* ) : (
                    <></>
                  )} */}
                </div>
              ))}
            </>
          ) : (
            <>
              <h1 className="text-center font-secondary nunito-700">
                no transaction
              </h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
