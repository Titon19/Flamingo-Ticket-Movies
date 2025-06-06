import type { Request, Response } from "express";
import Movie from "../models/Movie";
import Genre from "../models/Genre";
import Transaction from "../models/Transaction";
import Theater from "../models/Theater";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const data = await Movie.find()
      .select("title thumbnail banner description available")
      .populate({
        path: "genre",
        select: "name -_id",
      })
      .limit(3);

    return res.status(200).json({
      data,
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

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.find().select("name");

    return res.status(200).json({
      data: genre,
      message: "Successfuly get genre",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data genre",
      status: "Failed",
    });
  }
};

export const getMovieDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const seats = [];
    const seatRows = ["A", "B", "C"];

    for (let indexHuruf = 0; indexHuruf < seatRows.length; indexHuruf++) {
      for (let seatNumber = 1; seatNumber <= 5; seatNumber++) {
        seats.push({
          seat: `${seatRows[indexHuruf]}${seatNumber}`,
          isBooked: false,
        });
      }
    }

    const movieDetails = await Movie.findById(id)
      .populate({ path: "theaters", select: "name city" })
      .populate({ path: "genre", select: "name" });

    return res.status(200).json({
      data: {
        ...movieDetails?.toJSON(),
        seats,
        times: ["12:30", "15:30", "18:30", "21:30"],
      },
      message: "Successfully retrieved movie details",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get movie details",
      status: "Failed",
    });
  }
};

export const getAvailableSeats = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const { date } = req.query;

    const transactions = await Transaction.find({
      date: date?.toString().replace("+", " "),
      "movie.id": movieId,
    })
      .select("seats")
      .populate({
        path: "seats",
        select: "seat",
      });

    const seats = [];

    for (const seat of transactions) {
      seats.push(...seat.seats);
    }

    return res.status(200).json({
      data: seats,
      message: "Successfully retrieved available seats",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get available seats",
      status: "Failed",
    });
  }
};
// export const getAvailableSeats = async (req: Request, res: Response) => {
//   try {
//     const { movieId } = req.params;
//     const { date } = req.query;

//     const transactions = await Transaction.find({
//       // date: decodeURIComponent(date?.toString() || ""),
//       // date: date?.toString().replace("+", " "),
//       date: date,
//       movie: movieId,
//     })
//       .select("seats")
//       .populate({
//         path: "seats",
//         select: "seat",
//       });

//     const seats = [];
//     for (const transaction of transactions) {
//       seats.push(...transaction.seats);
//       // ...transaction.seats artinya adalah setiap object dalam array yang di looping di dalam array transactions
//     }

//     return res.status(200).json({
//       data: seats,
//       message: "Successfully retrieved available seats",
//       status: "Success",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       data: null,
//       message: "Failed to get available seats",
//       status: "Failed",
//     });
//   }
// };

export const getMovieFilter = async (req: Request, res: Response) => {
  const { genreId } = req.params;
  const { city, theaters, availability } = req.query;

  let filterQuery: any = {};

  if (genreId) {
    filterQuery = {
      ...filterQuery,
      genre: genreId,
    };
  }

  if (city) {
    const theaterLists = await Theater.find({ city });
    const theaterIds = theaterLists.map((theater) => theater.id);

    // filterQuery = { ...filterQuery, $in: [...theaterIds] };
    filterQuery.theaters = {
      $in: theaterIds,
    };
  }

  if (theaters) {
    const theaterIds = (theaters as string[]).map((id) => id);

    filterQuery.theaters = {
      $in: [...(filterQuery?.theaters?.$in ?? []), ...theaterIds],
    };
  }

  // if (city) {
  //   const cityTheaters = await Theater.find({ city });
  //   const cityTheaterIds = cityTheaters.map((theater) => theater.id);

  //   if (theaters) {
  //     const selectedTheaterIds = (theaters as string[]).map((id) => id);
  //     const validTheaterIds = cityTheaterIds.filter((id) =>
  //       selectedTheaterIds.includes(id)
  //     );

  //     filterQuery.theaters = { $in: validTheaterIds };
  //   } else {
  //     filterQuery.theaters = { $in: cityTheaterIds };
  //   }
  // } else if (theaters) {
  //   const selectedTheaterIds = (theaters as string[]).map((id) => id);
  //   filterQuery.theaters = { $in: selectedTheaterIds };
  // }

  if (availability === "true") {
    filterQuery.available = true;
  }
  if (availability === "false") {
    filterQuery.available = false;
  }

  const data = await Movie.find({ ...filterQuery })
    .select("thumbnail title genre")
    .populate({ path: "genre", select: "name" });

  const allData = await Movie.find()
    .select("thumbnail title genre theaters")
    .populate({ path: "genre", select: "name" })
    .populate({ path: "theaters", select: "city" });

  return res.status(200).json({
    data: { filterMovies: data, allMovies: allData },
    message: "Successfully retrieved movie details",
    status: "Success",
  });
};

export const getSearchMovie = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || "";

    const searchByGenre = await Genre.find({
      name: { $regex: search, $options: "i" },
    });

    const genreIds = searchByGenre.map((genre) => genre.id);

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { genre: { $in: genreIds } },
          ],
        }
      : {};

    const result = await Movie.find(query)
      .select("thumbnail thumbnailUrl title genre _id")
      .populate({
        path: "genre",
        select: "name",
      });

    return res.status(200).json({
      data: result,
      message: "Successfully retrieved movie details",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get search movie",
      status: "Failed",
    });
  }
};
