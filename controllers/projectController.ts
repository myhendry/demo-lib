import { NextApiRequest, NextApiResponse } from "next";

import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Project from "../models/project";
//import ApiFeatures from "../utils/apiFeatures";
import ErrorHandler from "../utils/ErrorHandler";

const allProjects = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const projects = await Project.find({}).populate({ path: "comments" });
    return res.status(200).json({
      success: true,
      projects,
    });
  }
);

const getProject = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const id = req.query.id;
    const project = await Project.findById(id).populate({ path: "comments" });
    return res.status(200).json({
      success: true,
      project,
    });
  }
);

const newProject = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const project = await Project.create(req.body);
    return res.status(200).json({
      success: true,
      project,
    });
  }
);

const updateProject = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const id = req.query.id;
    let project = await Project.findById(id);

    if (!project) {
      return next(new ErrorHandler("Project not found with this ID", 404));
    }

    project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      project,
    });
  }
);

const deleteProject = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const id = req.query.id;
    const project = await Project.findById(id);

    if (!project) {
      return next(new ErrorHandler("Project not found with this ID", 404));
    }

    await project.remove();
    return res.status(200).json({
      success: true,
    });
  }
);

export { allProjects, getProject, newProject, updateProject, deleteProject };
