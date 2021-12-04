import { NextApiRequest, NextApiResponse } from "next";

import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Project from "../models/project";
import Comment from "../models/comment";
//import ApiFeatures from "../utils/apiFeatures";
import ErrorHandler from "../utils/ErrorHandler";

// const allComments = catchAsyncErrors(
//   async (req: NextApiRequest, res: NextApiResponse) => {
//     const comments = await Comment.find({});
//     return res.status(200).json({
//       success: true,
//       comments,
//     });
//   }
// );

const getCommentsByProjectId = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { projectId } = req.body;
    const comments = await Comment.find({ project: projectId }).populate({
      path: "project",
      populate: {
        path: "comments",
        model: "Comment",
      },
    });
    return res.status(200).json({
      success: true,
      comments,
    });
  }
);

const newComment = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { projectId, ...newComment } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return next(new ErrorHandler("Cannot Add Comment", 404));
    }
    const comment = new Comment({ ...newComment, project: projectId });
    project.comments.push(comment);
    Promise.all([project.save(), comment.save()]);
    return res.status(200).json({
      success: true,
      comment,
    });
  }
);

const updateComment = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const commentId = req.query.id;

    let comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ErrorHandler("Cannot find Comment", 404));
    }

    comment = await Comment.findByIdAndUpdate(commentId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      comment,
    });
  }
);

const deleteComment = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const commentId = req.query.id;
    const { projectId } = req.body;

    const comment = await Comment.findById(commentId);
    const project = await Project.findById(projectId);
    if (!comment || !project) {
      return next(new ErrorHandler("Failed to Delete Comment", 404));
    }

    project.comments.pull(commentId);
    Promise.all([comment.remove(), project.save()]);

    return res.status(200).json({
      success: true,
    });
  }
);

export { getCommentsByProjectId, newComment, updateComment, deleteComment };
