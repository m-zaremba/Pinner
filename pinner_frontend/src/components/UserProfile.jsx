import React, { useState, useEffect } from "react";

import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomUnsplashImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeButtonStyles =
  "bg-red-500 m-2 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveButtonStyles =
  "bg-primary m-2 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created"); // states: created/saved
  const [activeButton, setActiveButton] = useState("Created");

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => setPins(data));
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => setPins(data));
    }
  }, [userId, text]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomUnsplashImage}
              alt="banner-pic"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
            />
            <img
              src={user.image}
              alt="user-pic"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <button
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={logout}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(event) => {
                setText(event.target.textContent);
                setActiveButton("Created");
              }}
              className={`${
                activeButton === "Created"
                  ? activeButtonStyles
                  : notActiveButtonStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(event) => {
                setText(event.target.textContent);
                setActiveButton("Saved");
              }}
              className={`${
                activeButton === "Saved"
                  ? activeButtonStyles
                  : notActiveButtonStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Pins found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
