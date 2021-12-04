import React from "react";
import Image from "next/image";

import { Layout } from "../../../components/common";

interface Props {}

const PicsLab = (props: Props) => {
  return (
    <Layout>
      <h1>Images</h1>
      <div className="bg-yellow-300">
        <Image
          src={
            "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2146&q=80"
          }
          alt="Nature Picture"
          height="200"
          width="200"
          layout="intrinsic" // fill || fixed || responsive || intrinsic
          objectFit="contain" // contain || cover || fill || inherit || initial || none || revert || scale-down || unset
          objectPosition="bottom center" // 50% 50% || right top || left bottom || 250px 125px
          loading="lazy" // eager || lazy (default is lazy)
          quality={30} // 0 to 100% (default is 75%)
        />
      </div>
    </Layout>
  );
};

export default PicsLab;
