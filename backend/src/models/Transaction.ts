import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    subtotal: {
      type: Number,
      requierd: true,
      default: 0,
    },
    total: {
      type: Number,
      requierd: true,
      default: 0,
    },
    bookingFee: {
      type: Number,
      requierd: true,
      default: 0,
    },
    tax: {
      type: Number,
      requierd: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
    },
    date: {
      type: String,
      requred: true,
    },
    seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TransactionSeat",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema, "transactions");

/**
 * transactions:
 * subtotal
 * total
 * bookingFee
 * tax
 * user
 * movie
 * theater
 * date
 *
 *
 * transactionSeats:
 * transaction FK
 * seat
 *
 * walletTransactions:
 * wallet FK
 * price
 * status
 *
 * wallet:
 * user FK
 * balance
 *
 * users:
 * name
 * email
 * password
 * photo
 * role
 *
 *
 *
 * 1 user to one wallet
 * 1 wallet to many walletTransactions
 * 1 movie to many transactions
 * 1 theater to many transactions
 * 1 user to many transactions
 * 1 transaction to many transactionSeats
 *
 */
