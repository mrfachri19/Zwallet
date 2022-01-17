/* eslint-disable @next/next/no-img-element */
import React from "react";
import Pagination from "react-paginate";

function SearchReceiver({
  data,
  onChange,
  handleClick,
  countPagination,
  handlePagination,
}) {
  return (
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
      <div>
        <h5 className="nunito-700">Search Receiver</h5>

        <div style={{ position: "relative" }}>
          <img
            src="../assets/images/transaction/search.png"
            alt="icon"
            width="24px"
            style={{ position: "absolute", left: "20px", top: "40px" }}
          />
          <input
            className="nunito-400 font-secondary"
            type="text"
            name="search"
            onChange={onChange}
            placeholder="Search receiver here"
            style={{
              marginTop: "25px",
              marginBottom: "30px",
              width: "100%",
              padding: "16px 54px",
              borderRadius: "12px",
              background: "rgba(58, 61, 66, 0.1)",
              outline: "none",
              border: "none",
            }}
          />
        </div>

        <div className="d-flex flex-column gap-3">
          {data.length > 0 ? (
            <>
              {data.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className="d-flex"
                  style={{
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                    borderRadius: "10px",
                    padding: "20px",
                    cursor: "pointer",
                  }}
                >
                  <div className="d-flex">
                    <img
                      src={
                        item.image
                          ? `${process.env.URL_BACKEND}uploads/${item.image}`
                          : "../assets/images/transaction/def.jpeg"
                      }
                      alt="porfile"
                      width="56px"
                    />
                    <div className="ms-3">
                      <h5 className="nunito-600">
                        {item.firstName} {item.lastName}
                      </h5>
                      <span className="nunito-400 font-thrid">
                        {item.noTelp || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <h1 className="text-center font-secondary nunito-700">no data</h1>
            </>
          )}
        </div>

        <div className="mt-5">
          <Pagination
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={countPagination}
            onPageChange={handlePagination}
            containerClassName={"pagination"}
            disabledClassName={"pagination__disabled"}
            activeClassName={"pagination__active"}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchReceiver;
