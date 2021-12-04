import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import onError from "../../../middlewares/errors";
import dbConnect from "../../../config/dbConnect";
import {
  deleteRoom,
  getRoom,
  updateRoom,
} from "../../../controllers/roomController";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(getRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;
