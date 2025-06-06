import type { Response, Request } from "express";
import Wallet from "../models/Wallet";
import { CustomRequest } from "../types/Request";
import WalletTransaction from "../models/WalletTransaction";
import { topupSchema } from "../utils/zodSchema";

export const getBalance = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      data: null,
      message: "Unauthorized",
      status: "Failed",
    });
  }

  try {
    const wallet = await Wallet.findOne({ user: userId });

    const balance = wallet?.balance ?? 0;

    return res.status(200).json({
      data: { balance },
      message: "Successfully get wallet balance",
      status: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to get data wallet balance",
      status: "Failed",
    });
  }
};

export const getTopUpHistory = async (req: CustomRequest, res: Response) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user?.id });

    const data = await WalletTransaction.find({ wallet: wallet?._id }).select(
      "wallet price createdAt status"
    );

    return res.status(200).json({
      data: data,
      message: "Successfully get top up history",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data top up history",
      status: "Failed",
    });
  }
};

export const topupBalance = async (req: CustomRequest, res: Response) => {
  try {
    const { balance } = topupSchema.parse(req.body);

    const wallet = await Wallet.findOne({ user: req.user?.id });

    const transaction = new WalletTransaction({
      wallet: wallet?.id,
      price: balance,
      status: "success",
    });

    await Wallet.updateOne(
      { user: req.user?.id },
      { $inc: { balance: transaction.price } }
    );

    const MIDTRANS_TRANSACTION_URL = process.env.MIDTRANS_TRANSACTION_URL ?? "";
    const MIDTRANS_AUTH_STRING = process.env.MIDTRANS_AUTH_STRING ?? "";

    const midtransRequest = new Request(MIDTRANS_TRANSACTION_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${MIDTRANS_AUTH_STRING}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: transaction.id,
          gross_amount: balance,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: req.user?.name,
          email: req.user?.email,
        },
        callbacks: {
          finish: process.env.SUCCESS_PAYMENT_REDIRECT,
        },
      }),
    });

    const midtransResponse = await fetch(midtransRequest);
    const midtransJson = await midtransResponse.json();

    await transaction.save();

    return res.status(200).json({
      data: midtransJson,
      message: "Successfully top up balance",
      status: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to top up balance",
      status: "Failed",
    });
  }
};
