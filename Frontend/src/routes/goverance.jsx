import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ServiceCard } from "../components";
import { ServiceContext } from "../context/ServiceContext";
import { AuthContext } from "../context/AuthContext";

const Governance = () => {
  return (
    <>
      <div className="flex w-full justify-center items-start 2xl:px-20 gradient-bg-welcome min-h-screen">
      <h3 className="text-white text-2xl text-center my-2">
              Coming Soon...
            </h3>
      </div>
      <Outlet />
    </>
  );
};

export default Governance;
