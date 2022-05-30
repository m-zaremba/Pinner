import React from "react";
import { urlFor } from "../client";

const Pin = ({ pin: { image } }) => (
  <div>
    <img
      src={urlFor(image).width(250).url()}
      alt="user-pin"
      className="rounded-lg w-full"
    />
  </div>
);

export default Pin;
