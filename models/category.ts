import mongoose from "mongoose";

const { Schema } = mongoose;

export const category = new Schema({
  name: {
    type: String,
    required: [true, "Please input your Category"],
    trim: true,
    maxLength: [200, "Category cannot exceed 200 characters"],
  },
});
