import { NextPage } from "next";

import { Layout } from "../../../components/common";

interface Props {}

const ThreeD: NextPage<Props> = (props) => {
  return (
    <Layout>
      <p>Using Three Js</p>
    </Layout>
  );
};

export default ThreeD;
