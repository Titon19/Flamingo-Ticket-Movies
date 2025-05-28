import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import { allowedFileTypes } from "./zodSchema";

export const uploadStorage = () =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      // cb(null, path);
      if (file.fieldname === "thumbnail") {
        cb(null, "public/uploads/thumbnails");
      } else if (file.fieldname === "banner") {
        cb(null, "public/uploads/banners");
      } else if (file.filename === "photo") {
        cb(null, "public/uploads/photo");
      } else {
        cb(null, "public/uploads/others");
      }
    },

    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.random() * 1e9}`;
      const filename = `${file.fieldname}-${uniqueSuffix}.${
        file.mimetype.split("/")[1]
      }`;
      cb(null, filename);
    },
  });

// export const bannerStorage = (path = "public/uploads/banners") =>
//   multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path);
//     },

//     filename: (req, file, cb) => {
//       const uniqueSuffix = `${Date.now()}-${Math.random() * 1e9}`;
//       const filename = `${file.fieldname}-${uniqueSuffix}.${
//         file.mimetype.split("/")[1]
//       }`;
//       cb(null, filename);
//     },
//   });

export const photoStorage = (path = "public/uploads/photo") =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },

    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.random() * 1e9}`;
      const filename = `${file.fieldname}-${uniqueSuffix}.${
        file.mimetype.split("/")[1]
      }`;
      cb(null, filename);
    },
  });

export const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!allowedFileTypes.includes(file.mimetype)) {
    cb(null, false);
  }

  cb(null, true);
};
