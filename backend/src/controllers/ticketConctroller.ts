import type { Response, Request } from "express";
import { CustomRequest } from "../types/Request";
import { transactionSchema } from "../utils/zodSchema";
import Wallet from "../models/Wallet";
import Transaction from "../models/Transaction";
import TransactionSeat from "../models/TransactonSeat";
import Movie from "../models/Movie";
import Genre from "../models/Genre";
import Theater from "../models/Theater";

export const transactionTicket = async (req: CustomRequest, res: Response) => {
  try {
    const parse = transactionSchema.parse(req.body);
    const wallet = await Wallet.findOne({ user: req.user?.id });

    // Jika di wallet jumlah balance atau jumlah uangnya kurang dari total bayar dari request maka tidak bisa transaksi
    if (!wallet || wallet.balance < parse.total) {
      return res.status(400).json({
        data: null,
        message:
          "Not enough balance on your wallet, please top up your wallet first",
        status: "Failed",
      });
    }

    const movie = await Movie.findById(parse.movieId);
    const genre = await Genre.findById(movie?.genre);
    const theater = await Theater.findById(parse.theaterId);

    // parse.movieTitle = movie?.title ?? "";
    // parse.movieThumbnail = movie?.thumbnail ?? "";
    // parse.movieGenre = genre?.name ?? "";
    // parse.theaterName = theater?.name ?? "";
    // parse.theaterCity = theater?.city ?? "";

    // Melakukan transaksi dan simpan data ke dalam collection transaction
    const transaction = new Transaction({
      bookingFee: parse.bookingFee,
      subtotal: parse.subtotal,
      tax: parse.tax,
      total: parse.total,
      user: req.user?.id,
      movie: {
        id: movie?._id,
        title: movie?.title,
        thumbnail: movie?.thumbnail,
        genre: genre?.name,
        price: movie?.price,
        bonus: movie?.bonus,
      },
      theater: {
        id: theater?._id,
        name: theater?.name,
        city: theater?.city,
      },
      date: parse.date,
    });

    // Simpan data seat ke dalam collection transactionSeat
    for (const seat of parse.seats) {
      const newSeat = new TransactionSeat({
        transaction: transaction.id,
        seat: seat,
      });

      await newSeat.save();
    }

    // Mencari data seat berdasarkan id transaksi
    const listSeats = await TransactionSeat.find({
      transaction: transaction.id,
    });
    // Melakukan mapping listSeats berdasarkan transaction id dan mengambil id seat serta menyimpannya ke dalam array kolom seats di collection transaction
    transaction.seats = listSeats.map((seatList) => seatList.id);

    // Melakukan pengurangan jumlah uang balance di wallet setelah melakukan transaksi
    const currentBalance = wallet.balance ?? 0;

    await Wallet.findOneAndUpdate(wallet._id, {
      balance: currentBalance - parse.total,
    });

    await transaction.save();

    return res.status(200).json({
      message: "Successfully transaction ticket",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to transaction ticket",
      status: "Failed",
    });
  }
};

export const getOrders = async (req: CustomRequest, res: Response) => {
  try {
    const orders = await Transaction.find({ user: req.user?.id })
      .select("seats date status movie theater _id")
      .populate({
        path: "seats",
        select: "seat -_id",
      });

    return res.status(200).json({
      data: orders,
      message: "Successfully get orders",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get orders",
      status: "Failed",
    });
  }
};

export const getOrderDetail = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const orderDetail = await Transaction.findById(id).populate({
      path: "seats",
      select: "seat -_id",
    });

    return res.status(200).json({
      data: orderDetail,
      message: "Successfully get order detail",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get order detail",
      status: "Failed",
    });
  }
};
