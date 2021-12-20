import { NextPage } from "next";
import { Suspense, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import { Bulb2 } from "../../../../components/three-d/demo/Bulb";
import Car from "../../../../components/three-d/demo/Car";

interface IProps {}

const Playground: NextPage<IProps> = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex justify-end cursor-pointer">
        <Link href={"/demo/three-d"}>
          <a className="p-2 tracking-widest">Go Back</a>
        </Link>
      </div>
      <Canvas style={{ background: "white" }} camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.2} />
        <Stats />
        <OrbitControls attach="orbitControls" />
        <Bulb2 position={[0, 5, 0]} />
        <Physics>
          <Car />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Playground;
