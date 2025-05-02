import type { Request, Response } from "express";
import Theater from "../models/Theater";
import { theaterSchema } from "../utils/zodSchema";

export const getTheaters = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || "";
    const current_page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (current_page - 1) * limit;

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const [total_items, theaters] = await Promise.all([
      Theater.countDocuments(query),
      Theater.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    ]);

    // total_items berarti total data yang ada di database = 50
    // limit berarti batasan data per halaman = 10
    // total_items / limit = 50 / 10 = 5
    const total_pages = Math.ceil(total_items / limit); // = 5

    // Max page yang akan ditampilkan ada 10
    const maxPageToShow = 10; //10 tombol

    // Start page berarti tombol halaman pertama
    // Misal:
    // current_page = 7
    // maxPageToShow = 10
    // Math.floor(maxPageToShow / 2) = 5

    // Maka:
    // startPage = 7 - 5 = 2

    // Math.max(1, 2) = 2 karena terbesar
    // Jadi startPage = 2
    let startPage = Math.max(1, current_page - Math.floor(maxPageToShow / 2)); //jika argumen ke 2 0 maka yang diambil agrumen pertama karena value terbesar

    // End page berarti halaman terakhir
    // Misal:
    // startPage = 2
    // maxPageToShow = 10

    // Maka:
    // endPage = 2 + 10 - 1 = 14
    let endPage = startPage + maxPageToShow - 1; //14

    // Pengkondisian jika endPage > total_pages
    // Misal:
    // endPage = 20
    // total_pages = 10
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // Tombolnya bakal geser ke kiri:
    // total_pages = 20
    // current_page = 11
    // [[11], 12, 13, 14, 15, 16, 17, 18, 19, 20]
    // Jadi endPage = 20
    // startPage = 20 - (10 + 1) = 11
    // Jadi startPage = 11

    if (endPage > total_pages) {
      endPage = total_pages;
      startPage = Math.max(1, endPage - maxPageToShow + 1);
    }

    let page_collections: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      // update array pakai spread operator
      page_collections = [...page_collections, i];
    }

    return res.status(200).json({
      data: theaters,
      meta: {
        current_page,
        total_pages,
        total_items,
        limit,
        page_collections,
      },
      message: "Successfully get theaters",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data theaters",
      status: "Failed",
    });
  }
};

export const postTheater = async (req: Request, res: Response) => {
  try {
    const body = theaterSchema.parse(req.body);

    const theater = new Theater({
      name: body.name,
      city: body.city,
    });

    const newData = await theater.save();

    return res.status(200).json({
      data: newData,
      message: "Successfully created theater",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to created theater",
      status: "Failed",
    });
  }
};

export const putTheater = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const body = theaterSchema.parse(req.body);

    await Theater.findByIdAndUpdate(id, {
      name: body.name,
      city: body.city,
    });

    const updatedData = await Theater.findById(id);

    return res.status(200).json({
      data: updatedData,
      message: "Successfully updated theater",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to updated theater",
      status: "Failed",
    });
  }
};

export const deleteTheater = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedData = await Theater.findById(id);

    await Theater.findByIdAndDelete(id);

    return res.status(200).json({
      data: deletedData,
      message: "Successfully deleted theater",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to deleted theater",
      status: "Failed",
    });
  }
};

export const getTheaterDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const theater = await Theater.findById(id);

    return res.status(200).json({
      data: theater,
      message: "Successfully get detail theater",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data detail theater",
      status: "Failed",
    });
  }
};
