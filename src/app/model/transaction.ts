export interface Transaction {
  id: number;
  accountNumber: string;
  transactionType: string;
  amount: number;
  status: string;
  createdAt: string;
}
