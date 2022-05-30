import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./containers/Home";

const App = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="/*" element={<Home />} />
  </Routes>
);

export default App;
