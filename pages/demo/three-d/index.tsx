import { NextPage } from "next";
import { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import Link from "next/link";
import * as three from "three";
import { Stats, OrbitControls } from "@react-three/drei";

interface Props {}

const Box = (props: any) => {
  const ref = useRef<three.Mesh>();
  useFrame((state) => {
    ref.current!.rotation.x += 0.01;
    ref.current!.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} {...props}>
      <boxBufferGeometry />
      <meshBasicMaterial color={"blue"} />
    </mesh>
  );
};

const ThreeD: NextPage<Props> = (props) => {
  // https://threejs.org/manual/#en/fundamentals
  // https://github.com/pmndrs/react-three-fiber

  return (
    <div className="h-screen w-screen">
      <div className="flex justify-end cursor-pointer bg-black">
        <Link href={"/"}>
          <a className="text-white p-2">Go Back</a>
        </Link>
      </div>
      <Canvas style={{ background: "black" }} camera={{ position: [3, 3, 3] }}>
        <Stats />
        <OrbitControls />
        <Box position={[-1, 1, 2]} />
        <axesHelper args={[3]} />
      </Canvas>
    </div>
  );
};

export default ThreeD;
