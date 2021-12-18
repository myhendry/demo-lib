import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";

import { nftaddress, nftmarketaddress } from "../../../../config";
import NFT from "../../../../artifacts/contracts/NFT.sol/NFT.json";
import HHMarket from "../../../../artifacts/contracts/HHMarket.sol/HHMarket.json";
import { Layout } from "../../../../components/common";

interface Props {}

/*
  npx hardhat
  npx hardhat accounts
  npx hardhat compile
  npx hardhat clean
  npx hardhat test
  npx hardhat help
  npx hardhat node
  npx hardhat run scripts/deploy.ts --network localhost

  contracts, artifacts/contracts, config.js, scripts/deploy.ts,
  
  Solved! “Nonce too high” error with MetaMask and Hardhat
  https://medium.com/@thelasthash/solved-nonce-too-high-error-with-metamask-and-hardhat-adc66f092cd
*/
interface INft {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  description: string;
  name: string;
  image: string;
}

export const Subheader = () => (
  <div className="flex flex-row space-x-5">
    <Link href={"/demo/ethereum/nft-hh"}>
      <a>All</a>
    </Link>
    <Link href={"/demo/ethereum/nft-hh/gallery"}>
      <a>Minted</a>
    </Link>
    <Link href={"/demo/ethereum/nft-hh/new"}>
      <a>New</a>
    </Link>
  </div>
);

const NFTMarket = (props: Props) => {
  const [nfts, setNFTs] = useState<any[]>([]);
  const [contractName, setContractName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      HHMarket.abi,
      provider
    );
    const data = await marketContract.fetchUnsoldListingItems();
    console.log(tokenContract, marketContract, data);
    const contractName = await tokenContract.name();
    setContractName(contractName);

    const items = await Promise.all(
      data.map(async (i: any) => {
        /*
          i: nftTokenId, seller, owner, price
          meta: name, image, description
        */
        const tokenUri = await tokenContract.tokenURI(i.nftTokenId);
        const meta: any = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");

        // console.log("index/loadNFTs i", i);
        // console.log("index/loadNFTs i", typeof i.nftTokenId.toNumber());

        let item = {
          price,
          nftTokenId: i.nftTokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );

    setNFTs(items);
    setIsLoading(false);
  };

  const buyNFT = async (nft: any) => {
    setIsLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      nftmarketaddress,
      HHMarket.abi,
      signer
    );
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    console.log("contract", contract);

    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
    setIsLoading(false);
  };

  return (
    <Layout>
      <h1>{contractName}</h1>
      <Subheader />
      <div>
        {nfts.map((nft: any, i: number) => (
          <div key={i}>
            <Image src={nft.image} height={150} width={150} alt="bird" />
            <div>
              <button disabled={isLoading} onClick={() => buyNFT(nft)}>
                Buy NFT
              </button>
              <p>
                {nft.name} {nft.description} {nft.price} ETH {nft.seller}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="border rounded-md m-5 p-3">
        <form
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            buyNFT({ price: 1, tokenId: "fasdfds" });
          }}
        >
          <input
            type="text"
            className="rounded-md"
            placeholder="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.persist();
              setName(e.target.value);
            }}
          />
          <input
            type="submit"
            disabled={isLoading}
            className="rounded-md m-5 p-2"
          />
        </form>
      </div> */}
    </Layout>
  );
};

export default NFTMarket;
