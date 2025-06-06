import type { Request, Response } from "express";
import Movie from "../models/Movie";
import { movieSchema } from "../utils/zodSchema";
import path from "node:path";
import fs from "node:fs";
import Genre from "../models/Genre";
import Theater from "../models/Theater";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || "";
    const current_page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (current_page - 1) * limit;

    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const [total_items, movies] = await Promise.all([
      Movie.countDocuments(query),
      Movie.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate({
          path: "genre",
          select: "name",
        })
        .populate({
          path: "theaters",
          select: "name",
        }),
    ]);

    const total_pages = Math.ceil(total_items / limit);
    const maxPageToShow = 10;
    let startPage = Math.max(1, current_page - Math.floor(maxPageToShow / 2)); //20 - 5 = 15
    let endPage = startPage + maxPageToShow - 1; //15 + 5 - 1 = 19

    if (endPage > total_pages) {
      endPage = startPage;
      startPage = Math.max(1, endPage - maxPageToShow + 1);
    }

    let page_collections: number[] = [];

    for (let i = startPage; i <= endPage; i++) {
      page_collections = [...page_collections, i];
    }

    return res.status(200).json({
      data: movies,
      meta: {
        current_page,
        total_pages,
        total_items,
        limit,
        page_collections,
      },
      message: "Successfully get movies",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data movies",
      status: "Failed",
    });
  }
};

// export const getMovies = async (req: Request, res: Response) => {
//   try {
//     const movies = await Movie.find()
//       .populate({
//         path: "genre",
//         select: "name",
//       })
//       .populate({
//         path: "theaters",
//         select: "name",
//       });

//     return res.status(200).json({
//       data: movies,
//       message: "Successfully get movies",
//       status: "Success",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       data: null,
//       message: "Failed to get data movies",
//       status: "Failed",
//     });
//   }
// };

export const postMovie = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files.thumbnail) {
      return res.status(400).json({
        data: null,
        message: "Thumbnail is required!",
        status: "Failed",
      });
    }

    const thumbnailFile = files.thumbnail[0];
    const bannerFile = files.banner ? files.banner[0] : null;

    const parse = movieSchema.safeParse({
      title: req.body.title,
      genre: req.body.genre,
      thumbnail: thumbnailFile.path.replace(/\\/g, "/"),
      banner: bannerFile ? bannerFile.path.replace(/\\/g, "/") : null,
      theaters: req.body.theaters.split(", "),
      available: req.body.available === "1" ? true : false,
      description: req.body.description,
      price: Number.parseInt(req.body.price),
      bonus: req.body?.bonus,
    });

    if (!parse.success) {
      const errorMessage = parse.error.issues.map((error) => error.message);

      return res.status(400).json({
        message: "Invalid request",
        details: errorMessage,
        status: "Failed",
      });
    }

    const movie = new Movie({
      title: parse.data.title,
      genre: parse.data.genre,
      available: parse.data.available,
      theaters: parse.data.theaters,
      thumbnail: thumbnailFile?.filename,
      banner: bannerFile?.filename,
      description: parse.data.description,
      price: parse.data.price,
      bonus: parse.data.bonus,
    });

    const newData = await movie.save();

    return res.status(200).json({
      data: newData,
      message: "Successfully created genre",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to created movie",
      status: "Failed",
    });
  }
};

