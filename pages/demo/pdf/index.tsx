import React, {
  useRef,
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react";
import { useReactToPrint } from "react-to-print";

import { Layout } from "../../../components/common";
import { ComponentToPrint } from "./item_to_print";

export interface FormValues {
  name: string;
  address: string;
}

interface Props {}

const Pdf = (props: Props) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<FormValues>({
    name: "",
    address: "",
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      handlePrint!();
    },
    [data]
  );

  return (
    <Layout>
      <h1>React to Print</h1>

      <div>
        <form>
          <div className="space-y-2">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="bg-yellow-500 p-2 rounded m-2"
            onClick={handleSubmit}
          >
            Print
          </button>
        </form>
        <ComponentToPrint ref={componentRef} data={data} />
      </div>
    </Layout>
  );
};

export default Pdf;
