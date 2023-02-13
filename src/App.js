import { ethers } from "ethers";
import buyMeACoffeeABI from "./contractABI/BuyMeACoffee.json";
import "./App.css";
import { useEffect, useState } from "react";
import Buy from "./components/Buy";
import FundersList from "./components/FundersList";
import { CircularProgress, Typography } from "@mui/material";
import Logo from "./components/Logo";
import AvatarComponent from "./components/Avatar";
import SnackBar from "./components/SnackBar";

function App() {
  // State to store provider, signer, and contract
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  // State to store the funders of the contract
  const [funders, setFunders] = useState(null);

  // State to store the connected Ethereum account
  const [account, setAccount] = useState("None");

  // State to store the status of the snackbar
  const [open, setOPen] = useState(false);

  // Function to get the funders list from the smart contract
  const getFunders = async () => {
    try {
      // Call the getFunders() method of the contract
      const fundersList = await state.contract.getFunders();
      let filteredFunderList = [];
      // Iterate over the funders list and create a new object with desired properties
      fundersList.forEach((funder) => {
        filteredFunderList.push({
          name: funder.name,
          message: funder.message,
          funderAddress: funder.funderAddress,
          // Convert the timestamp to a readable date
          timestamp: new Date(funder.timestamp * 1000).toLocaleString(),
        });
      });

      // Set the funders list in the state
      setFunders(filteredFunderList);
    } catch (error) {}
  };

  // Function to handle changes in the Ethereum network or account
  const onChangeInWallet = () => {
    window.ethereum.on("chainChanged", () => {
      // Reload the page when the Ethereum chain changes
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", () => {
      // Reload the page when the Ethereum account changes
      window.location.reload();
    });
  };

  // Use effect hook to connect to the Ethereum network and the smart contract
  useEffect(() => {
    const connectWallet = async () => {
      // Contract address and ABI
      const contractAddress = "0x99D8F8760a89bc8970d8fecddA48D0Fd707e4197";
      const contractABI = buyMeACoffeeABI.abi;
      try {
        // Check if the Metamask is installed
        const ethereum = window.ethereum;
        if (ethereum) {
          onChangeInWallet();
          // Request the Ethereum account
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          // Get the provider instance
          const provider = new ethers.providers.Web3Provider(ethereum);
          console.log("the provider is --------->", ethereum);
          // Get the signer instance
          const signer = await provider.getSigner();
          // Create an instance of the contract
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          // Set the current Ethereum account
          setAccount(account);
          // Set the provider, signer and contract instances in state
          setState({ provider, signer, contract });
        } else {
          // If Metamask is not installed, show a warning message
          setOPen(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    connectWallet();
  }, []);

  useEffect(() => {
    // Get the list of funders when state changes
    getFunders();
  }, [state]);

  return (
    <div className="App">
      {/* Display the main UI components only if contract and funders instances are available */}
      {state.contract && funders != null ? (
        <>
          <Logo />
          {/* Display the current Ethereum account */}
          <Typography>{"Connected Account : " + account}</Typography>
          <Buy state={state} getFunders={getFunders} />
          <FundersList funders={funders}></FundersList>
          <AvatarComponent />
        </>
      ) : (
        <CircularProgress />
      )}
      {/* Display the warning message for missing Metamask */}
      <SnackBar
        severity="warning"
        message="Please Install Metamask"
        open={open}
        onClose={() => {
          setOPen(false);
        }}
      />
    </div>
  );
}

export default App;
