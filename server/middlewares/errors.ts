import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import ErrorHandler from "../../lib/ErrorHandler";

export default (
  err: any,
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };

  error.message = err.message;

  // Wrong Mongoose ObjectID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Handling Mongoose Validation console.error;
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (value: any) => value.message
    );
    error = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};
