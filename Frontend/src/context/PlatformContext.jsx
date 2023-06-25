import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const PlatformContext = createContext();


const MessageDisplay = ({ message, hash }) => (
  <div className="w-full">
    <p>{message}</p>
    {hash && (
      <a
        className="text-[#6366f1]"
        href={`https://hashscan.io/testnet/transaction/${hash}`}
        target="_blank"
        rel="noreferrer"
      >
        Check in Explorer
      </a>
    )}
  </div>
);

export const PlatformProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [tasks, setTasks] = useState("");
  // const [fetchedProfile, setFetchedProfile] = useState([]);
  const [fee, setFee] = useState(0);
  const [fetchedRating, setFetchedRating] = useState(0);
  // const [contract, setContract] = useState(undefined);
  const { currentAccount } = useContext(AuthContext);

  const notify = (message, hash) => toast.success(<MessageDisplay message={message} hash={hash} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  

  useEffect(() => {
  }, []);

  return (
    <PlatformContext.Provider
      value={{
        MessageDisplay,
        notify,
        currentAccount,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};
