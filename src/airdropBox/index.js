import React, { useEffect, useState } from "react";
import "./airdropBox.css";
import "./custStyle.css";
import TelegramIcon from "@material-ui/icons/Telegram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import logo from "../assets/log.jpg";
import DiscordIcon from "../assets/DiscordIcon";
import ConnectButton from "../helper/ConnectButton";
import { useWeb3React } from "@web3-react/core";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { AddressZero } from "@ethersproject/constants";
import { Contract } from '@ethersproject/contracts';
import { presale_address, presale_abi } from '../hooks/constant';
import { parseEther } from "@ethersproject/units";
import loader from './loader.gif';

const AirdropBox = () => {
  var endDate = new Date(); // Now
  endDate.setDate(endDate.getDate() + 3);
  const year = new Date().getFullYear();
  const difference = +new Date(`${year}-04-30`) - +new Date();

  const context = useWeb3React();
  const { account, library } = context;


  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [referrallink, setReferrallink] = useState('Please connect your wallet first (Metamask/Trustwallet)')
  const [loading, setLoading] = useState('none');
  let base_url = `${window.location.href}?ref=`;

  useEffect(() => {
    if (account) {
      setReferrallink(`${base_url}${account}`);
    }
    else {
      setReferrallink('Please connect your wallet first (Metamask/Trustwallet');
    }
  }, [account, base_url])

  useEffect(() => {
    const id = setTimeout(() => {
      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((difference / 1000 / 60) % 60));
        setSeconds(Math.floor((difference / 1000) % 60));
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  const handleClaim = async () => {
    if (account) {
      try {
        setLoading('inline-block');
        let singer = library.getSigner();
        let contract = new Contract(presale_address, presale_abi, singer);
        let addr = AddressZero;

        if (window.location.href.includes("?ref=")) {
          addr = window.location.href.substring(
            window.location.href.indexOf("=") + 1
          );
        }

        let tx = await contract.Claim_AirDrop(addr, {
          value: parseEther("0.0025"),
        });
        toast('Waiting for transaction confirmation', { autoClose: 15000 })
        let response = await tx.wait();
        if (response) {
          if (response.status === 1) {
            toast.success('success ! Your Last Transaction is Successfull.');
            setLoading('none');
          }
          else if (response.status === 0) {
            toast.error('error ! Your Last Transaction is Failed.');
            setLoading('none');
          }
          else {
            toast.error('error ! something went wrong.');
            setLoading('none');
          }
        }
        else {
          toast.error('error ! something went wrong.');
          setLoading('none');
        }
      }
      catch (err) {
        typeof err.data !== 'undefined' ? toast.error(err.data.message) : toast.error(err.message)
        toast.error(err.message);
        setLoading('none');
      }
    }
    else {
      toast.error('please connect to wallet');
      setLoading('none');
    }
  }
  return (
    <div className="airdropBox-main-wrapper">
      <div className="airdropBox-inner-wrapper">
        <div className="header-wrap">
          <a
            href="https://www.moneyheisttoken.finance/"
            target="_blank"
            rel="noreferrer"
            className="navbar-wrapper"
          >
            <img src={logo} alt="logo" />
            <h4>Instant Money Token</h4>
          </a>
          {/* <div className="connet-btn">Connect Wallet</div> */}
          <ConnectButton />
        </div>
        <div className="xena-token-box">
          <div className="xena-token-box-inner-wrapper">
            <div className="content-wrapper">
              <h3 className="heading">Instant Money Token BOUNTY OFFER</h3>
              {/* <div className="dropdown-manu-wrapper">
                <p>Refferal bonus 500MNT Instant Money Token</p>
                <span>
                  <KeyboardArrowDownIcon
                    style={{ fontSize: "20px", color: "white" }}
                  />
                </span>
              </div> */}
              <p style={{ marginBottom: "15px", color: "#fff" }}>
                Offer Start April 25, 2022 - December 31, 2035
              </p>
              <div className="calander-main-wrapper">
                <div className="date-wrapper">
                  <span>
                    <h5>{days}</h5>
                    <p>Days</p>
                  </span>
                  <span>
                    <h5>{hours}</h5>
                    <p>Hours</p>
                  </span>
                  <span>
                    <h5>{minutes}</h5>
                    <p>Minutes</p>
                  </span>
                  <span>
                    <h5>{seconds}</h5>
                    <p>Secounds</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="butten-wrapper" onClick={handleClaim}>
              <img src={loader} style={{ "display": loading }} height="7%" width="7%" alt="loader-img" />
              <h6>Claim AirDrop</h6>
            </div>
            <p className="paragraph">
              <ul>
                <li>+ Follow  all social media and claim $100</li>
                <li>
                  + aiInvite and Earn $25 when your invite claim bounty reward.
                </li>
              </ul>
            </p>
            <div className="social-icons-wrapper">
              <a href="https://t.me/smcstaking" target="_blank" rel="noreferrer">
                <TelegramIcon style={{ cursor: "pointer" }} />
              </a>
              &nbsp;&nbsp;
              {/*<a href="https://twitter.com/heist_token" target="_blank" rel="noreferrer">
                <TwitterIcon style={{ cursor: "pointer" }} />
              </a>
              &nbsp;&nbsp;
              <a
                href="https://www.facebook.com/MoneyHeistToken/"
                target="_blank" rel="noreferrer"
              >
                <FacebookIcon style={{ cursor: "pointer" }} />
              </a>
              &nbsp;&nbsp;
              <a href="https://discord.com/invite/pTFTyTNgfx" target="_blank" rel="noreferrer">
                <DiscordIcon style={{ cursor: "pointer" }} />
              </a>
              &nbsp;&nbsp;
              <a
                href="https://www.youtube.com/watch?v=1YGoE5Tg8i4"
                target="_blank" rel="noreferrer"
              >
                <YouTubeIcon style={{ cursor: "pointer" }} />
              </a>*/}
            </div>
          </div>
        </div>
        <br />
        {/* =-========== */}
        <section className="app section">
          <div
            className="app-container container flex flex--column"
            style={{ marginTop: "5px!important" }}
          >
            <div
              style={{ textAlign: "center" }}
              className="app__data-container flex flex--column"
            >
              <h2 className="app__title" style={{ color: "#fff" }}>
                Referral program
              </h2>
              <span>
                Share your referral link and get paid instantly to your wallet
                for every referred token claim.
              </span>
              <br />
              <br/>
              <div className="app__data-content">
                <p>
                  Referral commission: <span id="refPercent">$500</span>
                  &nbsp;
                </p>
                <br />
                <p>
                  Share your referral link or QR code and get commission for
                  referred token claims instantly to your wallet.
                </p>
                <br />
                <p>
                  <input
                    type="text"
                    id="referLink"
                    value={referrallink}
                    defaultValue="Please connect your wallet first (Metamask/Trustwallet)"
                    readOnly="true"
                    style={{
                      width: "90%",
                      borderRadius: "10px",
                      textAlign: "center",
                      border: "none",
                    }}
                  />
                </p>
                {/* <button className="btn" id="copyreflink">
                  Copy link
                </button> */}
                <br />
                <div className="butten-wrapper">
                  <CopyToClipboard text={`${base_url}${account}`}>
                    <h6>Copy link</h6>
                  </CopyToClipboard>
                </div>
                <p id="refErr" className="err" style={{ display: "none" }}>
                  Please connect your wallet on Binance Smart Chain to generate
                  your referral link!
                </p>
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />
      </div>
    </div>
  );
};

export default AirdropBox;
