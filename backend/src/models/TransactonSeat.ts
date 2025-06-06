import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSeatSchema = new Schema({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  },
  seat: {
    type: String,
    required: true,
  },
});

export default mongoose.model(
  "TransactionSeat",
  transactionSeatSchema,
  "transactionSeats"
);
