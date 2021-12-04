import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import onError from "../../../middlewares/errors";
import dbConnect from "../../../config/dbConnect";
import {
  getCommentsByProjectId,
  newComment,
} from "../../../controllers/commentController";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(getCommentsByProjectId);
handler.post(newComment);

export default handler;
