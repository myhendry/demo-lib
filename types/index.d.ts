import { Db } from "mongodb";
import { NextApiRequest } from "next";
export interface IComment {
  _id: string;
  comment: string;
  project: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface IProject {
  _id: string;
  name: string;
  description: string;
  district: number;
  categories: ICategory[];
  top: boolean;
  comments: IComment[];
}

export interface NextApiExtendedRequest extends NextApiRequest {
  db: Db;
}
