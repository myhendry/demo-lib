import React from "react";
import { useRouter } from "next/router";

import { Layout } from "../../../components/common";
import Link from "next/link";

interface Props {}

const Routes = (props: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/demo/routes/kglkgadfjgfdljg");
  };

  return (
    <Layout>
      <div>
        <button
          className="px-10 py-2 my-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
          onClick={handleClick}
        >
          Page 2
        </button>
      </div>
      <Link href={`/demo/routes/gdfgfdgfdsg`}>
        <a> Go to Page 2</a>
      </Link>
    </Layout>
  );
};

export default Routes;
