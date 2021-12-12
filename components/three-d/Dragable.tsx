import React, { useEffect, useRef, useState } from "react";
import { useThree, extend } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
extend({ DragControls });

interface Props {
  children: any;
}

const Dragable = (props: Props) => {
  // console.log(props.children)
  const groupRef = useRef<any>();
  const controlsRef = useRef<DragControls>();
  const [children, setChildren] = useState<any[]>([]);

  const { camera, gl, scene } = useThree();
  // console.log(groupRef.current);

  useEffect(() => {
    setChildren(groupRef.current.children);
  }, []);

  useEffect(() => {
    /*
      setChildren is not happening synchronously
      when we addEventListener, the setChildren has not been set yet
      hence need to use separate useEffect
    */
    console.log(controlsRef.current);
    controlsRef.current!.addEventListener("hoveron", (e) => {
      console.log("scene", scene);
    });
  }, [children]);

  return (
    <group ref={groupRef}>
      {/* @ts-ignore */}
      <dragControls
        ref={controlsRef}
        args={[children, camera, gl.domElement]}
      />
      {props.children}
    </group>
  );
};

export default Dragable;
