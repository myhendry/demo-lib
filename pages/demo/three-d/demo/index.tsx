import { NextPage } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import {
  Background,
  Bulb,
  Car,
  Floor,
  NudeGirl,
} from "../../../../components/three-d/playground";

// https://docs.pmnd.rs/react-three-fiber/getting-started/examples?utm_source=pocket_mylist

interface IProps {}

const Demo: NextPage<IProps> = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex justify-end cursor-pointer">
        <Link href={"/demo/three-d"}>
          <a className="p-2 tracking-widest">Go Back</a>
        </Link>
      </div>
      <Canvas style={{ background: "white" }} camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.7} />
        <Stats />
        <OrbitControls attach="orbitControls" />
        <Suspense fallback={null}>
          <Background />
        </Suspense>
        <Bulb dims={[0.5, 20, 20]} position={[0, 5, 0]} />
        <Physics>
          <Car />
          <NudeGirl />
          <Floor position={[0, -0.5, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Demo;
