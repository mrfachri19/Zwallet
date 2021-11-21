// import Link from "next/link";
import React from "react";
import Image from "next/image";
import device from "/public/assets/device.png";

export default function Auth() {
  const deviceImage = {
    width: "30rem",
    marginLeft: "100px",
    paddingTop: "100px",
  };

  return (
    <>
      <div className="jumbotron">
        <div style={deviceImage}>
          <Image src={device} alt="device" className="img" />
        </div>
        <h1>Zwallet</h1>
        <h2>App that Covering Banking Needs</h2>
        <p>
          Zwallet is an application that focussing in banking needs for all
          users <br />
          in the world. Always updated and always following world trends.
          <br /> 5000+ users registered in Zwallet everyday with worldwide
          <br />
          users coverage.
        </p>
      </div>
    </>
  );
}
