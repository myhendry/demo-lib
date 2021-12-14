import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import { Layout } from "../../../components/common";
import { useWeb3 } from "../../../components/ethereum/context";
import { useEthPrice } from "../../../components/ethereum/hooks/useEthPrice";
import { useWalletInfo } from "../../../components/ethereum/hooks";
import Details from "./details";
import { ObjectId } from "mongodb";

// * Github Repo
// https://github.com/StephenGrider/EthereumCasts

// * web3 Call() vs Send()
// https://bitsofco.de/calling-smart-contract-functions-using-web3-js-call-vs-send/

interface Props {}

interface ICard {
  title: string;
  country: string;
  url: string;
}

const Ethereum = (props: Props) => {
  const { isLoading, requireInstall, connect, web3 } = useWeb3();
  const { account, network, canPurchaseCourse } = useWalletInfo();
  const { eth } = useEthPrice();
  const [demoId, setDemoId] = useState<string | null>();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get<{ _id: string; name: string; age: number }>(
          "/api/demo/61b46e424fa6d33e76723a6e"
        );
        setDemoId(res.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  console.log(demoId);
  /*
      The prefix 0x is used in code to indicate that the number is being written in hex. ... The hexadecimal format has a base of 16, which means that each digit can represent up to 16 different values.
  */
  const demoIdHex = web3 && web3.utils.utf8ToHex(demoId!);
  console.log("demoIdHex", demoIdHex);

  const orderHash =
    web3 &&
    web3.utils.soliditySha3(
      { type: "bytes16", value: demoIdHex },
      { type: "address", value: account.data }
    );
  console.log("orderHash", orderHash);

  const emailHash = web3 && web3.utils.sha3("lim@gx.com");
  console.log("emailHash", emailHash);

  return (
    <Layout>
      <p>Ethereum</p>
      <div className="border rounded-md p-3 m-2">
        <strong className="underline">In Index</strong>
        <p>Metmask Network: {network.data}</p>
        <p>
          Env Network: {network.target} in {process.env.NODE_ENV} mode
        </p>
        <p>Network Supported: {network.isSupported ? "Yes" : "No"}</p>
        <p>Data: {account.data}</p>
      </div>
      <Details network={network} account={account} />
      {isLoading ? (
        <button
          disabled
          onClick={connect}
          className="bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Loading
        </button>
      ) : account.data ? (
        <button disabled className="bg-gray-200">
          Hi There {account.isAdmin ? "Admin" : "User"}
        </button>
      ) : requireInstall ? (
        <button
          onClick={() =>
            window.open("https://metamask.io/download.html", "_blank")
          }
          className="bg-gray-500"
        >
          Install Metamask
        </button>
      ) : (
        <button onClick={connect} className="bg-yellow-500">
          Connect
        </button>
      )}
      <div>
        {requireInstall && (
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-center w-12 bg-red-500">
              <svg
                className="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
              </svg>
            </div>

            <div
              className="px-4 py-2 -mx-3"
              onClick={() =>
                window.open("https://metamask.io/download.html", "_blank")
              }
            >
              <div className="mx-3">
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Error
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  Cannot connect to network! Please install metamask
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <p>
          Current ETH to USD{" "}
          <strong>{eth.data?.market_data.current_price.usd}</strong>
        </p>
        <p>
          ETH Per Item <strong>{eth.perItem} ETH</strong>
        </p>
      </div>
      <div className="space-y-3">{renderCards(cards, canPurchaseCourse)}</div>
    </Layout>
  );
};

const cards = [
  {
    title: "Kryptobirdz",
    country: "USA",
    url: "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "ZDee",
    country: "Japan",
    url: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "AWash",
    country: "Germany",
    url: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Ahyou",
    country: "Taiwan",
    url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
];

const renderCards = (list: ICard[], canPurchaseCourse: boolean): ReactNode => {
  return list.map((c, i) => (
    <div
      key={i}
      className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
    >
      <Image
        src={c.url}
        layout="responsive"
        width="200"
        height="150"
        className={`object-cover ${!canPurchaseCourse && "filter grayscale"}`}
      />

      <div className="py-5 text-center">
        <a
          href="#"
          className="block text-2xl font-bold text-gray-800 dark:text-white"
        >
          {c.title}
        </a>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          {c.country}
        </span>
        <div>
          <button
            disabled={!canPurchaseCourse}
            className="px-10 py-2 my-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  ));
};

export default Ethereum;
