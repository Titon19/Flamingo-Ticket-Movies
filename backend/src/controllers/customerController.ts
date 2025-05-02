import type { Request, Response } from "express";
import User from "../models/User";
import WalletTransaction from "../models/WalletTransaction";
import Transaction from "../models/Transaction";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || "";
    const current_page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (current_page - 1) * limit;

    const query = search
      ? { name: { $regex: search, $options: "i" }, role: "customer" }
      : {};

    const [total_items, customers] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .where("role", "customer")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .select("name email"),
    ]);

    const total_pages = Math.ceil(total_items / limit);
    const maxPageToShow = 10;
    let startPage = Math.max(1, current_page - Math.floor(maxPageToShow / 2));
    let endPage = startPage + maxPageToShow - 1;

    if (endPage > total_pages) {
      endPage = startPage;
      startPage = Math.max(1, endPage - maxPageToShow + 1);
    }

    let page_collections: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      page_collections = [...page_collections, i];
    }

    return res.status(200).json({
      data: customers,
      meta: {
        current_page,
        total_pages,
        total_items,
        limit,
        page_collections,
      },
      message: "Successfully get customers",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data customers",
      status: "Failed",
    });
  }
};

// export const getWalletTransactions = async (req: Request, res: Response) => {
//   try {
//     const transactions = await WalletTransaction.find().populate({
//       path: "wallet",
//       select: "user -_id",
//       populate: {
//         path: "user",
//         select: "name ",
//       },
//     });

//     return res.status(200).json({
//       data: transactions,
//       message: "Successfully get wallet transactions",
//       status: "Success",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       data: null,
//       message: "Failed to get data wallet transactions",
//       status: "Failed",
//     });
//   }
// };

// export const getTransactions = async (req: Request, res: Response) => {
//   try {
//     const transactions = await Transaction.find()
//       .populate({
//         path: "user",
//         select: "name -_id",
//       })
//       .populate({
//         path: "movie",
//         select: "title -_id",
//       })
//       .populate({
//         path: "theater",
//         select: "name -_id",
//       });

//     return res.status(200).json({
//       data: transactions,
//       message: "Successfully get transactions",
//       status: "Success",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       data: null,
//       message: "Failed to get data transactions",
//       status: "Failed",
//     });
//   }
// };

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const current_page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (current_page - 1) * limit;

    const start_date = req.query.start_date as string;
    const end_date = req.query.end_date as string;

    type filterProps = {
      createdAt?: {
        $gte?: Date;
        $lte?: Date;
      };
    };

    let filter: filterProps = {};

    if (start_date && end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
          data: null,
          message: "start_date and end_date must be valid date strings",
          status: "Failed",
        });
      }

      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);

      filter.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const [total_items, transactions] = await Promise.all([
      Transaction.countDocuments(filter),
      Transaction.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate({
          path: "user",
          select: "name -_id",
        })
        .populate({
          path: "movie",
          select: "title -_id",
        })
        .populate({
          path: "theater",
          select: "name -_id",
        }),
    ]);

    const total_pages = Math.ceil(total_items / limit);
    const maxPageToShow = 10;
    let startPage = Math.max(1, current_page - Math.floor(maxPageToShow / 2));
    let endPage = startPage + maxPageToShow - 1;

    if (endPage > total_pages) {
      endPage = startPage;
      startPage = Math.max(1, endPage - maxPageToShow + 1);
    }

    let page_collections: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      page_collections = [...page_collections, i];
    }

    return res.status(200).json({
      data: transactions,
      meta: {
        current_page,
        total_pages,
        total_items,
        limit,
        page_collections,
      },
      message: "Successfully get transactions",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data transactions",
      status: "Failed",
    });
  }
};
export const getWalletTransactions = async (req: Request, res: Response) => {
  try {
    const current_page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (current_page - 1) * limit;

    const start_date = req.query.start_date as string;
    const end_date = req.query.end_date as string;

    type filterProps = {
      createdAt?: {
        $gte?: Date;
        $lte?: Date;
      };
    };

    let filter: filterProps = {};

    if (start_date && end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
          data: null,
          message: "start_date and end_date must be valid date strings",
          status: "Failed",
        });
      }

      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);

      filter.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const [total_items, walletTransactions] = await Promise.all([
      WalletTransaction.countDocuments(filter),
      WalletTransaction.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate({
          path: "wallet",
          select: "user -_id",
          populate: {
            path: "user",
            select: "name ",
          },
        }),
    ]);

    const total_pages = Math.ceil(total_items / limit);
    const maxPageToShow = 10;
    let startPage = Math.max(1, current_page - Math.floor(maxPageToShow / 2));
    let endPage = startPage + maxPageToShow - 1;

    if (endPage > total_pages) {
      endPage = startPage;
      startPage = Math.max(1, endPage - maxPageToShow + 1);
    }

    let page_collections: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      page_collections = [...page_collections, i];
    }

    return res.status(200).json({
      data: walletTransactions,
      meta: {
        current_page,
        total_pages,
        total_items,
        limit,
        page_collections,
      },
      message: "Successfully get wallet transactions",
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data wallet transactions",
      status: "Failed",
    });
  }
};
