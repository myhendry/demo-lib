import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import { create as ipfsHttpClient, urlSource } from "ipfs-http-client";
import Image from "next/image";
import { ethers } from "ethers";

import { nftaddress, nftmarketaddress } from "../../../../config.js";
import NFT from "../../../../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../../../../artifacts/contracts/HHMarket.sol/HHMarket.json";
import { Layout } from "../../../../components/common";
import { Subheader } from "./index";

interface Props {}

const NewNFT: NextPage = (props) => {
  const { push } = useRouter();
  // in this component we set the ipfs up to host our nft data of
  // file storage

  //   const client = ipfsHttpClient();
  // const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
  const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

  //   export default function MintItem() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  //     const router = useRouter()

  // set up a function to fireoff when we update files in our form - we can add our
  // NFT images - IPFS

  async function onChange(e: any) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog: any) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  }

  const createMarket = async () => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    // upload to IPFS
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      // run a function that creates sale and passes in the url
      createSale(url);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  const createSale = async (url: string) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.mintToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    console.log(tx, event, value, tokenId, price);

    contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.mintListingItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    push("/");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createMarket();
  };

  return (
    <Layout>
      <Subheader />
      <h1>IPFS File Upload</h1>
      {JSON.stringify(formInput)}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Asset Name"
            name="name"
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Asset Price"
            name="price"
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
          <input
            type="textarea"
            placeholder="Asset Description"
            name="description"
            onChange={(e) =>
              updateFormInput({ ...formInput, description: e.target.value })
            }
          />
          <input
            type="file"
            placeholder="Asset Image"
            name="image"
            onChange={onChange}
          />
          <button>Mint</button>
        </form>
        {fileUrl && <Image src={fileUrl} alt="bird" width={150} height={150} />}
      </div>
    </Layout>
  );
};

export default NewNFT;
