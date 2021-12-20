import React, { useEffect, useRef, useState } from "react";
import { useThree, extend } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
extend({ DragControls });

interface Props {
  children: any;
  transformGroup: any;
}

const Draggable = (props: Props) => {
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
    console.log("cref", controlsRef.current);
    //controlsRef.current!.enabled;
    controlsRef.current!.addEventListener("hoveron", (e) => {
      console.log("scene", scene);
      // @ts-ignore
      scene.orbitControls.enabled = false;
    });
    controlsRef.current!.addEventListener("hoveroff", (e) => {
      // @ts-ignore
      scene.orbitControls.enabled = true;
    });
    controlsRef.current!.addEventListener("dragstart", (e) => {
      console.log(e.object);
      console.log("scene", scene);
      e.object.api?.mass.set(0);
    });
    controlsRef.current!.addEventListener("dragend", (e) =>
      e.object.api?.mass.set(1)
    );
    controlsRef.current!.addEventListener("drag", (e) => {
      e.object.api?.position.copy(e.object.position);
      e.object.api?.velocity.set(0, 0, 0);
    });
  }, [children]);

  return (
    <group ref={groupRef}>
      {/* @ts-ignore */}
      <dragControls
        transformGroup={props.transformGroup}
        ref={controlsRef}
        args={[children, camera, gl.domElement]}
      />
      {props.children}
    </group>
  );
};

export default Draggable;
