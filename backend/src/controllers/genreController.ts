import type { Request, Response } from "express";
import Genre from "../models/Genre";
import { genreSchema } from "../utils/zodSchema";

export const getGenres = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || "";
    const current_page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (current_page - 1) * limit;

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const [total_items, genres] = await Promise.all([
      Genre.countDocuments(query),
      Genre.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    ]);

    const total_pages = Math.ceil(total_items / limit);
    const maxPageToShow = 10;

    let startPage = Math.max(1, current_page - Math.floor(maxPageToShow / 2));
    let endPage = startPage + maxPageToShow - 1;

    if (endPage > total_pages) {
      endPage = total_pages;
      startPage = Math.max(1, endPage - maxPageToShow + 1);
    }

    let page_collections: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      page_collections = [...page_collections, i];
    }

    return res.status(200).json({
      data: genres,
      meta: {
        current_page,
        total_pages,
        total_items,
        limit,
        page_collections,
      },
      message: "Successfully get genres",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data genres",
      status: "Failed",
    });
  }
};

export const postGenre = async (req: Request, res: Response) => {
  try {
    const body = genreSchema.parse(req.body);

    const genre = new Genre({
      name: body.name,
    });

    const newData = await genre.save();

    return res.status(200).json({
      data: newData,
      message: "Successfully created genre",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to created genre",
      status: "Failed",
    });
  }
};
export const putGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const body = genreSchema.parse(req.body);

    // Cari data genre berdasarkan id dan perbarui data nama genre
    // dengan nama yang dikirimkan melalui request body
    await Genre.findByIdAndUpdate(id, {
      name: body.name,
    });

    // Cari data genre yang baru saja diperbarui berdasarkan id
    // dan simpan hasilnya di dalam variabel updatedData
    const updatedData = await Genre.findById(id);

    return res.status(200).json({
      data: updatedData,
      message: "Successfully updated genre",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to updated genre",
      status: "Failed",
    });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedData = await Genre.findById(id);

    await Genre.findByIdAndDelete(id);

    return res.status(200).json({
      data: deletedData,
      message: "Successfully deleted genre",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to deleted genre",
      status: "Failed",
    });
  }
};

export const getGenreDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const genre = await Genre.findById(id);

    return res.status(200).json({
      data: genre,
      message: "Successfully get detail genre",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data detail genre",
      status: "Failed",
    });
  }
};
