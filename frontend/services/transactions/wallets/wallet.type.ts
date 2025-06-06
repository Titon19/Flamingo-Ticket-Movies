import { Customer } from "../../customers/customer.type";

export interface Wallet {
  _id: string;
  user: Pick<Customer, "name">;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
export interface WalletTransaction {
  _id: string;
  wallet: Wallet;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
