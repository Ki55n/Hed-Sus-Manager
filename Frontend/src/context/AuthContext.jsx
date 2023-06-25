import { createContext, useState, useEffect } from "react";
import { contractAddress } from "../utils/constants";
import { ethers } from "ethers";

export const AuthContext = createContext();

const { ethereum, localStorage, location } = window;
let bala;
export const AuthProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const connectWallet = async () => {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      signer.getAddress().then(setCurrentAccount);
      bala = await signer.getBalance(currentAccount)
      console.log(currentAccount);
      setBalance(ethers.utils.formatEther(bala))
      console.log(ethers.utils.formatEther(bala))
      window.ethereum.on("accountsChanged", changeConnectedAccount);

      setCurrentAccount(account);
      localStorage.setItem("currentAccount", account);
      console.log(currentAccount);
      console.log(balance);
    }
  };

  const changeConnectedAccount = async (newAddress) => {
    try {
      newAddress = Array.isArray(newAddress) ? newAddress[0] : newAddress;
      setCurrentAccount(newAddress);
    } catch (err) {
      console.error(err);
    }
  };
  // if (ethereum) {
  //   window.addEventListener("message", (e) => {
  //     if (e.data.message && e.data.message.action === "setAccount") {
  //       // console.log("setAccount event", e.data.message);
  //       // console.log("current address:", e.data.message.data.address);
  //       setCurrentAccount(e.data.message.data.address);
  //       localStorage.setItem("currentAccount", currentAccount);
  //     }
  //     if (e.data.message && e.data.message.action === "setNode") {
  //       // console.log("setNode event", e.data.message);
  //       if (e.data.message.data.node.fullNode !== "https://api.nileex.io") {
  //         alert("Please switch to Nile testnet!");
  //       }

  //       // Tronlink chrome v3.22.1 & Tronlink APP v4.3.4 started to support
  //       if (e.data.message && e.data.message.action === "connect") {
  //         // console.log("connect event", e.data.message.isTronLink);
  //       }

  //       // Tronlink chrome v3.22.1 & Tronlink APP v4.3.4 started to support
  //       if (e.data.message && e.data.message.action === "disconnect") {
  //         // console.log("disconnect event", e.data.message.isTronLink);
  //         setCurrentAccount("");
  //         localStorage.removeItem("currentAccount");
  //         location.replace("/");
  //       }

  //       // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
  //       if (e.data.message && e.data.message.action === "accountsChanged") {
  //         // console.log("accountsChanged event", e.data.message);
  //         // console.log("current address:", e.data.message.data.address);
  //         setCurrentAccount("");
  //         localStorage.removeItem("currentAccount");
  //         location.replace("/");
  //       }

  //       // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
  //       if (e.data.message && e.data.message.action === "connectWeb") {
  //         // console.log("connectWeb event", e.data.message);
  //         // console.log("current address:", e.data.message.data.address);
  //         setCurrentAccount(e.data.message.data.address);
  //         localStorage.setItem("currentAccount", currentAccount);
  //       }

  //       // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
  //       if (e.data.message && e.data.message.action === "accountsChanged") {
  //         // console.log("accountsChanged event", e.data.message);
  //         setCurrentAccount("");
  //         localStorage.removeItem("currentAccount");
  //         location.replace("/");
  //       }

  //       // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
  //       if (e.data.message && e.data.message.action === "acceptWeb") {
  //         // console.log("acceptWeb event", e.data.message);
  //       }
  //       // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
  //       if (e.data.message && e.data.message.action === "disconnectWeb") {
  //         // console.log("disconnectWeb event", e.data.message);
  //         setCurrentAccount("");
  //         localStorage.removeItem("currentAccount");
  //         location.replace("/");
  //       }

  //       // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
  //       if (e.data.message && e.data.message.action === "rejectWeb") {
  //         // console.log("rejectWeb event", e.data.message);
  //         setCurrentAccount("");
  //         localStorage.removeItem("currentAccount");
  //         location.replace("/");
  //       }
  //     }
  //   });
  //}

  useEffect(() => {
    let isMounted = true;
    if (window.ethereum) {
      if (localStorage.getItem("currentAccount")) {
        setCurrentAccount(localStorage.getItem("currentAccount"));
      } else {
      //   const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      //   provider.send("eth_requestAccounts", []);
      // const signer = provider.getSigner();
      // signer.getAddress().then(setCurrentAccount)
      // signer.getBalance(currentAccount).then((bala) => setBalance(ethers.utils.formatEther(bala)))
      connectWallet()
          .catch((err) => {
            if (err.code === 4001) {
              console.log("Please connect to Metamask.");
            } else {
              console.error(err);
            }
          });
      }
    }
    return () => { isMounted = false };
  }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   setBalance(ethers.utils.formatEther(bala))
  //   console.log("loading", bala);
  //   return () => { isMounted = false };
  // }, [bala]);

  return (
    <AuthContext.Provider
      value={{
        connectWallet,
        currentAccount,
        balance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// topic id - 0.0.14979324
