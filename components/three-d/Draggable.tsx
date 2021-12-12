import React, { useEffect, useRef, useState } from "react";
// import {} from "@react-three/drei";
import { useThree, extend } from "react-three-fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
extend({ DragControls });

interface Props {
  children: any;
}

const Dragable = (props: Props) => {
  const groupRef = useRef<any>();
  const [children, setChildren] = useState<any[]>([]);

  const { camera, gl } = useThree();

  useEffect(() => {
    setChildren(groupRef.current);
  }, []);

  return (
    <group ref={groupRef}>
      {/* <dragControls args={[children, camera, gl.domElement]} /> */}
      {props.children}
    </group>
  );
};

export default Dragable;
