/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from "react";

import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { client } from "../client";

import pinnerVideo from "../assets/pinner.mp4";
import logo from "../assets/logowhite.png";

const Login = () => {
  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    localStorage.setItem(
      "user",
      JSON.stringify(jwtDecode(response.credential))
    );
    const { name, sub, picture } = jwtDecode(response.credential);

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInBtn"), {
      theme: "outline",
      shape: "circle",
    });
  }, []);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative h-full w-full">
        <video
          src={pinnerVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="h-full w-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="Pinner Logo" width="130px" />
          </div>
          <div className="shadow-2xl">
            <div
              id="signInBtn"
              role="button"
              tabIndex="0"
              onClick={handleCallbackResponse}
              className="w-100 h-30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
