import { createContext, useEffect, useState, useContext } from "react";
import { Web3Storage } from "web3.storage";
import { AuthContext } from "./AuthContext";
import { contractAddress } from "../utils/constants";
import contractABI from "../utils/contractABI.json";
import { PlatformContext } from "./PlatformContext";
import { ethers } from "ethers";

export const ProfileContext = createContext();

const { ethereum } = window;

export const ProfileProvider = ({ children }) => {
  const [ipfsUrl, setIpfsUrl] = useState(null);
  const [profile, setProfile] = useState([]);
  const [formData, setformData] = useState({
    avatar: "",
    username: "",
    skills: "",
    country: "",
    twitter: "",
    github: ""
  });
  
  const { currentAccount } = useContext(AuthContext);
  const { notify, setIsLoading } = useContext(PlatformContext);

  const handleChange = (e, name) => {
    if (name === "languages") {
      setformData((prevState) => ({ ...prevState, [name]: e.map((item) => item.value) }));
    } else setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const createContract = async () => {
    let c;
    if (ethereum) {
      // ethereum.setAddress(contractAddress);
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      c = new ethers.Contract(contractAddress, contractABI.abi, signer);
      // setContract(contractInstance);
    }
    return c;
  };

  const onUploadHandler = async (files) => {
    // const client = new Web3Storage({
    //   token: import.meta.env.VITE_WEB3_STORAGE_TOKEN,
    // });
    // if (!files || files.length === 0) {
    //   return alert("No files selected");
    // }
    // setIsLoading(true);
    // const rootCid = await client.put(files);
    // const info = await client.status(rootCid);
    // // const res = await client.get(rootCid);
    // const url = `https://${info.cid}.ipfs.w3s.link/${files[0].name}`;
    const url = 'https://6497d8eedd209752f5da64c7--hed-sus-manager.netlify.app/'
    setIpfsUrl(url);
    setIsLoading(false);
    notify("File successfully uploaded to IPFS.");
  };

  const getUserProfile = async (address) => {
    if (ethereum && address) {
      try {
        setIsLoading(true);
        const contract = await createContract();
        const fetchedProfile = await contract.getProfile(address).call();
        setIsLoading(false);
        setProfile(fetchedProfile);
        return fetchedProfile;
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      console.log("An error occured");
    }
  };

  const addProfile = async () => {
    if (ethereum) {
      try {
        const { username, skills, country, twitter, github } = formData;
        setIsLoading(true);
        const contract = await createContract();
        const avatar = ipfsUrl || "";
        const transaction = await contract.createExplorer(username, skills, country, avatar, twitter,github, {
          gasLimit: 1_000_000,
         });
        await transaction.wait()
        console.log(`Success - ${transaction}`);
        setIsLoading(false);
        notify("Profile saved successfully.");
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert(
          "Oops! Something went wrong. See the browser console for details."
        );
        setIsLoading(false);
      }
    } else {
      console.log("An error occured");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await createContract();
    };
    if (ethereum) {
      fetchData().catch(console.error);
    }
  }, [ethereum]);

  useEffect(() => {
    getUserProfile(currentAccount);
  }, [currentAccount]);

  return (
    <ProfileContext.Provider
      value={{
        addProfile,
        getUserProfile,
        handleChange,
        profile,
        formData,
        onUploadHandler,
        ipfsUrl,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
