import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import onError from "../../../middlewares/errors";
import dbConnect from "../../../config/dbConnect";
import {
  deleteComment,
  updateComment,
} from "../../../controllers/commentController";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.put(updateComment);
handler.delete(deleteComment);

export default handler;
