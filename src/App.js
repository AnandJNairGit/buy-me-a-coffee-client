import { ethers } from "ethers";
import buyMeACoffeeABI from "./contractABI/BuyMeACoffee.json";
import "./App.css";
import { useEffect, useState } from "react";
import Buy from "./components/Buy";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x99D8F8760a89bc8970d8fecddA48D0Fd707e4197";
      const contractABI = buyMeACoffeeABI.abi;
      try {
        const ethereum = window.ethereum;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("the account is-------------->", account);
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = await provider.getSigner();
          console.log("signer--------->", signer);
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setState({ provider, signer, contract });
        }
      } catch (error) {}
    };

    connectWallet();
  }, []);

  return <div className="App">
    <Buy state={state} />
  </div>;
}

// 0x99D8F8760a89bc8970d8fecddA48D0Fd707e4197

export default App;
