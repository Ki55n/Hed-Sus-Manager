import { Fragment, useEffect, useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { PlatformContext } from "../context/PlatformContext";
import { ProfileContext } from "../context/ProfileContext";
import { shortenAddress } from "../utils/shortenAddress";
import AutoAvatar from "./AutoAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Wallet() {
  const { currentAccount, balance } = useContext(AuthContext);
  const [bal, setBal] = useState(0);
  const { fetchedRating } = useContext(PlatformContext);
  const { profile } = useContext(ProfileContext);

  const { ethereum, location, localStorage } = window;
  const getBalance = async () => {
    setBal(balance);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("currentAccount");
    location.replace("/");
  };

  useEffect(() => {
    if (ethereum) {
      getBalance();
    }
  }, []);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 font-medium text-white bg-transparent rounded-md shadow-sm focus:outline-none">
          {profile.avatar
            ?
              <img alt="Avatar" className="w-[2.5rem] mr-1 rounded-full border" src={profile.avatar} />
            :
              <AutoAvatar userId={currentAccount} size={36} />}
          {profile.username ? profile.username : shortenAddress(currentAccount)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right text-white bg-transparent white-glassmorphism rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active
                      ? "bg-[#2546bd] text-white cursor-not-allowed"
                      : "text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Balance: {bal} HBAR
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/profile"
                  className={classNames(
                    active
                      ? "bg-blue-700 text-white cursor-pointer"
                      : "text-white cursor-pointer",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  My Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/myservices"
                  className={classNames(
                    active
                      ? "bg-blue-700 text-white cursor-pointer"
                      : "text-white cursor-pointer",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  My Services
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? "bg-[#2546bd] text-white" : "text-white",
                    "block w-full text-left px-4 py-2 text-sm"
                  )}
                  onClick={handleDisconnect}
                >
                  Disconnect Wallet
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
