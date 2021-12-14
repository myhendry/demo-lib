import nc from "next-connect";

import { NextApiExtendedRequest } from "./../../../types/index.d";
import { NextApiResponse } from "next";
import { database } from "../../../server/middlewares/db";
import { getDemo } from "./../../../server/controllers/demo-controllers";

const handler = nc<NextApiExtendedRequest, NextApiResponse>();

handler.use(database);

handler.get(getDemo);

export default handler;
