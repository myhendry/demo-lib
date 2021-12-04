import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import onError from "../../../middlewares/errors";
import dbConnect from "../../../config/dbConnect";
import { allRooms, newRoom } from "../../../controllers/roomController";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(allRooms);
handler.post(newRoom);

export default handler;
