import { React } from "react";
import ConnectWalletButton from "./ConnectWalletButton";

function Connect() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-3 text-xl m-6">
      <p className="text-center text-white">Please connect your wallet to continue</p>
      <ConnectWalletButton />
    </div>
  );
}

export default Connect;
