import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import onError from "../../../middlewares/errors";
import dbConnect from "../../../config/dbConnect";
import {
  getProject,
  deleteProject,
  updateProject,
} from "../../../controllers/projectController";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(getProject);
handler.put(updateProject);
handler.delete(deleteProject);

export default handler;
