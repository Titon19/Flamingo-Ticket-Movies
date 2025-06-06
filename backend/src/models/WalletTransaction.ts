import mongoose from "mongoose";

const Schema = mongoose.Schema;

const walletTransactionSchema = new Schema(
  {
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "WalletTransaction",
  walletTransactionSchema,
  "walletTransactions"
);
