import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import onError from "../../../middlewares/errors";
import dbConnect from "../../../config/dbConnect";
import {
  addCategory,
  deleteCategory,
} from "../../../controllers/categoryController";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.post(addCategory);
handler.delete(deleteCategory);

export default handler;
