import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";
import { shortenAddress } from "../utils/shortenAddress";

export default function Welcome() {
  const { currentAccount } = useContext(AuthContext);
  const { profile } = useContext(ProfileContext);
  return (
    <div className="mt-10 text-white text-center items-center">
      <p className="text-2xl">Welcome {profile.username ? profile.username : shortenAddress(currentAccount)}!</p>
      {!profile.username && (
        <>
          <p className="rext-xl">Complete your Profile to increase your chance of getting Fund. </p>
          <Link to="/profile">
            <button
              type="button"
              className="my-5 bg-[#2952e3] pt-1 pb-1 pl-3 pr-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white font-semibold">
                Create Profile
              </p>
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
