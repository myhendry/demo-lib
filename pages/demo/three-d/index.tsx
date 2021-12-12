import { NextPage } from "next";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber";
import Link from "next/link";
import * as THREE from "three";
import { Stats, OrbitControls } from "@react-three/drei";
import { Color } from "three";

interface Props {}

const Background = (props: any) => {
  const texture = useLoader(THREE.TextureLoader, "/images/autoshop.jpg");

  const { gl } = useThree();

  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture);

  return <primitive attach="background" object={formatted.texture} />;
};

const Sphere = (props: any) => {
  const ref = useRef<THREE.Mesh>();
  // ! Texture Loader
  const texture = useLoader(THREE.TextureLoader, "/images/wood.jpg");
  useFrame((state) => {
    ref.current!.rotation.x += 0.01;
    ref.current!.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      // receiveShadow
    >
      <sphereBufferGeometry args={[1, 100, 100]} />
      <meshPhysicalMaterial
        // ! Texture
        map={texture}
      />

      {/* MeshStandardMaterial inherits from MeshPhysicalMaterial but it is more demanding on system */}
    </mesh>
  );
};

const Box = (props: any) => {
  const ref = useRef<THREE.Mesh>();
  // ! Texture Loader
  const texture = useLoader(THREE.TextureLoader, "/images/wood.jpg");
  useFrame((state) => {
    // ref.current!.rotation.x += 0.01;
    ref.current!.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      // receiveShadow
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial
        // ! Texture
        // Custom Objects from Blender should apply UV Mapping for it to work well, that means to show the texture better
        map={texture}
        // ! Materials
        // color={"white"}
        // opacity={0.5}
        // transparent // needed for opacity
        // fog={false}
        // visible={false}
        // wireframe
        // metalness={1}
        // roughness={0} // default is 1
        // clearcoat={1}
        // transmission={1} // suitable for glass or semi transparent material. the higher the transmission, the more see through
        // transparent // needed for transmission
        // reflectivity={1}
        // side={THREE.DoubleSide}
      />

      {/* MeshStandardMaterial inherits from MeshPhysicalMaterial but it is more demanding on system */}
    </mesh>
  );
};

const Floor = (props: any) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial color={"white"} />
    </mesh>
  );
};

const Bulb = (props: any) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive={new Color(0xff0000)} />
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
      <Canvas
        shadows
        style={{ background: "black" }}
        camera={{ position: [3, 3, 3] }}
        // camera={{ position: [1, 5, 1] }}
      >
        {/* <fog attach="fog" args={["white", 1, 10]} /> */}
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Stats />
        <OrbitControls />
        <Suspense fallback={null}>
          <Background />
        </Suspense>
        <Suspense fallback={null}>
          <Box position={[0, 1.5, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Sphere position={[2, 1.5, 0]} />
        </Suspense>

        <Floor postition={[0, -1, 0]} />
        <axesHelper args={[3]} />
      </Canvas>
    </div>
  );
};

export default ThreeD;
