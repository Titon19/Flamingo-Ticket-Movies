import mongoose from "mongoose";
const Schema = mongoose.Schema;

const theaterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Theater", theaterSchema, "theaters");
