import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PlatformContext } from "../context/PlatformContext";
import { Welcome, Services, Loader, Connect, NoWallet, Hero } from "../components";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { isLoading } = useContext(PlatformContext);
  const { currentAccount } = useContext(AuthContext);
  const { ethereum } = window;

  if (!ethereum) {
    return <NoWallet />;
  }
  return (
    <div className="flex flex-col w-full justify-start items-center 2xl:px-20 gradient-bg-welcome min-h-screen">
      {!currentAccount ? (
        <Connect />
      ) : (
        <div className="flex flex-col items-center w-full">
          <Hero/>
          <Welcome />
          <div className="flex flex-col w-9/12 py-12 px-4">
            <div className="flex flex-row justify-between text-3xl">
              <span className="text-left text-white">Recent Projects</span>
              <Link to="/services" className="text-blue-400 text-xl">
                <i>View all</i>
              </Link>
            </div>
            <div>
              {isLoading ? <Loader /> : <Services />}
            </div>
          </div>
          <div className="mt-10 text-white text-center items-center">
          <p className="text-2xl">Let us know what to improve on.</p>
      <a
        href="https://airtable.com/shrNtFxFBO5NYaMc4"
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 text-2xl"
      >
        <i>Feedback form</i>
      </a>
          </div>
        </div>
      )}
    </div>
  );
}
