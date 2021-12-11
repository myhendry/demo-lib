import nc from "next-connect";

import { NextApiExtendedRequest } from "./../../../types/index.d";
import { NextApiResponse } from "next";
import { database } from "../../../server/middlewares/db";
import {
  getDemos,
  addDemo,
} from "./../../../server/controllers/demo-controllers";

const handler = nc<NextApiExtendedRequest, NextApiResponse>();

handler.use(database);

handler.get(getDemos);
handler.post(addDemo);

export default handler;
