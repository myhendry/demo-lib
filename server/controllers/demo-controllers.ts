import { ObjectID } from "mongodb";
import { NextApiResponse } from "next";

import { NextApiExtendedRequest } from "../../types";

export const getDemos = async (
  req: NextApiExtendedRequest,
  res: NextApiResponse
) => {
  const result = await req.db.collection("sample").find({}).toArray();
  res.send(result);
};

export const getDemo = async (
  req: NextApiExtendedRequest,
  res: NextApiResponse
) => {
  const result = await req.db
    .collection("sample")
    .findOne({ _id: new ObjectID(req.query.id as string) });

  res.send(result);
};

export const addDemo = async (
  req: NextApiExtendedRequest,
  res: NextApiResponse
) => {
  const result = await req.db.collection("sample").insertOne({
    name: "Xavier",
    age: 21,
  });
  res.send(result);
};
