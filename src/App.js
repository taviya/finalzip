import "./App.css";
import AirdropBox from "./airdropBox";
import { Web3ReactProvider } from "@web3-react/core";
import { POLLING_INTERVAL } from "./hooks/connectors";
import { Web3Provider } from "@ethersproject/providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Web3ReactProvider getLibrary={getLibrary}>
        <AirdropBox />
      </Web3ReactProvider>
    </div>
  );
}

export default App;

// TAJIRI BOUNTY OFFER

// Total Bounty Offer: 50,000,000 $TAJI

//  Offer Start 1st of April - till 15th April, 2022

// + Follow all Social Media and Claim 10,000$TAJI Reward

// + Invite and Earn 2,500$TAJI when your invite claim bounty reward.

// Telegram:

// https://t.me/joinchat/zCum9k-K_JMxOTA0

// Twitter

// https://twitter.com/tajiriglobal

// Facebook

// https://facebook.com/Tajiriglobal

// Instagram

// https://www.instagram.com/tajiriglobal/

// YouTube

// https://youtube.com/channel/UCtoRKX7aFvsDlBbRuZgTa

// 1st apr - 15 apr
