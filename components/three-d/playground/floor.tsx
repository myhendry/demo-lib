import React from "react";
import { useBox } from "@react-three/cannon";

interface Props {
  position: [number, number, number];
  [x: string]: any;
}

export const Floor = (props: Props) => {
  const [ref, api] = useBox(() => ({ args: [20, 1, 10], ...props }));
  return (
    <mesh ref={ref} {...props} receiveShadow>
      <boxBufferGeometry args={[200, 1, 200]} />
      <meshPhysicalMaterial color={"white"} opacity={1} />
    </mesh>
  );
};
