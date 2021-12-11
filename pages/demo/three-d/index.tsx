import { NextPage } from "next";
import { Canvas } from "react-three-fiber";
import Link from "next/link";

import { Layout } from "../../../components/common";

interface Props {}

const ThreeD: NextPage<Props> = (props) => {
  // https://threejs.org/manual/#en/fundamentals
  // https://github.com/pmndrs/react-three-fiber

  return (
    <div style={{ width: "100vw", height: "100vw" }}>
      <Link href={"/"}>
        <a>Go Back</a>
      </Link>
      <Canvas style={{ background: "black" }}>
        <mesh>
          <boxBufferGeometry />
          <meshBasicMaterial color={"blue"} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default ThreeD;