export const putMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const oldMovie = await Movie.findById(id);

    if (!oldMovie) {
      return res.status(404).json({
        data: null,
        message: "Movie not found",
        status: "Failed",
      });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const thumbnailFile = files?.thumbnail ? files.thumbnail[0] : null;
    const bannerFile = files.banner ? files.banner[0] : null;

    const parse = movieSchema.safeParse({
      title: req.body.title,
      genre: req.body.genre,
      thumbnail: thumbnailFile
        ? thumbnailFile.path.replace(/\\/g, "/")
        : oldMovie.thumbnail,
      banner: bannerFile
        ? bannerFile.path.replace(/\\/g, "/")
        : oldMovie.banner,
      theaters: req.body.theaters.split(", "),
      available: req.body.available === "1" ? true : false,
      description: req.body.description,
      price: Number.parseInt(req.body.price),
      bonus: req.body?.bonus,
    });

    if (!parse.success) {
      return res.status(400).json({
        data: null,
        message: "Invalid request",
        details: parse.error.issues.map((error) => error.message),
        status: "Failed",
      });
    }

    if (thumbnailFile && oldMovie.thumbnail) {
      const thumbnailPath = path.resolve(
        "public/uploads/thumbnails",
        oldMovie.thumbnail
      );
      if (
        fs.existsSync(thumbnailPath) &&
        fs.lstatSync(thumbnailPath).isFile()
      ) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    if (bannerFile && oldMovie.banner) {
      const bannerPath = path.resolve(
        "public/uploads/banners",
        oldMovie.banner
      );
      if (fs.existsSync(bannerPath) && fs.lstatSync(bannerPath).isFile()) {
        fs.unlinkSync(bannerPath);
      }
    }

    await Genre.findByIdAndUpdate(oldMovie.genre, {
      $pull: {
        movies: oldMovie._id,
      },
    });

    for (const theaterId of oldMovie.theaters) {
      await Theater.findByIdAndUpdate(theaterId, {
        $pull: {
          movies: oldMovie._id,
        },
      });
    }

    await Movie.findByIdAndUpdate(oldMovie._id, {
      title: parse.data.title,
      genre: parse.data.genre,
      available: parse.data.available,
      theaters: parse.data.theaters,
      thumbnail: thumbnailFile ? thumbnailFile.filename : oldMovie.thumbnail,
      banner: bannerFile ? bannerFile.filename : oldMovie.banner,
      description: parse.data.description,
      price: parse.data.price,
      bonus: parse.data.bonus,
    });

    await Genre.findByIdAndUpdate(parse.data.genre, {
      $push: {
        movies: id,
      },
    });

    for (const theaterId of parse.data.theaters) {
      await Theater.findByIdAndUpdate(theaterId, {
        $push: {
          movies: id,
        },
      });
    }

    const updatedMovie = await Movie.findById(id);

    return res.status(200).json({
      data: updatedMovie,
      message: "Successfully updated movie",
      status: "Success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: null,
      message: "Failed to updated movie",
      status: "Failed",
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedData = await Movie.findById(id);

    if (!deletedData) {
      return res.status(404).json({
        data: null,
        message: "Data movie not found",
        status: "Failed",
      });
    }

    if (deletedData.thumbnail) {
      const dirname = path.resolve();
      const thumbnailPath = path.join(
        dirname,
        "public/uploads/thumbnails",
        deletedData.thumbnail ?? ""
      );

      if (
        fs.existsSync(thumbnailPath) &&
        fs.lstatSync(thumbnailPath).isFile()
      ) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    if (deletedData.banner) {
      const dirname = path.resolve();
      const bannerPath = path.join(
        dirname,
        "public/uploads/banners",
        deletedData.banner ?? ""
      );

      if (fs.existsSync(bannerPath) && fs.lstatSync(bannerPath).isFile()) {
        fs.unlinkSync(bannerPath);
      }
    }

    await Genre.findByIdAndUpdate(deletedData.genre, {
      $pull: {
        movies: deletedData._id,
      },
    });

    for (const theaterId of deletedData.theaters) {
      await Theater.findByIdAndUpdate(theaterId, {
        $pull: {
          movies: deletedData._id,
        },
      });
    }

    await Movie.findByIdAndDelete(id);

    return res.status(200).json({
      data: deletedData,
      message: "Successfully deleted movie",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to deleted movie",
      status: "Failed",
    });
  }
};

export const getMovieDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id)
      .populate({
        path: "genre",
        select: "name",
      })
      .populate({
        path: "theaters",
        select: "name",
      });

    return res.status(200).json({
      data: movie,
      message: "Successfully get detail movie",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data detail movie",
      status: "Failed",
    });
  }
};
