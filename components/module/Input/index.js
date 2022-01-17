/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";

export default function Input({
  name,
  type,
  placeholder,
  image,
  handleChange,
  isPassword,
  top,
  bottom,
  width,
  widthWrap,
  value,
}) {
  const [typePassword, setTypePassword] = useState(true);

  const handlePassword = () => {
    setTypePassword(!typePassword);
  };

  return (
    <div
      className="input__wrap"
      style={{ marginTop: top, marginBottom: bottom, width: widthWrap }}
    >
      {isPassword && typePassword ? (
        <>
          <img src={image} alt="icon" className="input__icon" />
          <input
            className="input__item nunito-400"
            type="password"
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            style={{ width: width }}
            value={value}
          />
          <img
            src="../assets/images/auth/eye-crossed.png"
            className="input__icon--password"
            onClick={handlePassword}
            style={{ cursor: "pointer" }}
          />
        </>
      ) : isPassword && !typePassword ? (
        <>
          <img src={image} alt="icon" className="input__icon" />
          <input
            className="input__item nunito-400"
            type="text"
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            style={{ width: width }}
            value={value}
          />
          <img
            src="../assets/images/auth/eye.png"
            className="input__icon--password"
            onClick={handlePassword}
            style={{ cursor: "pointer" }}
          />
        </>
      ) : (
        <>
          <img src={image} alt="icon" className="input__icon" />
          <input
            className="input__item nunito-400"
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            style={{ width: width }}
            value={value}
          />
        </>
      )}
    </div>
  );
}
