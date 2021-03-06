import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../../../../config.js";
import NFT from "../../../../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../../../../artifacts/contracts/HHMarket.sol/HHMarket.json";
import { Layout } from "../../../../components/common";
import { Subheader } from "./index";

const Gallery: NextPage = () => {
  const [nfts, setNFTs] = useState<any[]>([]);
  const [sold, setSold] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    setIsLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      provider
    );
    const data = await marketContract.fetchItemsMinted();
    console.log("data", data);

    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.nftTokenId);
        const meta: any = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
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

    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNFTs(items);
    setIsLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Subheader />
      <main>
        <div>
          <h1>MINTED NFTs</h1>
          {nfts.map((nft: any, i: number) => (
            <div key={i}>
              <p>{nft.name}</p>
              <Image src={nft.image} height={150} width={150} alt="bird" />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Gallery;
