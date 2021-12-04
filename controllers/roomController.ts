import { NextApiRequest, NextApiResponse } from "next";

import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Room from "../models/room";
import ApiFeatures from "../utils/apiFeatures";
import ErrorHandler from "../utils/ErrorHandler";

const allRooms = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const resPerPage = 4;
    const roomsCount = await Room.countDocuments();

    const apiFeatures = new ApiFeatures(Room.find(), req.query)
      .search()
      .filter();
    let rooms = await apiFeatures.query;
    let filteredRoomsCount = rooms.length;

    apiFeatures.pagination(resPerPage);
    rooms = await apiFeatures.query;

    return res.status(200).json({
      success: true,
      roomsCount,
      resPerPage,
      filteredRoomsCount,
      rooms,
    });
  }
);

const getRoom = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const id = req.query.id;
    const room = await Room.findById(id);

    if (!room) {
      return next(new ErrorHandler("Room not found with this ID", 404));
    }

    return res.status(200).json(room);
  }
);

const newRoom = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await Room.create(req.body);
    return res.status(200).json(room);
  }
);

const deleteRoom = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const id = req.query.id;
    const room = await Room.findById(id);

    if (!room) {
      return next(new ErrorHandler("Room not found with this ID", 404));
    }

    await room.remove();

    return res.status(200).json({ message: "Room successfully deleted" });
  }
);

const updateRoom = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const id = req.query.id;
    let room = await Room.findById(id);

    if (!room) {
      return next(new ErrorHandler("Room not found with this ID", 404));
    }

    room = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json(room);
  }
);

export { allRooms, getRoom, newRoom, updateRoom, deleteRoom };
