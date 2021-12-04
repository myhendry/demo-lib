import { NextApiRequest, NextApiResponse } from "next";

import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Project from "../models/project";
//import ApiFeatures from "../utils/apiFeatures";
import ErrorHandler from "../utils/ErrorHandler";

const addCategory = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const projectId = req.query.id;
    const category = req.body;

    if (!category.name) {
      return next(new ErrorHandler("No category name stated", 400));
    }

    const project = await Project.findById(projectId);
    project.categories.push(category);
    await project.save();

    return res.status(200).json({
      success: true,
      project,
    });
  }
);

const deleteCategory = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const projectId = req.query.id;
    const categoryId = req.body.categoryId;

    const project = await Project.findById(projectId);
    const category = await project.categories.id(categoryId);

    if (!project || !category) {
      return next(new ErrorHandler("Category cannot be deleted", 400));
    }

    project.categories.pull(categoryId);
    await project.save();

    return res.status(200).json({
      success: true,
    });
  }
);

export { addCategory, deleteCategory };
