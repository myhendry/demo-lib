import { NextApiResponse } from "next";

import { NextApiExtendedRequest } from "./../../types/index.d";
import clientPromise from "../../lib/mongodb";

export const database = async (
  req: NextApiExtendedRequest,
  _res: NextApiResponse,
  next: any
) => {
  const client = await clientPromise;
  const db = await client.db();
  req.db = db;
  next();
};
