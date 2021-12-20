import React, { Suspense } from "react";
import { BoundingBox } from ".";

import { Draggable } from "./dragable";
// import { BoundingBox } from "./bounding-box";
import { Model } from "./model";

interface Props {
  position?: [number, number, number];
  dims?: [number, number, number];
  offset?: [number, number, number];
}

export const NudeGirl = ({
  position = [-1, 3, 0],
  dims = [1, 3.5, 1],
  offset = [-0.3, -1.5, 0],
}: Props) => {
  return (
    <Suspense fallback={null}>
      <Draggable transformGroup>
        <BoundingBox position={position} dims={dims} offset={offset}>
          <Model
            path="/images/nude_gal/scene.gltf"
            scale={new Array(3).fill(0.02)}
          />
        </BoundingBox>
      </Draggable>
    </Suspense>
  );
};
