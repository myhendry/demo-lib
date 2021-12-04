import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import onError from "../../../middlewares/errors";
import dbConnect from "../../../config/dbConnect";
import {
  allProjects,
  newProject,
} from "../../../controllers/projectController";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(allProjects);
handler.post(newProject);

export default handler;
