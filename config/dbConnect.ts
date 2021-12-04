import mongoose from "mongoose";

import "../models/project";
import "../models/comment";
import "../models/room";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    ignoreUndefined: true,
  });
};

export default dbConnect;
