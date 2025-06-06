import type { Request, Response } from "express";
import { authSchema, signupSchema } from "../utils/zodSchema";
import User from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/genereateToken";
import Wallet from "../models/Wallet";
import { CustomRequest } from "../types/Request";

export const login = async (req: Request, res: Response) => {
  try {
    const parse = authSchema.omit({ name: true }).parse(req.body);

    const checkUser = await User.findOne({
      email: parse.email,
      role: parse.role,
    });

    if (!checkUser) {
      return res.status(400).json({
        data: null,
        message: "Email not registered",
        status: "Failed",
      });
    }

    const comparePassword = bcrypt.compareSync(
      parse.password,
      checkUser.password
    );

    if (!comparePassword) {
      return res.status(400).json({
        data: null,
        message: "Wrong email / Wrong password",
        status: "Failed",
      });
    }

    const secretToken = generateToken(checkUser.id);

    res.cookie("secretToken", secretToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      data: {
        name: checkUser.name,
        email: checkUser.email,
        // role: checkUser.role,
        photoUrl: checkUser.photoUrl,
      },
      message: "Successfully login!",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to login!",
      status: "Failed",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const parse = signupSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map((error) => error.message);

      return res.status(400).json({
        data: errorMessage,
        message: "Invalid request",
        status: "Failed",
      });
    }

    const emailExists = await User.findOne({ email: parse.data.email });

    if (emailExists) {
      return res.status(400).json({
        data: null,
        message: "Email already exists",
        status: "Failed",
      });
    }

    const hashPassword = bcrypt.hashSync(parse.data.password, 12);

    const user = new User({
      name: parse.data.name,
      email: parse.data.email,
      password: hashPassword,
      photo: req.file ? req.file?.filename : "default.png",
      role: "customer",
    });

    const wallet = new Wallet({
      balance: 0,
      user: user._id,
    });

    await user.save();
    await wallet.save();

    return res.status(200).json({
      data: {
        name: user.name,
        email: user.email,
      },
      message: "Successfully register",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to register",
      status: "Failed",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("secretToken");
    return res.status(200).json({
      data: null,
      message: "Successfully logout",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to logout",
      status: "Failed",
    });
  }
};

export const me = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const response = await User.findById(userId).select("name email photo");

    return res.status(200).json({
      data: response,
      message: "Successfully get profile",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get profile",
      status: "Failed",
    });
  }
};
