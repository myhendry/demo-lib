import { NextPage } from "next";
import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import Link from "next/link";
import * as THREE from "three";
import { Stats, OrbitControls } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
import { Physics, useBox } from "@react-three/cannon";

import useStore from "../../../../store";
import Draggable from "../../../../components/three-d/Draggable";
import Model from "../../../../components/three-d/Model";

// todo other than zustand for state management, can we also use react-context to manage state in react-three-fiber?
// there are issues when using react context for state management with react-three-fiber
// zustand is built with react-three-fiber in mind
// todo react-spring vs useCannons which one should we use?
// react-spring is for animation
// useCannons is for physics and collision detection
// they both serve different purposes

interface Props {}

const Background = (props: any) => {
  const texture = useLoader(THREE.TextureLoader, "/images/autoshop.jpg");

  const { gl } = useThree();

  const formatted = useMemo(
    () =>
      new THREE.WebGLCubeRenderTarget(
        texture.image.height
      ).fromEquirectangularTexture(gl, texture),
    [gl, texture]
  );

  return <primitive attach="background" object={formatted.texture} />;
};

const Sphere1 = (props: any) => {
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
      // onClick?: (event: ThreeEvent<MouseEvent>) => void
      // onContextMenu?: (event: ThreeEvent<MouseEvent>) => void
      // onDoubleClick?: (event: ThreeEvent<MouseEvent>) => void
      // onPointerUp?: (event: ThreeEvent<PointerEvent>) => void
      // onPointerDown?: (event: ThreeEvent<PointerEvent>) => void
      // onPointerOver?: (event: ThreeEvent<PointerEvent>) => void
      // onPointerOut?: (event: ThreeEvent<PointerEvent>) => void
      // onPointerEnter?: (event: ThreeEvent<PointerEvent>) => void
      // onPointerLeave?: (event: ThreeEvent<PointerEvent>) => void
      // onPointerMove?: (event: ThreeEvent<PointerEvent>) => void
      // onPointerMissed?: (event: MouseEvent) => void
      // onPointerCancel?: (event: ThreeEvent<PointerEvent>) => void
      // onWheel?: (event: ThreeEvent<WheelEvent>) => void
    >
      <sphereBufferGeometry args={[1, 100, 100]} />
      <meshPhysicalMaterial
        // ! Texture
        map={texture}
        // ! Materials
        // Custom Objects from Blender should apply UV Mapping for it to work well, that means to show the texture better
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

const Box1 = (props: any) => {
  const [active, setActive] = useState<boolean>(false);
  const [ref, api] = useBox(() => ({ mass: 1, ...props }));

  // ! For state management, one option is use Zustand without setting state
  const handlePointerDown = (e: any) => {
    setActive(!active);
  };

  // ! Texture Loader
  const texture = useLoader(THREE.TextureLoader, "/images/wood.jpg");

  // ! Can't use ref and rotation etc as using useBox and all interactions done through useBox's api
  // const ref = useRef<THREE.Mesh>();

  // useFrame((state) => {
  //   // ref.current!.rotation.x += 0.01;
  //   ref.current!.rotation.y += 0.01;
  // });

  return (
    <mesh
      ref={ref}
      api={api}
      {...props}
      castShadow
      onPointerDown={handlePointerDown}
      scale={active ? 1.1 : 1}
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

const Box2 = (props: any) => {
  const [active, setActive] = useState<boolean>(false);

  // ! For state management, one option is use Zustand without setting state
  const handlePointerDown = (e: any) => {
    setActive(!active);
  };

  const ref = useRef<THREE.Mesh>();

  useFrame((state) => {
    // ref.current!.rotation.x += 0.01;
    ref.current!.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      onPointerDown={handlePointerDown}
      scale={active ? 1.1 : 1}
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial
        color="white"
        roughness={0}
        clearcoat={1}
        transmission={0.7} // suitable for glass or semi transparent material. the higher the transmission, the more see through
        transparent // needed for transmission
        reflectivity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Box3 = (props: any) => {
  const [active, setActive] = useState<boolean>(false);

  // ! For state management, one option is use Zustand without setting state
  const handlePointerDown = (e: any) => {
    setActive(!active);
  };

  const ref = useRef<THREE.Mesh>();

  useFrame((state) => {
    // ref.current!.rotation.x += 0.01;
    ref.current!.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      onPointerDown={handlePointerDown}
      scale={active ? 1.1 : 1}
    >
      <boxBufferGeometry />
      <meshBasicMaterial color={active ? "yellow" : "red"} />
    </mesh>
  );
};

const Box4 = (props: any) => {
  const { status, setStatus } = useStore((state) => state);

  // ! For state management, one option is use Zustand without setting state
  const handlePointerDown = (e: any) => {
    setStatus();
  };

  const ref = useRef<THREE.Mesh>();

  useFrame((state) => {
    // ref.current!.rotation.x += 0.01;
    ref.current!.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      onPointerDown={handlePointerDown}
      scale={status ? 1.1 : 1}
    >
      <boxBufferGeometry />
      <meshBasicMaterial color={status ? "yellow" : "green"} />
    </mesh>
  );
};

const Box5 = (props: any) => {
  const { color } = useStore();
  const [active, setActive] = useState<boolean>(false);

  // ! For state management, one option is use Zustand without setting state
  const handlePointerDown = (e: any) => {
    setActive(!active);
  };

  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    // ref.current!.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      onPointerDown={handlePointerDown}
      scale={active ? 1.1 : 1}
    >
      <boxBufferGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const Box6 = (props: any) => {
  const ref = useRef<THREE.Mesh>();
  const [active, setActive] = useState<boolean>(false);
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });

  // ! For state management, one option is use Zustand without setting state
  const handlePointerDown = (e: any) => {
    setActive(!active);
  };

  useFrame((state) => {
    // ref.current!.rotation.x += 0.01;
    ref.current!.rotation.y += 0.01;
  });

  return (
    <animated.mesh
      ref={ref}
      {...props}
      castShadow
      scale={scale}
      onPointerDown={handlePointerDown}
    >
      <boxBufferGeometry />
      <meshBasicMaterial color="white" />
    </animated.mesh>
  );
};

const BoundingBox = ({
  position = [0, 0, 0],
  dims = [1, 1, 1],
  offset = [0, 0, 0],
  visible,
  children,
}) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: dims as any,
    position: position as any,
  }));
  return (
    // @ts-ignore
    <group ref={ref} api={api}>
      <mesh scale={dims as any} visible={visible}>
        <boxBufferGeometry />
        <meshPhysicalMaterial wireframe />
      </mesh>
      <group position={offset as any}>{children}</group>
    </group>
  );
};

const Floor = (props: any) => {
  const [ref, api] = useBox(() => ({ args: [20, 1, 10], ...props }));
  return (
    <mesh ref={ref} {...props} receiveShadow>
      <boxBufferGeometry args={[200, 1, 10]} />
      <meshPhysicalMaterial color={"white"} opacity={1} />
    </mesh>
  );
};

const Bulb = (props: any) => {
  const [color, setColor] = useState<boolean>(false);

  return (
    <mesh {...props} onClick={() => setColor(!color)}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial
        emissive={color ? new THREE.Color(0xff0000) : new THREE.Color(0x00ff00)}
      />
    </mesh>
  );
};

const ThreeD: NextPage<Props> = (props) => {
  // https://threejs.org/manual/#en/fundamentals
  // https://github.com/pmndrs/react-three-fiber

  const { setColor } = useStore();

  const handleClick = (color: string) => {
    setColor(color);
  };

  return (
    <div className="h-screen w-screen">
      <div className="flex justify-end cursor-pointer bg-black">
        <Link href={"/demo/three-d"}>
          <a className="text-white p-2">Go Back</a>
        </Link>
      </div>
      <div className="absolute z-10 p-2 space-y-2">
        <div
          className="border h-8 w-8 rounded-md bg-blue-600 cursor-pointer"
          onClick={() => handleClick("blue")}
        ></div>
        <div
          className="border h-8 w-8 rounded-md bg-red-600 cursor-pointer"
          onClick={() => handleClick("red")}
        ></div>
        <div
          className="border h-8 w-8 rounded-md bg-yellow-300 cursor-pointer"
          onClick={() => handleClick("yellow")}
        ></div>
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
        <OrbitControls attach="orbitControls" />
        <Suspense fallback={null}>
          <Background />
        </Suspense>

        <Suspense fallback={null}>
          <Box2 position={[-2, 1.5, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Box3 position={[-4, 1.5, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Box4 position={[-6, 1.5, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Box5 position={[-8, 1.5, 0]} />
        </Suspense>
        <Physics>
          <Suspense fallback={null}>
            <Draggable transformGroup>
              <BoundingBox
                visible
                position={[5, 3, 1]}
                dims={[3, 2.6, 6.2]}
                offset={[0, 0, 1]}
              >
                <Model
                  path="/images/tesla_model_3/scene.gltf"
                  scale={new Array(3).fill(0.01)}
                />
              </BoundingBox>
            </Draggable>
          </Suspense>
          <Suspense fallback={null}>
            <Draggable transformGroup>
              <BoundingBox
                visible
                position={[0, 0.7, 1]}
                dims={[3, 2.6, 5.6]}
                offset={[0, 0, 0.2]}
              >
                <Model
                  path="/images/tesla_model_s/scene.gltf"
                  scale={new Array(3).fill(0.01)}
                />
              </BoundingBox>
            </Draggable>
          </Suspense>
          <Floor postition={[0, 0, 0]} />

          <Suspense fallback={null}>
            <Draggable transformGroup>
              <Box1 position={[8, 1.5, 0]} />
            </Draggable>
          </Suspense>
          <Suspense fallback={null}>
            <Sphere1 position={[8, 1.5, 2]} />
          </Suspense>
          <Suspense fallback={null}>
            <Box6 position={[-5, 1.5, 2]} />
          </Suspense>
        </Physics>
        <axesHelper args={[3]} />
      </Canvas>
    </div>
  );
};

export default ThreeD;
