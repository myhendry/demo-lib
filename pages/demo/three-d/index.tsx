import { NextPage } from "next";
import Link from "next/link";

import { Layout } from "../../../components/common";

interface IProps {}

const ThreeD: NextPage<IProps> = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-5 mt-5">
        <Link href="/demo/three-d/tesla">
          <a className="p-3 border rounded-md text-center cursor-pointer">
            Tesla 3D
          </a>
        </Link>
        <Link href="/demo/three-d/demo">
          <a className="p-3 border rounded-md text-center cursor-pointer">
            Demo 3D
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default ThreeD;
