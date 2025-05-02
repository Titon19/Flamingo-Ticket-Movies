import mongoose from "mongoose";

const Schema = mongoose.Schema;

const walletSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Wallet", walletSchema, "wallets");
