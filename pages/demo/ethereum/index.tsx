import { NextPage } from "next";
import Link from "next/link";

import { Layout } from "../../../components/common";

interface IProps {}

const Ethereum: NextPage<IProps> = () => {
  return (
    <Layout>
      <div>
        <h1>Ethereum Local Demos</h1>
        <div className="flex flex-col space-y-5 mt-5">
          <Link href="/demo/ethereum/nft-hh">
            <a className="p-3 border rounded-md text-center cursor-pointer">
              NFT (HardHat)
            </a>
          </Link>
          <Link href="/demo/ethereum/demo-tf">
            <a className="p-3 border rounded-md text-center cursor-pointer">
              Demo (Truffle)
            </a>
          </Link>
          <Link href="/demo/ethereum/marketplace-tf">
            <a className="p-3 border rounded-md text-center cursor-pointer">
              Marketplace (Truffle)
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Ethereum;
