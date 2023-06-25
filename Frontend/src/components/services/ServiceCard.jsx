import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shortenAddress } from "../../utils/shortenAddress";
import AutoAvatar from "../AutoAvatar";
import { contractAddress } from "../../utils/constants";
import contractABI from "../../utils/contractABI.json";

const ServiceCard = ({
  id,
  image,
  title,
  createdAt,
  author,
  price,
  target,
  category,
}) => {
  const [profile, setProfile] = useState(null);
  const { ethereum } = window;

  const getProfile = async (address) => {
    if (ethereum && address) {
      try {
        // const contract = await ethereum.contract(contractABI, contractAddress);
        // const r = await contract.getProfile(address).call();
        // setProfile(r);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    } else {
      console.log("An error occured!!!");
    }
  };
  useEffect(() => {
    if (ethereum) {
      getProfile(author);
    }
  }, []);

  return (
    <Link to={`/services/${id}`}>
      <div className="w-[20rem] h-[30rem] flex flex-col justify-between text-white white-glassmorphism p-3 m-2 cursor-pointer transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-104 duration-300">
        <img alt="Service" className="max-h-[12rem] self-center rounded-md" src={image} />
        <div className="flex flex-col w-full">
          <div className="mt-2 flex flex-row justify-between">
            <p className="text-xl truncate ...">{title}</p>
          </div>
          <div className="flex flex-row mt-2 mb-2 items-center">
            {profile && profile.avatar ? (
              <img alt="Avatar" className="w-[2.5rem] mr-1 rounded-full border" src={profile.avatar} />
            ) : (
              <AutoAvatar userId={author} size={36} />
            )}
            {profile && profile.username ? <span>{profile.username} ({shortenAddress(author)})</span> : shortenAddress(author)}
          </div>
          {createdAt}
          <p >Target Amount {target} TRX</p>
        <p>Amount Received {price} TRX</p>
        </div>
        </div>
    </Link>
  );
};

export default ServiceCard;
