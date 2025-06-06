import { Response } from "express";
import User from "../models/User";
import { CustomRequest } from "../types/Request";
import { changePasswordSchema, profileSchema } from "../utils/zodSchema";
import path from "node:path";
import fs from "node:fs";
import bcrypt from "bcrypt";

export const ChangeProfile = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const oldProfile = await User.findById(userId);

    const parse = profileSchema.safeParse({
      name: req.body.name,
      email: req.body.email,
      photo: req.file ? req.file.path.replace(/\\/g, "/") : oldProfile?.photo,
    });

    if (!parse.success) {
      return res.status(400).json({
        data: parse.error.issues.map((issue) => issue.message),
        message: "Invalid request",
        status: "Failed",
      });
    }

    if (req.file) {
      const dirname = path.resolve();
      const filepath = path.join(
        dirname,
        "public/uploads/photos",
        oldProfile?.photo ?? ""
      );

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    const response = await User.findByIdAndUpdate(userId, {
      name: parse.data.name,
      email: parse.data.email,
      photo: req.file ? req.file.filename : oldProfile?.photo,
    }).select("name email photo");

    return res.status(200).json({
      data: response,
      message: "Successfully change profile",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to change profile",
      status: "Failed",
    });
  }
};

export const ChangePassword = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const parse = changePasswordSchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json({
        data: parse.error.issues.map(
          (issue) => `${issue.path[0]}: ${issue.message}`
        ),
        message: "Validation failed",
        status: "Failed",
      });
    }

    const { currentPassword, newPassword } = parse.data;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        data: null,
        message: "User not found",
        status: "Failed",
      });
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({
        data: null,
        message: "Current password is incorrect",
        status: "Failed",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    return res.status(200).json({
      data: null,
      message: "Password changed successfully",
      status: "Success",
    });
  } catch (error) {
    console.error("ChangePassword error:", error);
    return res.status(500).json({
      data: null,
      message: "Internal server error",
      status: "Failed",
    });
  }
};
