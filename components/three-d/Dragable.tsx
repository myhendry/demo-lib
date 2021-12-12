import React, { useEffect, useRef, useState } from "react";
import { useThree, extend } from "react-three-fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
extend({ DragControls });

interface Props {
  children: any;
}

const Dragable = (props: Props) => {
  // console.log(props.children)
  const groupRef = useRef<any>();
  const [children, setChildren] = useState<any[]>([]);

  const { camera, gl } = useThree();
  // console.log(groupRef.current);

  useEffect(() => {
    setChildren(groupRef.current.children);
  }, []);

  return (
    <group ref={groupRef}>
      {/* @ts-ignore */}
      <dragControls args={[children, camera, gl.domElement]} />
      {props.children}
    </group>
  );
};

export default Dragable;
