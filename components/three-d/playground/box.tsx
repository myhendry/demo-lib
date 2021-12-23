import { useState } from "react";
import { useBox } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface IProps {
  [x: string]: any;
}

export const Box = (props: IProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [ref, api] = useBox(() => ({ mass: 1, ...props }));

  // ! For state management, one option is use Zustand without setting state
  const handlePointerDown = (e: any) => {
    setActive(!active);
  };

  const texture = useLoader(THREE.TextureLoader, "/images/wood.jpg");

  return (
    <mesh
      ref={ref}
      //@ts-ignore
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
