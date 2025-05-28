import mongoose from "mongoose";
import { getAssetUrl } from "../utils/helper";
import Genre from "./Genre";
import Theater from "./Theater";

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
    theaters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
      },
    ],
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    price: Number,
    available: Boolean,
    bonus: String,
  },
  {
    virtuals: {
      thumbnailUrl: {
        get() {
          return `${getAssetUrl("thumbnails")}${this.thumbnail}`;
        },
      },
      bannerUrl: {
        get() {
          return `${getAssetUrl("banners")}${this.banner}`;
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// Fungsi ini digunakan untuk mengupdate data movie yang berelasi dengan genre dan theater
// Ketika data movie diupdate, maka fungsi ini akan dijalankan
// Fungsi ini akan mengupdate data genre dan theater dengan menambahkan id movie yang diupdate
// ke dalam array movies milik genre dan theater yang berelasi dengan movie tersebut

movieSchema.post("save", async (doc) => {
  // Jika data movie ada (tidak null), maka jalankan logika dibawah ini
  if (doc) {
    // Mencari data genre berdasarkan id yang ada di field genre milik movie
    // Lalu, update data genre dengan menambahkan id movie yang baru dibuat ke dalam array movies
    await Genre.findByIdAndUpdate(doc.genre, {
      // Menggunakan operator $push untuk menambahkan id movie ke dalam array movies
      $push: {
        movies: doc._id,
      },
    });

    // Looping semua id theater yang ada di field theater milik movie
    for (const theater of doc.theaters) {
      // Mencari data theater berdasarkan id yang sedang di-looping
      // Lalu, update data theater dengan menambahkan id movie yang baru dibuat ke dalam array movies
      await Theater.findByIdAndUpdate(theater, {
        // Menggunakan operator $push untuk menambahkan id movie ke dalam array movies
        $push: {
          movies: doc._id,
        },
      });
    }
  }
});

movieSchema.post("deleteOne", async (doc) => {
  if (doc) {
    await Genre.findByIdAndUpdate(doc.genre, {
      $pull: {
        movies: doc._id,
      },
    });

    for (const theater of doc.theaters) {
      await Theater.findByIdAndUpdate(theater, {
        $pull: {
          movies: doc._id,
        },
      });
    }
  }
});

export default mongoose.model("Movie", movieSchema, "movies");
