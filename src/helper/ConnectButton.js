
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError
} from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../hooks/connectors";
import { useEagerConnect, useInactiveListener } from "../hooks/hooks";





export const ConnectButton = function () {
  const context = useWeb3React();
  const { connector, chainId, account, activate, deactivate, active, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  function getErrorMessage(error) {

    if (error instanceof NoEthereumProviderError) {
      return "Metamask not deteced";
    }
    if (error instanceof UnsupportedChainIdError) {
      return "Switch Network";
    }

    deactivate(injected);
  }

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const activating = (connection) => connection === activatingConnector;
  const connected = (connection) => connection === connector;


  return (

    <>

      {
        error &&
        <button className="connet-btn" onClick={() => {
          setActivatingConnector(injected);
          activate(injected);
        }}>
          <div className="font-bold self-center">{getErrorMessage(error)}</div>
          
        </button>
      }
      {!error &&
        <>

          {connected(injected) && typeof chainId === 'undefined' &&
            <button className="connet-btn">
              <div className="font-bold self-center">Switch Network Bsc Mainnet</div>
            </button>

          }
          {(active || !error) && connected(injected) &&
            <button className="connet-btn" onClick={() => {
              setActivatingConnector();
              deactivate(injected);

            }}>

              <div className="font-bold self-center">{account && account.toString().substr(0, 5) + "...." + account.toString().substr(-5)}</div>
            </button>


          }
          {!connected(injected) &&

            <button className="connet-btn" onClick={() => {
              setActivatingConnector(injected);
              activate(injected);
            }}>
              {activating(injected) && <div className="font-bold self-center">Connecting...</div>}
              {!activating(injected) && <div className="font-bold self-center">Connect wallet</div>}
            </button>
          }
        </>
      }
    </>
  );
};

export default ConnectButton;