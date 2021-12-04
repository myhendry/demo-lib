import React, { forwardRef } from "react";

import { FormValues } from "./index";

interface IProps {
  data: FormValues;
}

const ComponentToPrint = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  return (
    <div ref={ref}>
      My cool content [{data?.name}] [{data?.address}] here!
    </div>
  );
});

export default ComponentToPrint;
