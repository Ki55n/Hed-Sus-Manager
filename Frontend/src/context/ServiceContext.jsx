import { createContext, useEffect, useState, useContext } from "react";
import { Web3Storage } from "web3.storage";
import { ethers } from "ethers";
import { AuthContext } from "./AuthContext";
import { ServiceStatuses, Categories, contractAddress } from "../utils/constants";
import contractABI from "../utils/contractABI.json";
import { PlatformContext } from "./PlatformContext";

export const ServiceContext = createContext();
const shouldPollResponse = true;

const { ethereum } = window;

export const ServiceProvider = ({ children }) => {
  const [formData, setformData] = useState({
    category: Categories[0],
    image: "",
    title: "",
    description: "",
    price: 0,
    github: "",
    demo: "",
    website: ""
  });
  const [services, setServices] = useState([]);
  const [service, setService] = useState([]);
  const [ipfsUrl, setIpfsUrl] = useState(null);
  // const { ethereum } = useContext(AuthContext);
  const { notify, setIsLoading } = useContext(PlatformContext);

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

  const onUploadHandler = async (event) => {
    // const client = new Web3Storage({
    //   token: import.meta.env.VITE_WEB3_STORAGE_TOKEN,
    // });
    // event.preventDefault();
    // const form = event.target;
    // const { files } = form[0];
    // if (!files || files.length === 0) {
    //   return alert("No files selected");
    // }
    // setIsLoading(true);
    // const rootCid = await client.put(files);
    // const info = await client.status(rootCid);
    // // const res = await client.get(rootCid);
    // const url = `https://${info.cid}.ipfs.w3s.link/${files[0].name}`;
    const url = 'https://6497d8eedd209752f5da64c7--hed-sus-manager.netlify.app/'
    form.reset();
    setIpfsUrl(url);
    setIsLoading(false);
    notify("File successfully uploaded to IPFS.");
  };

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  function formatService(t) {
    return {
      id: t.projectId.toNumber(),
      image: "https://th.bing.com/th/id/R.99a3fe03492d90ed62a7ff17ab6df500?rik=krfqRY1FLrH3dQ&pid=ImgRaw&r=0",
      category: t.Category,
      title: t.title,
      description: t.description,
      author: t.owner,
      price: ethers.utils.formatEther(t.amountReceived),
      target: t.target_amount.toNumber(),
      github: t.github_link,
    };
  }

  const getAllServices = async () => {
    if (ethereum) {
      try {
        setIsLoading(true);
        const contract = await createContract();
        const availableServices = await contract.getProjects();
        console.log(availableServices)
        const structuredServices = availableServices.map((item) => formatService(item));
        console.log(structuredServices);
        setServices(structuredServices);
        console.log(services)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        // alert(error.message);
        setIsLoading(false);
      }
    } else {
      console.log("An error occured");
    }
  };

  const getService = async (id) => {
    if (ethereum) {
      try {
        setIsLoading(true);
        const contract = await createContract();
        const fetchedService = await contract.getProject(id);
        console.log(fetchedService)
        setService(formatService(fetchedService));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        // alert(error.message);
        setIsLoading(false);
      }
    } else {
      console.log("An error occured");
    }
  };

  const addService = async () => {
    if (ethereum) {
      try {
        const { title, description, price, category, github, demo, website} = formData;
        const image = ipfsUrl || "https://th.bing.com/th/id/R.99a3fe03492d90ed62a7ff17ab6df500?rik=krfqRY1FLrH3dQ&pid=ImgRaw&r=0";
        setIsLoading(true);
        const contract = await createContract();
        const transaction = await contract.createProject(image, title, github, demo, website, price, description, 1, "explorerName", {
          gasLimit: 1_000_000,
         });
        console.log(`Success - ${transaction}`);
        setIsLoading(false);
        window.location.replace("/services");
        notify("New service added successfully.");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      console.log("No Tron object");
    }
  };

  const updateService = async () => {
    if (ethereum) {
      try {
        console.log(`Success - ${transaction}`);
        setIsLoading(false);
        window.location.reload();
        notify("Service updated successfully.");
      } catch (error) {
        console.log(error);
        // alert(
        //   "Oops! Something went wrong. See the browser console for details."
        // );
        setIsLoading(false);
      }
    } else {
      console.log("No Tron object");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllServices();
    };
    if (ethereum) {
      fetchData().catch(console.error);
    }
  }, [ethereum]);

  // Event listeners

  const onServiceAdded = async () => {
    const contract = await createContract();
    if (ethereum) {
      await contract.ServiceAdded().watch((err, eventResult) => {
        if (err) {
          return console.error('Error with "method" event:', err);
        }
        if (eventResult) {
          setServices((prevState) => [
            ...prevState,
            formatService(eventResult.result.service),
          ]);
        }
      });
    }
  };

  useEffect(() => {
    onServiceAdded().catch(console.error);
  }, [ethereum]);

  const onServiceUpdated = async () => {
    if (ethereum) {
      const contract = await createContract();
      await contract.ServiceUpdated().watch((err, eventResult) => {
        if (err) {
          return console.error('Error with "method" event:', err);
        }
        if (eventResult) {
          setService(formatService(eventResult.result.service));
        }
      });
    }
  };

  useEffect(() => {
    onServiceUpdated().catch(console.error);
  }, [ethereum]);

  // const onServiceDeleted = async () => {
  //   if (ethereum) {
  //     const contract = await createContract();
  //     await contract.ServiceDeleted().watch((err, eventResult) => {
  //       if (err) {
  //         return console.error('Error with "method" event:', err);
  //       }
  //       if (eventResult) {
  //         console.log("eventResult:", eventResult);
  //         const id = parseInt(eventResult.result._id, 10);
  //         setServices((current) => current.filter((p) => p.id !== id));
  //       }
  //     });
  //   }
  // };

  // useEffect(() => {
  //   onServiceDeleted().catch(console.error);
  // }, [ethereum]);

  return (
    <ServiceContext.Provider
      value={{
        services,
        service,
        getAllServices,
        getService,
        addService,
        updateService,
        handleChange,
        formData,
        onUploadHandler,
        ipfsUrl,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
