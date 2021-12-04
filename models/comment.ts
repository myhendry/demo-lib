import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, "Please input your Comment"],
    trim: true,
    maxLength: [200, "Comment cannot exceed 200 characters"],
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
});

export default models.Comment || model("Comment", commentSchema);
