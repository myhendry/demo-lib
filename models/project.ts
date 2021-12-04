import mongoose from "mongoose";
import { category } from "./category";

const { Schema, model, models } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter Project name"],
    trim: true,
    maxLength: [100, "Project name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter Project description"],
  },
  district: {
    type: Number,
    required: [true, "Please enter District"],
  },
  categories: [category],
  top: {
    type: Boolean,
    required: [true, "Please indicate if Project has TOP"],
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

projectSchema.pre("remove", function (next) {
  const Comment = mongoose.model("Comment");
  Comment.remove({ _id: { $in: (this as any).comments } }).then(() => next());
});

export default models.Project || model("Project", projectSchema);
