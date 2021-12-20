import React, { Suspense } from "react";

import { Draggable } from "./dragable";
import { BoundingBox } from "./bounding-box";
import { Model } from "./model";

interface Props {
  position?: [number, number, number];
  dims?: [number, number, number];
  offset?: [number, number, number];
}

export const Car = ({
  position = [4, 6, 0],
  dims = [3, 2.5, 6],
  offset = [0, -0.5, 0.8],
}: Props) => {
  return (
    <Suspense fallback={null}>
      <Draggable transformGroup>
        <BoundingBox position={position} dims={dims} offset={offset}>
          <Model
            path="/images/tesla_model_3/scene.gltf"
            scale={new Array(3).fill(0.01)}
          />
        </BoundingBox>
      </Draggable>
    </Suspense>
  );
};
