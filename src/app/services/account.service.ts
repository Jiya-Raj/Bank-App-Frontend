import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { DepositRequest } from '../model/deposit-request';
import { WithdrawRequest } from '../model/withdraw-request';
import { TransferRequest } from '../model/transfer-request';
import { AccountRequest } from '../model/account-request';
import { Transaction } from '../model/transaction';
import { ClerkRequest } from '../model/clerk-request';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/accounts';
   private baseUrl2 ='http://localhost:8080/transactions'

  constructor(private http: HttpClient) { }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }

  getAllAccountsIncludingClosed(): Observable<Account[]> {
  return this.http.get<Account[]>(`${this.baseUrl}/all`);
}


  createAccount(account: AccountRequest) {
    return this.http.post(this.baseUrl, account);
  }
  getAccountById(accountNumber:string) {
    return this.http.get<Account>(`${this.baseUrl}/${accountNumber}`);
  }
  updateAccount(accountNumber: string, account: AccountRequest) {
    return this.http.put(`${this.baseUrl}/${accountNumber}`, account);
  }
  deleteAccount(accountNumber: string) {
    return this.http.delete(`${this.baseUrl}/${accountNumber}`);
  }

  deposit(request: DepositRequest) {
    return this.http.post(`${this.baseUrl2}/deposit`, request);
  }

  withdraw(request: WithdrawRequest) {
  return this.http.post<any>(`${this.baseUrl2}/withdraw`, request);
}

  transfer(request: TransferRequest): Observable<Transaction[]> {
  return this.http.post<Transaction[]>(`${this.baseUrl2}/transfer`, request);
}


  getPendingTransactions() {
  return this.http.get<Transaction[]>(`${this.baseUrl2}/pending`);
}

approveTransaction(id: number) {
  return this.http.post<Transaction>(`${this.baseUrl2}/approve/${id}`, {});
}

rejectTransaction(id: number) {
  return this.http.post<Transaction>(`${this.baseUrl2}/reject/${id}`, {});
}

getTransactionHistory(accountNumber: string) {
  return this.http.get<Transaction[]>(`${this.baseUrl2}/history/${accountNumber}`);
}

getClerks(): Observable<string[]> {
  return this.http.get<string[]>(`http://localhost:8080/manager/clerks`);
}

createClerk(request: ClerkRequest) {
  return this.http.post(`http://localhost:8080/manager/clerks`, request);
}

deleteClerk(username: string) {
  return this.http.delete(`http://localhost:8080/manager/clerks/${username}`);
}

}
